"use strict";

const {
  referrals,
  referralsFormView
} = require("./referrals/index");
const {
  manualTransfer,
  transfersListView
} = require("./transfers/index");
const {
  resetPassword,
  resetPhrase,
  resettedPassword
} = require("./reset/index");
const {
  getStarted
} = require("./pagesAllowedForUnregistered/index");
const {
  profile,
  transfers,
  about
} = require("./settings/index");
const {
  secretPhrase,
  confirmSecretPhrase,
  referralCode,
  setExternalWallet,
  registrationCompleted,
  verifyKyc,
  termsAndConditions,
  createPassword,
  termsAndConditionsText
} = require("./registration/index");
const {
  recoveredAccount,
  recoverPassword,
  recoverPhrase
} = require("./recovery/index");
const {dashboardMenuView} = require("./dashbord/index");
const {feedMenuView} = require("./feed/index");

module.exports = {
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
  recoveredAccount,
  recoverPassword,
  profile,
  transfers,
  manualTransfer,
  dashboardMenuView,
  feedMenuView,
  transfersListView,
  resetPassword,
  resetPhrase,
  resettedPassword,
  referrals,
  referralsFormView,
  referralCode
};
