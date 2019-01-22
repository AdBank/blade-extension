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
  recoverPassword
};
