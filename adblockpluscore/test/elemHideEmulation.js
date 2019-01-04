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

const {createSandbox} = require("./_common");

let ElemHideEmulationFilter = null;
let ElemHideEmulation = null;
let ElemHideExceptions = null;
let Filter = null;

exports.setUp = function(callback)
{
  let sandboxedRequire = createSandbox();
  (
    {Filter,
     ElemHideEmulationFilter} = sandboxedRequire("../lib/filterClasses"),
    {ElemHideEmulation} = sandboxedRequire("../lib/elemHideEmulation"),
    {ElemHideExceptions} = sandboxedRequire("../lib/elemHideExceptions")
  );

  callback();
};

exports.testDomainRestrictions = function(test)
{
  function testSelectorMatches(description, filters, domain, expectedMatches)
  {
    for (let filter of filters)
    {
      filter = Filter.fromText(filter);
      if (filter instanceof ElemHideEmulationFilter)
        ElemHideEmulation.add(filter);
      else
        ElemHideExceptions.add(filter);
    }

    let matches = ElemHideEmulation.getRulesForDomain(domain)
        .map(filter => filter.text);
    test.deepEqual(matches.sort(), expectedMatches.sort(), description);

    ElemHideEmulation.clear();
    ElemHideExceptions.clear();
  }

  testSelectorMatches(
    "Ignore generic filters",
    [
      "#?#:-abp-properties(foo)", "example.com#?#:-abp-properties(foo)",
      "~example.com#?#:-abp-properties(foo)"
    ],
    "example.com",
    ["example.com#?#:-abp-properties(foo)"]
  );
  testSelectorMatches(
    "Ignore selectors with exceptions",
    [
      "example.com#?#:-abp-properties(foo)",
      "example.com#?#:-abp-properties(bar)",
      "example.com#@#:-abp-properties(foo)"
    ],
    "example.com",
    ["example.com#?#:-abp-properties(bar)"]
  );
  testSelectorMatches(
    "Ignore filters that include parent domain but exclude subdomain",
    [
      "~www.example.com,example.com#?#:-abp-properties(foo)"
    ],
    "www.example.com",
    []
  );
  testSelectorMatches(
    "Ignore filters with parent domain if exception matches subdomain",
    [
      "www.example.com#@#:-abp-properties(foo)",
      "example.com#?#:-abp-properties(foo)"
    ],
    "www.example.com",
    []
  );
  testSelectorMatches(
    "Ignore filters for other subdomain",
    [
      "www.example.com#?#:-abp-properties(foo)",
      "other.example.com#?#:-abp-properties(foo)"
    ],
    "other.example.com",
    ["other.example.com#?#:-abp-properties(foo)"]
  );

  test.done();
};

exports.testElemHideEmulationFiltersContainer = function(test)
{
  function compareRules(description, domain, expectedMatches)
  {
    let result = ElemHideEmulation.getRulesForDomain(domain)
        .map(filter => filter.text);
    expectedMatches = expectedMatches.map(filter => filter.text);
    test.deepEqual(result.sort(), expectedMatches.sort(), description);
  }

  let domainFilter = Filter.fromText("example.com##filter1");
  let subdomainFilter = Filter.fromText("www.example.com##filter2");
  let otherDomainFilter = Filter.fromText("other.example.com##filter3");

  ElemHideEmulation.add(domainFilter);
  ElemHideEmulation.add(subdomainFilter);
  ElemHideEmulation.add(otherDomainFilter);
  compareRules(
    "Return all matching filters",
    "www.example.com",
    [domainFilter, subdomainFilter]
  );

  ElemHideEmulation.remove(domainFilter);
  compareRules(
    "Return all matching filters after removing one",
    "www.example.com",
    [subdomainFilter]
  );

  ElemHideEmulation.clear();
  compareRules(
    "Return no filters after clearing",
    "www.example.com",
    []
  );

  test.done();
};
