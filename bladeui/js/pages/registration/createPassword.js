/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const {makeRequest} = require("../../utils/request");
const saveAdserverUrl = require("../../utils/saveAdserverUrl");
const {PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

class CreatePassword extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.mainActionButton = document.getElementById("action-btn");
    const confirmPasswordEye = document.getElementById("confirm-password-eye");
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("password");
    this.passwordError = document.getElementById("password-error");
    this.confirmPasswordField = document.getElementById("confirm-password");
    this.confirmPasswordError = document.getElementById("confirm-password-error");

    this.passwordField.addEventListener("change", this.handlePasswordChange.bind(this));
    this.confirmPasswordField.addEventListener("change", this.handleConfirmPasswordChange.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordError, passwordEye);
    this.ConfirmPasswordHelper = new PasswordHelper(this.confirmPasswordField, this.confirmPasswordError, confirmPasswordEye);
  }

  handlePasswordChange()
  {
    this.PasswordHelper.removeErrors();
    this.PasswordHelper.checkPassword();
  }

  handleConfirmPasswordChange()
  {
    this.ConfirmPasswordHelper.removeErrors();
    this.ConfirmPasswordHelper.checkPassword();
  }

  handleSubmitButton(e)
  {
    this.PasswordHelper.removeErrors();
    this.ConfirmPasswordHelper.removeErrors();

    if (this.PasswordHelper.password !== this.ConfirmPasswordHelper.password)
    {
      this.ConfirmPasswordHelper.onError(PASSWORDS_MATCH_ERROR);
      return false;
    }

    if (!this.PasswordHelper.checkPassword() || !this.ConfirmPasswordHelper.checkPassword())
    {
      return false;
    }

    this.sendRequest();
  }

  sendRequest()
  {
    makeRequest({
      method: "post",
      url: "/api/user",
      data: {password: this.PasswordHelper.password}
    })
    .then((response) =>
    {
      const token = response.headers.token;

      browser.storage.sync.set({
        bladeUserData: {
          token,
          secretPhrase: response.data.secret_phrase,
          userCode: response.data.user_code,
          referralCode: response.data.referral_code
        }
      });

      saveAdserverUrl();

      super.handleChangeView("secretPhrase");
    })
    .catch((err) =>
    {
      this.ConfirmPasswordHelper.onError(err.error);
    });
  }
}

module.exports = CreatePassword;
