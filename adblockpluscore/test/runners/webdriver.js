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

function executeScript(driver, name, script, scriptName, scriptArgs)
{
  let realScript = `let f = ${script}
                    let callback = arguments[arguments.length - 1];
                    return Promise.resolve()
                      .then(() => f(...arguments))
                      .then(() => callback());`;
  return driver.executeScript(`window.consoleLogs = [];
                               let oldLog = console.log;
                               console.log = msg => {
                                 window.consoleLogs.push(msg);
                                 oldLog.call(this, msg);
                               };`)
    .then(() => driver.executeAsyncScript(realScript, scriptArgs))
    .then(() => driver.executeScript("return window.consoleLogs;"))
    .then(result =>
    {
      console.log(`\nBrowser tests in ${name}\n`);
      result.forEach(item => console.log(item));
    })
    .then(() => driver.quit())
  ;
}

module.exports.executeScript = executeScript;
