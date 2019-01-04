/*
 * This file is part of Adblock Plus <https://adblockplus.org/>,
 * Copyright (C) 2006-present eyeo GmbH
 *
 * Adblock Plus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * Adblock Plus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

/**
 * @fileOverview Component synchronizing filter storage with Matcher
 *               instances and ElemHide.
 */

const {Services} = Cu.import("resource://gre/modules/Services.jsm", {});
const {XPCOMUtils} = Cu.import("resource://gre/modules/XPCOMUtils.jsm", {});

const {FilterStorage} = require("./filterStorage");
const {filterNotifier} = require("./filterNotifier");
const {ElemHide} = require("./elemHide");
const {ElemHideEmulation} = require("./elemHideEmulation");
const {ElemHideExceptions} = require("./elemHideExceptions");
const {Snippets} = require("./snippets");
const {defaultMatcher} = require("./matcher");
const {ActiveFilter, RegExpFilter,
       ElemHideBase, ElemHideFilter, ElemHideEmulationFilter,
       SnippetFilter} = require("./filterClasses");
const {SpecialSubscription} = require("./subscriptionClasses");
const {Prefs} = require("prefs");

/**
 * Increases on filter changes, filters will be saved if it exceeds 1.
 * @type {number}
 */
let isDirty = 0;

/**
 * This object can be used to change properties of the filter change listeners.
 * @class
 */
let FilterListener = {
  /**
   * Increases "dirty factor" of the filters and calls
   * FilterStorage.saveToDisk() if it becomes 1 or more. Save is
   * executed delayed to prevent multiple subsequent calls. If the
   * parameter is 0 it forces saving filters if any changes were
   * recorded after the previous save.
   * @param {number} factor
   */
  setDirty(factor)
  {
    if (factor == 0 && isDirty > 0)
      isDirty = 1;
    else
      isDirty += factor;
    if (isDirty >= 1)
    {
      isDirty = 0;
      FilterStorage.saveToDisk();
    }
  }
};

/**
 * Observer listening to history purge actions.
 * @class
 */
let HistoryPurgeObserver = {
  observe(subject, topic, data)
  {
    if (topic == "browser:purge-session-history" &&
        Prefs.clearStatsOnHistoryPurge)
    {
      FilterStorage.resetHitCounts();
      FilterListener.setDirty(0); // Force saving to disk

      Prefs.recentReports = [];
    }
  },
  QueryInterface: XPCOMUtils.generateQI(
    [Ci.nsISupportsWeakReference, Ci.nsIObserver]
  )
};

/**
 * Initializes filter listener on startup, registers the necessary hooks.
 */
function init()
{
  filterNotifier.on("filter.hitCount", onFilterHitCount);
  filterNotifier.on("filter.lastHit", onFilterLastHit);
  filterNotifier.on("filter.added", onFilterAdded);
  filterNotifier.on("filter.removed", onFilterRemoved);
  filterNotifier.on("filter.disabled", onFilterDisabled);
  filterNotifier.on("filter.moved", onGenericChange);

  filterNotifier.on("subscription.added", onSubscriptionAdded);
  filterNotifier.on("subscription.removed", onSubscriptionRemoved);
  filterNotifier.on("subscription.disabled", onSubscriptionDisabled);
  filterNotifier.on("subscription.updated", onSubscriptionUpdated);
  filterNotifier.on("subscription.moved", onGenericChange);
  filterNotifier.on("subscription.title", onGenericChange);
  filterNotifier.on("subscription.fixedTitle", onGenericChange);
  filterNotifier.on("subscription.homepage", onGenericChange);
  filterNotifier.on("subscription.downloadStatus", onGenericChange);
  filterNotifier.on("subscription.lastCheck", onGenericChange);
  filterNotifier.on("subscription.errors", onGenericChange);

  filterNotifier.on("load", onLoad);
  filterNotifier.on("save", onSave);

  FilterStorage.loadFromDisk();

  Services.obs.addObserver(HistoryPurgeObserver,
                           "browser:purge-session-history", true);
  onShutdown.add(() =>
  {
    Services.obs.removeObserver(HistoryPurgeObserver,
                                "browser:purge-session-history");
  });
}
init();

/**
 * Notifies Matcher instances or ElemHide object about a new filter
 * if necessary.
 * @param {Filter} filter filter that has been added
 */
