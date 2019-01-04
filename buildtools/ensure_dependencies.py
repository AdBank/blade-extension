#!/usr/bin/env python

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import sys
import os
import posixpath
import re
import io
import errno
import logging
import subprocess
import urlparse
import argparse
import json

from collections import OrderedDict
from ConfigParser import RawConfigParser

USAGE = '''
A dependencies file should look like this:

  # VCS-specific root URLs for the repositories
  _root = hg:https://hg.adblockplus.org/ git:https://github.com/adblockplus/
  # File to update this script from (optional)
  _self = buildtools/ensure_dependencies.py
  # Clone elemhidehelper repository into extensions/elemhidehelper directory at
  # tag "1.2".
  extensions/elemhidehelper = elemhidehelper 1.2
  # Clone buildtools repository into buildtools directory at VCS-specific
  # revision IDs.
  buildtools = buildtools hg:016d16f7137b git:f3f8692f82e5
  # Clone the adblockplus repository into adblockplus directory, overwriting the
  # usual source URL for Git repository and specifying VCS specific revision IDs.
  adblockplus = adblockplus hg:893426c6a6ab git:git@github.com:user/adblockplus.git@b2ffd52b
  # Clone the adblockpluschrome repository into the adblockpluschrome directory,
  # from a specific Git repository, specifying the revision ID.
  adblockpluschrome = git:git@github.com:user/adblockpluschrome.git@1fad3a7
'''

SKIP_DEPENDENCY_UPDATES = os.environ.get(
    'SKIP_DEPENDENCY_UPDATES', '',
).lower() not in ('', '0', 'false')

NPM_LOCKFILE = '.npm_install_lock'


class Mercurial:
    def istype(self, repodir):
        return os.path.exists(os.path.join(repodir, '.hg'))

    def clone(self, source, target):
        if not source.endswith('/'):
            source += '/'
        subprocess.check_call(['hg', 'clone', '--quiet', '--noupdate', source, target])

    def get_revision_id(self, repo, rev=None):
        command = ['hg', 'id', '--repository', repo, '--id']
        if rev:
            command.extend(['--rev', rev])

        # Ignore stderr output and return code here: if revision lookup failed we
        # should simply return an empty string.
        result = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
        return result.strip()

    def pull(self, repo):
        subprocess.check_call(['hg', 'pull', '--repository', repo, '--quiet'])

    def update(self, repo, rev, revname):
        subprocess.check_call(['hg', 'update', '--repository', repo, '--quiet', '--check', '--rev', rev])

    def ignore(self, target, repo):
        config_path = os.path.join(repo, '.hg', 'hgrc')
        ignore_file = os.path.join('.hg', 'dependencies')
        ignore_path = os.path.join(repo, ignore_file)

        config = RawConfigParser()
        config.read(config_path)

        if not config.has_section('ui'):
            config.add_section('ui')

        config.set('ui', 'ignore.dependencies', ignore_file)
        with open(config_path, 'w') as stream:
            config.write(stream)

        module = os.path.relpath(target, repo)
        _ensure_line_exists(ignore_path, module)

    def postprocess_url(self, url):
        return url


