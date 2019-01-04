# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

"""
Update the public suffix list
==============================

  This script generates a js array of public suffixes (http://publicsuffix.org/)
"""

import os
import urllib
import json


def urlopen(url, attempts=3):
    """
    Tries to open a particular URL, retries on failure.
    """
    for i in range(attempts):
        try:
            return urllib.urlopen(url)
        except IOError as e:
            error = e
            time.sleep(5)
    raise error


def getPublicSuffixList():
    """
    gets download link for a Gecko add-on from the Mozilla Addons site
    """
    suffixes = {}
    url = 'http://mxr.mozilla.org/mozilla-central/source/netwerk/dns/effective_tld_names.dat?raw=1'
    resource = urlopen(url)

    for line in resource:
        line = line.decode('utf-8').rstrip()
        if line.startswith('//') or '.' not in line:
            continue

        if line.startswith('*.'):
            offset = 2
            val = 2
        elif line.startswith('!'):
            offset = 1
            val = 0
        else:
            offset = 0
            val = 1

        suffixes[line[offset:].encode('idna').decode('ascii')] = val

    return suffixes


def updatePSL(baseDir):
    """
    writes the current public suffix list to js file in json format
    """

    psl = getPublicSuffixList()
    file = open(os.path.join(baseDir, 'lib', 'publicSuffixList.js'), 'w')
    print >>file, 'var publicSuffixes = ' + json.dumps(psl, sort_keys=True, indent=4, separators=(',', ': ')) + ';'
    file.close()
