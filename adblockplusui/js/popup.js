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

require("./io-big-toggle.js");
require("./popup.notifications.js");

const setupToggle = require("./popup.toggle.js");
const setupBlock = require("./popup.blockelement.js");
const {$, $$} = require("./dom");

const {
  getStarted,
  termsAndConditions,
  createPassword,
  secretPhrase,
  confirmSecretPhrase,
  verifyKyc,
  setExternalWallet,
  registrationCompleted,
  about,
  termsAndConditionsText
} = require("./html/index.js");
const {
  GetStartedPage,
  TermsAndConditionsPage,
  CreatePasswordPage,
  SecretPhrasePage,
  ConfirmSecretPhrasePage,
  VerifyKycPage,
  SetExternalWalletPage,
  RegistrationCompletedPage,
  AboutPage,
  TermsAndConditionsTextPage
} = require("./pages/index.js");

const {
  getDocLinks,
  getPref,
  reportIssue,
  whenPageReady
} = require("./popup.utils.js");


function onChangeView(current, next)
{
  const mainWrapper = document.getElementById("main-app-wrapper");

  while (mainWrapper.firstChild)
  {
    mainWrapper.removeChild(mainWrapper.firstChild);
  }

  loadPage(next);
}

function loadPage(page = "getStarted")
{
  switch (page)
  {
    case "getStarted": {
      const initialView = new GetStartedPage({onChangeView});
      initialView.render(getStarted);
      break;
    }
    case "termsAndConditions": {
      const initialView = new TermsAndConditionsPage({onChangeView});
      initialView.render(termsAndConditions);
      break;
    }
    case "createPasswordView": {
      const initialView = new CreatePasswordPage({onChangeView});
      initialView.render(createPassword);
      break;
    }
    case "secretPhrase": {
      const initialView = new SecretPhrasePage({onChangeView});
      initialView.render(secretPhrase);
      break;
    }
    case "verifyKyc": {
      const initialView = new VerifyKycPage({onChangeView});
      initialView.render(verifyKyc);
      break;
    }
    case "confirmSecretPhrase": {
      const initialView = new ConfirmSecretPhrasePage({onChangeView});
      initialView.render(confirmSecretPhrase);
      break;
    }
    case "setExternalWallet": {
      const initialView = new SetExternalWalletPage({onChangeView});
      initialView.render(setExternalWallet);
      break;
    }
    case "registrationCompleted": {
      const initialView = new RegistrationCompletedPage({onChangeView});
      initialView.render(registrationCompleted);
      break;
    }
    case "aboutExtension": {
      const initialView = new AboutPage({onChangeView});
      initialView.render(about);
      break;
    }
    case "termsAndConditionsText": {
      const initialView = new TermsAndConditionsTextPage({onChangeView});
      initialView.render(termsAndConditionsText);
      break;
    }
    default: {
      console.error(`Page '${page}' is not declared`);
      return;
    }
  }

  setViewToStorage(page);
}

function renderInitialView()
{
  browser.storage.local.get("bladeCurrentPage").then((view) =>
  {
    loadPage(view.bladeCurrentPage);
  });
}

function setViewToStorage(view)
{
  browser.storage.local.set({bladeCurrentPage: view});
}

browser.runtime.sendMessage({
  type: "app.get",
  what: "platform"
}).then(platform =>
{
  // this won't ever change during ABP lifecycle, which is why
  // it's set ASAP as data-platform attribute, on the most top element,
  // instead of being one of the body classes
  document.documentElement.dataset.platform = platform;
});

// create the tab object once at the right time
// and make it available per each getTab.then(...)
const getTab = new Promise(
  resolve =>
  {
    document.addEventListener("DOMContentLoaded", () =>
    {
      renderInitialView();

      browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
      {
        resolve({id: tabs[0].id, url: tabs[0].url});
      });
    });
  }
);

getTab.then(tab =>
{
  const urlProtocol = tab.url && new URL(tab.url).protocol;
  if (/^https?:$/.test(urlProtocol))
  {
    whenPageReady(tab).then(() =>
    {
      document.body.classList.remove("nohtml");
    });
  }
  else
  {
    disablePopup();
    document.body.classList.add("ignore");
    document.body.classList.remove("nohtml");
  }
  return tab;
})
.then(tab =>
{
  const hostname = new URL(tab.url).hostname.replace(/^www\./, "");
  $("#blocking-domain").textContent = hostname;
  $("#issue-reporter").addEventListener(
    "click", () => reportIssue(tab)
  );
  // drop the text content but keep it as aria-label
  const options = $("#options");
  options.setAttribute("aria-label", options.textContent);
  options.textContent = "";
  options.addEventListener("click", () =>
  {
    browser.runtime.sendMessage(
      {type: "app.open", what: "options"}
    ).then(
      // force closing popup which is not happening in Firefox
      // @link https://issues.adblockplus.org/ticket/7017
      () => window.close()
    );
  });
  setupToggle(tab);
  updateStats(tab);
  setupBlock(tab);
  setupFooter();
});

function disablePopup()
{
  document.body.classList.add("disabled");
  const buttons = $$("#page-info button, io-big-toggle");
  for (const button of buttons)
    button.disabled = true;
}

function setupFooter()
{
  // order matters and reflected later on
  // by selecting apple first and android after
  getDocLinks({links: [
    "adblock_browser_ios_store",
    "adblock_browser_android_store"
  ]}).then(links =>
  {
    // using forEach instead of for/of due its handy index
    // NodeList.prototype.forEach is available since Chrome 51
    const forEach = Array.prototype.forEach;
    forEach.call($$("footer .apple, footer .android"), (button, i) =>
    {
      button.dataset.link = links[i];
      button.addEventListener("click", gotoMobile);
    });
  });
}

function gotoMobile(event)
{
  event.preventDefault();
  event.stopPropagation();
  browser.tabs
    .create({url: event.currentTarget.dataset.link})
    .then(
      // force closing popup which is not happening in Firefox
      // @link https://issues.adblockplus.org/ticket/7017
      () => window.close()
    );
}

function updateStats(tab)
{
  const statsPage = $("#stats-page");
  browser.runtime.sendMessage({
    type: "stats.getBlockedPerPage",
    tab
  },
  blockedPage =>
  {
    ext.i18n.setElementText(statsPage, "stats_label_page",
                            [blockedPage.toLocaleString()]);
  });

  const statsTotal = $("#stats-total");
  getPref("blocked_total", blockedTotal =>
  {
    ext.i18n.setElementText(statsTotal, "stats_label_total",
                            [blockedTotal.toLocaleString()]);
  });
}
