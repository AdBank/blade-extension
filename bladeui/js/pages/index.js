"use strict";

const {
  GetStartedPage
} = require("./pagesAllowedForUnregistered/index");
const {
  SecretPhrasePage,
  ConfirmSecretPhrasePage,
  ReferralCode,
  SetExternalWalletPage,
  VerifyKycPage,
  RegistrationCompletedPage,
  TermsAndConditionsPage,
  TermsAndConditionsTextPage,
  CreatePasswordPage
} = require("./registration/index");
const {
  RecoveredAccountPage,
  RecoverPasswordPage,
  RecoverPhrasePage
} = require("./recovery/index");
const {
  ResetPassword,
  ResetPhrase,
  ResettedPassword
} = require("./reset/index");
const {
  ReferralsPage,
  ReferralsForm
} = require("./referrals/index");
const {
  TransfersList,
  ManualTransfer
} = require("./transfers/index");
const {
  ProfilePage,
  TransfersPage,
  AboutPage
} = require("./settings/index");
const {DashboardView} = require("./dashbord/index");
const {FeedView} = require("./feed/index");
const {Menu} = require("./menu/index");

module.exports = {
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
  RecoveredAccountPage,
  RecoverPasswordPage,
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
};
