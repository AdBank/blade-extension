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

require("./popup.notifications.js");

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
  termsAndConditionsText,
  recoverPhrase,
  profile,
  transfers,
  referrals,
  referralsFormView,
  manualTransfer,
  referralCode,
  dashboardMenuView,
  feedMenuView,
  transfersListView,
  resetPassword,
  resetPhrase,
  resettedPassword,
  menu
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
  TermsAndConditionsTextPage,
  RecoverPhrasePage,
  ProfilePage,
  TransfersPage,
  ReferralsPage,
  ReferralsForm,
  ManualTransfer,
  ReferralCode,
  DashboardView,
  FeedView,
  TransfersList,
  ResetPassword,
  ResetPhrase,
  ResettedPassword,
  Menu
} = require("./pages/index.js");


function onChangeView(next, previous)
{
  const mainWrapper = document.getElementById("main-app-wrapper");

  while (mainWrapper.firstChild)
  {
    mainWrapper.removeChild(mainWrapper.firstChild);
  }

  loadPage(next, previous);
}

function loadPage(page = "getStarted", previousPage)
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
    case "info": {
      const initialView = new AboutPage({onChangeView});
      initialView.render(about);
      break;
    }
    case "termsAndConditionsText": {
      const initialView = new TermsAndConditionsTextPage({onChangeView});
      initialView.render(termsAndConditionsText);
      break;
    }
    case "recoverPhrase": {
      const initialView = new RecoverPhrasePage({onChangeView});
      initialView.render(recoverPhrase);
      break;
    }
    case "profile": {
      const initialView = new ProfilePage({onChangeView});
      initialView.render(profile);
      break;
    }
    case "transfers": {
      const initialView = new TransfersPage({onChangeView});
      initialView.render(transfers);
      break;
    }
    case "referralsMenuView": {
      const initialView = new ReferralsPage({onChangeView});
      initialView.render(referrals);
      break;
    }
    case "referralsFormView": {
      const initialView = new ReferralsForm({onChangeView});
      initialView.render(referralsFormView);
      break;
    }
    case "makeManualTransfer": {
      const initialView = new ManualTransfer({onChangeView});
      initialView.render(manualTransfer);
      break;
    }
    case "referralCode": {
      const initialView = new ReferralCode({onChangeView});
      initialView.render(referralCode);
      break;
    }
    case "dashboardMenuView": {
      const initialView = new DashboardView({onChangeView});
      initialView.render(dashboardMenuView);
      break;
    }
    case "feedMenuView": {
      const initialView = new FeedView({onChangeView});
      initialView.render(feedMenuView);
      break;
    }
    case "transfersListView": {
      const initialView = new TransfersList({onChangeView});
      initialView.render(transfersListView);
      break;
    }
    case "resetPassword": {
      const initialView = new ResetPassword({onChangeView});
      initialView.render(resetPassword);
      break;
    }
    case "resetPhrase": {
      const initialView = new ResetPhrase({onChangeView});
      initialView.render(resetPhrase);
      break;
    }
    case "resettedPassword": {
      const initialView = new ResettedPassword({onChangeView});
      initialView.render(resettedPassword);
      break;
    }
    case "menu": {
      const initialView = new Menu({onChangeView, previousPage});
      initialView.render(menu);
      break;
    }
    default: {
      console.error(`Page '${page}' is not declared`);
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


document.addEventListener("DOMContentLoaded", () =>
{
  renderInitialView();
});
