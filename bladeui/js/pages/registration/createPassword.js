/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const request = require("../../utils/request");
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

    if (this.passwordField.value !== this.confirmPasswordField.value)
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
    request({
      method: "post",
      url: "/api/user",
      data: {password: this.passwordField.value}
    })
    .then((response) =>
    {
      const token = response.getResponseHeader("token");
      const responseObj = JSON.parse(response.response);

      browser.storage.sync.set({
        bladeUserData: {
          token,
          secretPhrase: responseObj.secret_phrase,
          userCode: responseObj.user_code
        }
      });

      saveAdserverUrl();

      super.handleChangeView("secretPhrase");
    })
    .catch((err) =>
    {
      this.ConfirmPasswordHelper.onError(err.statusText);
    });
  }
}

module.exports = CreatePassword;