class Git:
    def istype(self, repodir):
        return os.path.exists(os.path.join(repodir, '.git'))

    def clone(self, source, target):
        source = source.rstrip('/')
        if not source.endswith('.git'):
            source += '.git'
        subprocess.check_call(['git', 'clone', '--quiet', source, target])

    def get_revision_id(self, repo, rev='HEAD'):
        command = ['git', 'rev-parse', '--revs-only', rev + '^{commit}']
        return subprocess.check_output(command, cwd=repo).strip()

    def pull(self, repo):
        # Fetch tracked branches, new tags and the list of available remote branches
        subprocess.check_call(['git', 'fetch', '--quiet', '--all', '--tags'], cwd=repo)
        # Next we need to ensure all remote branches are tracked
        newly_tracked = False
        remotes = subprocess.check_output(['git', 'branch', '--remotes'], cwd=repo)
        for match in re.finditer(r'^\s*(origin/(\S+))$', remotes, re.M):
            remote, local = match.groups()
            with open(os.devnull, 'wb') as devnull:
                if subprocess.call(['git', 'branch', '--track', local, remote],
                                   cwd=repo, stdout=devnull, stderr=devnull) == 0:
                    newly_tracked = True
        # Finally fetch any newly tracked remote branches
        if newly_tracked:
            subprocess.check_call(['git', 'fetch', '--quiet', 'origin'], cwd=repo)

    def update(self, repo, rev, revname):
        subprocess.check_call(['git', 'checkout', '--quiet', revname], cwd=repo)

    def ignore(self, target, repo):
        module = os.path.sep + os.path.relpath(target, repo)
        exclude_file = os.path.join(repo, '.git', 'info', 'exclude')
        _ensure_line_exists(exclude_file, module)

    def postprocess_url(self, url):
        # Handle alternative syntax of SSH URLS
        if '@' in url and ':' in url and not urlparse.urlsplit(url).scheme:
            return 'ssh://' + url.replace(':', '/', 1)
        return url


repo_types = OrderedDict((
    ('hg', Mercurial()),
    ('git', Git()),
))

# [vcs:]value
item_regexp = re.compile(
    '^(?:(' + '|'.join(map(re.escape, repo_types.keys())) + '):)?'
    '(.+)$',
)

# [url@]rev
source_regexp = re.compile(
    '^(?:(.*)@)?'
    '(.+)$',
)


def merge_seqs(seq1, seq2):
    """Return a list of any truthy values from the suplied sequences

    (None, 2), (1,)      => [1, 2]
    None, (1, 2)         => [1, 2]
    (1, 2), (3, 4)       => [3, 4]
    """
    return map(lambda item1, item2: item2 or item1, seq1 or (), seq2 or ())


def parse_spec(path, line):
    if '=' not in line:
        logging.warning('Invalid line in file %s: %s' % (path, line))
        return None, None

    key, value = line.split('=', 1)
    key = key.strip()
    items = value.split()
    if not len(items):
        logging.warning('No value specified for key %s in file %s' % (key, path))
        return key, None

    result = OrderedDict()
    is_dependency_field = not key.startswith('_')

    for i, item in enumerate(items):
        try:
            vcs, value = re.search(item_regexp, item).groups()
            vcs = vcs or '*'
            if is_dependency_field:
                if i == 0 and vcs == '*':
                    # In order to be backwards compatible we have to assume that the first
                    # source contains only a URL/path for the repo if it does not contain
                    # the VCS part
                    url_rev = (value, None)
                else:
                    url_rev = re.search(source_regexp, value).groups()
                result[vcs] = merge_seqs(result.get(vcs), url_rev)
            else:
                if vcs in result:
                    logging.warning('Ignoring duplicate value for type %r '
                                    '(key %r in file %r)' % (vcs, key, path))
                result[vcs] = value
        except AttributeError:
            logging.warning('Ignoring invalid item %r for type %r '
                            '(key %r in file %r)' % (item, vcs, key, path))
            continue
    return key, result


def read_deps(repodir):
    result = {}
    deps_path = os.path.join(repodir, 'dependencies')
    try:
        with io.open(deps_path, 'rt', encoding='utf-8') as handle:
            for line in handle:
                # Remove comments and whitespace
                line = re.sub(r'#.*', '', line).strip()
                if not line:
                    continue

                key, spec = parse_spec(deps_path, line)
                if spec:
                    result[key] = spec
        return result
    except IOError as e:
        if e.errno != errno.ENOENT:
            raise
        return None


