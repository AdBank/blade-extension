/* eslint-disable max-len */

"use strict";

const secretPhrase = require("./secretPhrase");
const confirmSecretPhrase = require("./confirmSecretPhrase");
const referralCode = require("./referralCode");
const setExternalWallet = require("./setExternalWallet");
const registrationCompleted = require("./registrationCompleted");
const verifyKyc = require("./verifyKyc");
const termsAndConditions = require("./termsAndConditions");
const createPassword = require("./createPassword");
const termsAndConditionsText = require("./termsAndConditionsText");

module.exports = {
  secretPhrase,
  confirmSecretPhrase,
  referralCode,
  setExternalWallet,
  registrationCompleted,
  verifyKyc,
  termsAndConditions,
  createPassword,
  termsAndConditionsText
};