function addFilter(filter)
{
  if (!(filter instanceof ActiveFilter) || filter.disabled)
    return;

  let hasEnabled = false;
  let allowSnippets = false;
  for (let subscription of filter.subscriptions())
  {
    if (!subscription.disabled)
    {
      hasEnabled = true;

      // Allow snippets to be executed only by the circumvention lists or the
      // user's own filters.
      if (subscription.type == "circumvention" ||
          subscription.url == "https://easylist-downloads.adblockplus.org/abp-filters-anti-cv.txt" ||
          subscription instanceof SpecialSubscription)
      {
        allowSnippets = true;
        break;
      }
    }
  }
  if (!hasEnabled)
    return;

  if (filter instanceof RegExpFilter)
    defaultMatcher.add(filter);
  else if (filter instanceof ElemHideBase)
  {
    if (filter instanceof ElemHideFilter)
      ElemHide.add(filter);
    else if (filter instanceof ElemHideEmulationFilter)
      ElemHideEmulation.add(filter);
    else
      ElemHideExceptions.add(filter);
  }
  else if (allowSnippets && filter instanceof SnippetFilter)
    Snippets.add(filter);
}

/**
 * Notifies Matcher instances or ElemHide object about removal of a filter
 * if necessary.
 * @param {Filter} filter filter that has been removed
 */
function removeFilter(filter)
{
  if (!(filter instanceof ActiveFilter))
    return;

  if (!filter.disabled)
  {
    let hasEnabled = false;
    for (let subscription of filter.subscriptions())
    {
      if (!subscription.disabled)
      {
        hasEnabled = true;
        break;
      }
    }
    if (hasEnabled)
      return;
  }

  if (filter instanceof RegExpFilter)
    defaultMatcher.remove(filter);
  else if (filter instanceof ElemHideBase)
  {
    if (filter instanceof ElemHideFilter)
      ElemHide.remove(filter);
    else if (filter instanceof ElemHideEmulationFilter)
      ElemHideEmulation.remove(filter);
    else
      ElemHideExceptions.remove(filter);
  }
  else if (filter instanceof SnippetFilter)
    Snippets.remove(filter);
}

const primes = [101, 109, 131, 149, 163, 179, 193, 211, 229, 241];

function addFilters(filters)
{
  // We add filters using pseudo-random ordering. Reason is that ElemHide will
  // assign consecutive filter IDs that might be visible to the website. The
  // randomization makes sure that no conclusion can be made about the actual
  // filters applying there. We have ten prime numbers to use as iteration step,
  // any of those can be chosen as long as the array length isn't divisible by
  // it.
  let len = filters.length;
  if (!len)
    return;

  let current = (Math.random() * len) | 0;
  let step;
  do
  {
    step = primes[(Math.random() * primes.length) | 0];
  } while (len % step == 0);

  for (let i = 0; i < len; i++, current = (current + step) % len)
    addFilter(filters[current]);
}

function onSubscriptionAdded(subscription)
{
  FilterListener.setDirty(1);

  if (!subscription.disabled)
    addFilters(subscription.filters);
}

function onSubscriptionRemoved(subscription)
{
  FilterListener.setDirty(1);

  if (!subscription.disabled)
    subscription.filters.forEach(removeFilter);
}

function onSubscriptionDisabled(subscription, newValue)
{
  FilterListener.setDirty(1);

  if (FilterStorage.knownSubscriptions.has(subscription.url))
  {
    if (newValue == false)
      addFilters(subscription.filters);
    else
      subscription.filters.forEach(removeFilter);
  }
}

function onSubscriptionUpdated(subscription, oldFilters)
{
  FilterListener.setDirty(1);

  if (!subscription.disabled &&
      FilterStorage.knownSubscriptions.has(subscription.url))
  {
    oldFilters.forEach(removeFilter);
    addFilters(subscription.filters);
  }
}

function onFilterHitCount(filter, newValue)
{
  if (newValue == 0)
    FilterListener.setDirty(0);
  else
    FilterListener.setDirty(0.002);
}

function onFilterLastHit()
{
  FilterListener.setDirty(0.002);
}

function onFilterAdded(filter)
{
  FilterListener.setDirty(1);

  if (!filter.disabled)
    addFilter(filter);
}

function onFilterRemoved(filter)
{
  FilterListener.setDirty(1);

  if (!filter.disabled)
    removeFilter(filter);
}

function onFilterDisabled(filter, newValue)
{
  FilterListener.setDirty(1);

  if (newValue == false)
    addFilter(filter);
  else
    removeFilter(filter);
}

function onGenericChange()
{
  FilterListener.setDirty(1);
}

function onLoad()
{
  isDirty = 0;

  defaultMatcher.clear();
  ElemHide.clear();
  ElemHideEmulation.clear();
  ElemHideExceptions.clear();
  Snippets.clear();
  for (let subscription of FilterStorage.subscriptions)
  {
    if (!subscription.disabled)
      addFilters(subscription.filters);
  }
}

function onSave()
{
  isDirty = 0;
}