def safe_join(path, subpath):
    # This has been inspired by Flask's safe_join() function
    forbidden = {os.sep, os.altsep} - {posixpath.sep, None}
    if any(sep in subpath for sep in forbidden):
        raise Exception('Illegal directory separator in dependency path %s' % subpath)

    normpath = posixpath.normpath(subpath)
    if posixpath.isabs(normpath):
        raise Exception('Dependency path %s cannot be absolute' % subpath)
    if normpath == posixpath.pardir or normpath.startswith(posixpath.pardir + posixpath.sep):
        raise Exception('Dependency path %s has to be inside the repository' % subpath)
    return os.path.join(path, *normpath.split(posixpath.sep))


def get_repo_type(repo):
    for name, repotype in repo_types.iteritems():
        if repotype.istype(repo):
            return name
    return None


def resolve_npm_dependencies(target, vcs):
    """Install Node.js production-only dependencies if necessary and desired.

    When the target dependency has additional Node.js dependencies declared
    run "npm install --only=production --loglevel=warn" to resolve the declared
    dependencies.

    Additionally, make sure that any VCS will ignore the installed files.

    Requires Node.js to be installed locally.
    """
    try:
        with open(os.path.join(target, 'package.json'), 'r') as fp:
            package_data = json.load(fp)

        # In case a package.json does not exist at all or if there are no
        # production dependencies declared, we don't need to run npm and can
        # bail out early.
        if not package_data.get('dependencies', False):
            return
    except IOError:
        return

    try:
        # Create an empty file, which gets deleted after successfully
        # installing Node.js dependencies.
        lockfile_path = os.path.join(target, NPM_LOCKFILE)
        open(lockfile_path, 'a').close()

        if os.name == 'nt':
            # Windows' CreateProcess() (called by subprocess.Popen()) only
            # resolves executables ending in .exe. The windows installation of
            # Node.js only provides a npm.cmd, which is executable but won't
            # be recognized as such by CreateProcess().
            npm_exec = 'npm.cmd'
        else:
            npm_exec = 'npm'

        cmd = [npm_exec, 'install', '--only=production', '--loglevel=warn',
               '--no-package-lock', '--no-optional']
        subprocess.check_output(cmd, cwd=target)

        if vcs:
            repo_types[vcs].ignore(os.path.join(target, NPM_LOCKFILE), target)
            repo_types[vcs].ignore(os.path.join(target, 'node_modules'), target)

        os.remove(lockfile_path)
    except OSError as e:
        import errno
        if e.errno == errno.ENOENT:
            logging.error('Failed to install Node.js dependencies for %s,'
                          ' please ensure Node.js is installed.', target)
        else:
            raise


def ensure_repo(parentrepo, parenttype, target, type, root, sourcename):
    if os.path.exists(target):
        return False

    if SKIP_DEPENDENCY_UPDATES:
        logging.warning('SKIP_DEPENDENCY_UPDATES environment variable set, '
                        '%s not cloned', target)
        return False

    postprocess_url = repo_types[type].postprocess_url
    root = postprocess_url(root)
    sourcename = postprocess_url(sourcename)

    if os.path.exists(root):
        url = os.path.join(root, sourcename)
    else:
        url = urlparse.urljoin(root, sourcename)

    logging.info('Cloning repository %s into %s' % (url, target))
    repo_types[type].clone(url, target)
    repo_types[parenttype].ignore(target, parentrepo)
    return True


def update_repo(target, type, revision):
    resolved_revision = repo_types[type].get_revision_id(target, revision)
    current_revision = repo_types[type].get_revision_id(target)

    if resolved_revision != current_revision:
        if SKIP_DEPENDENCY_UPDATES:
            logging.warning('SKIP_DEPENDENCY_UPDATES environment variable set, '
                            '%s not checked out to %s', target, revision)
            return False

        if not resolved_revision:
            logging.info('Revision %s is unknown, downloading remote changes' % revision)
            repo_types[type].pull(target)
            resolved_revision = repo_types[type].get_revision_id(target, revision)
            if not resolved_revision:
                raise Exception('Failed to resolve revision %s' % revision)

        logging.info('Updating repository %s to revision %s' % (target, resolved_revision))
        repo_types[type].update(target, resolved_revision, revision)
        return True
    return False


