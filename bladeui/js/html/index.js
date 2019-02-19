"use strict";

const dashboardMenuView = require("./dashboardMenuView");
const feedMenuView = require("./feedMenuView");
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
  getStarted,
  termsAndConditions,
  termsAndConditionsText,
  createPassword,
  recoverPhrase
} = require("./pagesForUnregisteredUsers/index");
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
  verifyKyc
} = require("./registration/index");
const {
  recoveredAccount,
  recoverPassword
} = require("./recovery/index");

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
