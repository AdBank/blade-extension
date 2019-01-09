"use strict";

const getStarted = require("./getStarted.js");
const termsAndConditions = require("./termsAndConditions.js");
const createPassword = require("./createPassword.js");
const secretPhrase = require("./secretPhrase.js");
const confirmSecretPhrase = require("./confirmSecretPhrase.js");
const verifyKyc = require("./verifyKyc.js");
const setExternalWallet = require("./setExternalWallet.js");
const registrationCompleted = require("./registrationCompleted.js");

module.exports = {
  getStarted,
  termsAndConditions,
  createPassword,
  secretPhrase,
  confirmSecretPhrase,
  verifyKyc,
  setExternalWallet,
  registrationCompleted
};
