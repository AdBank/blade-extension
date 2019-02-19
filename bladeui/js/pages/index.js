"use strict";

const DashboardView = require("./dashboardView");
const FeedView = require("./feedView");

const {
  GetStartedPage,
  TermsAndConditionsPage,
  TermsAndConditionsTextPage,
  CreatePasswordPage,
  RecoverPhrasePage
} = require("./pagesForUnregisteredUsers/index");
const {
  SecretPhrasePage,
  ConfirmSecretPhrasePage,
  ReferralCode,
  SetExternalWalletPage,
  VerifyKycPage,
  RegistrationCompletedPage
} = require("./registration/index");
const {
  RecoveredAccountPage,
  RecoverPasswordPage
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
  ResettedPassword
};
