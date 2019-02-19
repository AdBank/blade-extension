"use strict";

const secretPhrase = require("./secretPhrase");
const confirmSecretPhrase = require("./confirmSecretPhrase");
const referralCode = require("./referralCode");
const setExternalWallet = require("./setExternalWallet");
const registrationCompleted = require("./registrationCompleted");
const verifyKyc = require("./verifyKyc");

module.exports = {
  secretPhrase,
  confirmSecretPhrase,
  referralCode,
  setExternalWallet,
  registrationCompleted,
  verifyKyc
};