def resolve_deps(repodir, repotype, level=0, self_update=True,
                 overrideroots=None, skipdependencies=set()):
    config = read_deps(repodir)
    if config is None:
        if level == 0:
            logging.warning('No dependencies file in directory %s, nothing to do...\n%s' % (repodir, USAGE))
        return
    if level >= 10:
        logging.warning('Too much subrepository nesting, ignoring %s' % repo)
        return

    if overrideroots is not None:
        config['_root'] = overrideroots

    for dir, sources in sorted(config.iteritems()):
        if (dir.startswith('_') or
            skipdependencies.intersection([s[0] for s in sources if s[0]])):
            continue

        target = safe_join(repodir, dir)
        parenttype = repotype or 'hg'
        _root = config.get('_root', {})

        for key in sources.keys() + _root.keys():
            if key == parenttype or key is None and vcs != '*':
                vcs = key
        source, rev = merge_seqs(sources.get('*'), sources.get(vcs))

        if not (vcs and source and rev):
            logging.warning('No valid source / revision found to create %s' % target)
            continue

        repo_cloned = ensure_repo(repodir, parenttype, target, vcs,
                                  _root.get(vcs, ''), source)
        if repo_types[vcs].istype(target):
            repo_updated = update_repo(target, vcs, rev)
            npm_outdated = repo_cloned or repo_updated
        else:
            vcs = None
            npm_outdated = not os.path.exists(
                os.path.join(target, 'node_modules'),
            )

        recent_npm_failed = os.path.exists(os.path.join(target, NPM_LOCKFILE))
        if npm_outdated or recent_npm_failed:
            resolve_npm_dependencies(target, vcs)

        resolve_deps(target, vcs, level + 1, self_update=False,
                     overrideroots=overrideroots, skipdependencies=skipdependencies)

    if self_update and '_self' in config and '*' in config['_self']:
        source = safe_join(repodir, config['_self']['*'])
        try:
            with io.open(source, 'rb') as handle:
                sourcedata = handle.read()
        except IOError as e:
            if e.errno != errno.ENOENT:
                raise
            logging.warning("File %s doesn't exist, skipping self-update" % source)
            return

        target = __file__
        with io.open(target, 'rb') as handle:
            targetdata = handle.read()

        if sourcedata != targetdata:
            logging.info("Updating %s from %s, don't forget to commit" % (target, source))
            with io.open(target, 'wb') as handle:
                handle.write(sourcedata)
            if __name__ == '__main__':
                logging.info('Restarting %s' % target)
                os.execv(sys.executable, [sys.executable, target] + sys.argv[1:])
            else:
                logging.warning('Cannot restart %s automatically, please rerun' % target)


def _ensure_line_exists(path, pattern):
    with open(path, 'a+') as f:
        f.seek(0, os.SEEK_SET)
        file_content = [l.strip() for l in f.readlines()]
        if not pattern in file_content:
            file_content.append(pattern)
            f.seek(0, os.SEEK_SET)
            f.truncate()
            for l in file_content:
                print >>f, l


if __name__ == '__main__':
    logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.INFO)

    parser = argparse.ArgumentParser(description='Verify dependencies for a set of repositories, by default the repository of this script.')
    parser.add_argument('repos', metavar='repository', type=str, nargs='*', help='Repository path')
    parser.add_argument('-q', '--quiet', action='store_true', help='Suppress informational output')
    args = parser.parse_args()

    if args.quiet:
        logging.disable(logging.INFO)

    repos = args.repos
    if not len(repos):
        repos = [os.path.dirname(__file__)]
    for repo in repos:
        resolve_deps(repo, get_repo_type(repo))
