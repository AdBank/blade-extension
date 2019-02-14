"use strict";

const getStarted = require("./getStarted.js");
const termsAndConditions = require("./termsAndConditions.js");
const createPassword = require("./createPassword.js");
const secretPhrase = require("./secretPhrase.js");
const confirmSecretPhrase = require("./confirmSecretPhrase.js");
const verifyKyc = require("./verifyKyc.js");
const setExternalWallet = require("./setExternalWallet.js");
const registrationCompleted = require("./registrationCompleted.js");
const about = require("./about.js");
const termsAndConditionsText = require("./termsAndConditionsText");
const recoverPhrase = require("./recoverPhrase");
const recoveredAccount = require("./recoveredAccount");
const recoverPassword = require("./recoverPassword");
const profile = require("./profie");
const transfers = require("./transfers");
const referralCode = require("./referralCode");
const referrals = require("./referralsMenuView");
const referralsFormView = require("./referralsFormView");
const dashboardMenuView = require("./dashboardMenuView");
const feedMenuView = require("./feedMenuView");

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
  referrals,
  referralsFormView,
  referralCode,
  dashboardMenuView,
  feedMenuView
};
