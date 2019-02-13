"use strict";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 30;
const VALID_WALLET_ADDRESS_LENGTH = 25;
const MIN_PASSWORD_ERROR = "Please enter at least 8 characters";
const MAX_PASSWORD_ERROR = "Please enter no more than 30 characters";
const PASSWORDS_MATCH_ERROR = "Passwords do not match";

module.exports = {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  VALID_WALLET_ADDRESS_LENGTH,
  MIN_PASSWORD_ERROR,
  MAX_PASSWORD_ERROR,
  PASSWORDS_MATCH_ERROR
};
