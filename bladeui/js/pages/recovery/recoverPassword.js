/* eslint-disable max-len */

"use strict";

const PasswordHelper = require("../common/passwordHelper");
const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const {PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

class RecoverPassword extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.passwordEye = document.getElementById("password-eye");
    this.confirmPasswordEye = document.getElementById("confirm-password-eye");
    this.passwordField = document.getElementById("password");
    this.confirmPasswordField = document.getElementById("confirm-password");
    this.passwordError = document.getElementById("password-error");
    this.confirmPasswordError = document.getElementById("confirm-password-error");
    this.mainActionButton = document.getElementById("main-action-button");
    this.backButton = document.getElementById("back-button");

    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
    this.backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordError, this.passwordEye);
    this.ConfirmPasswordHelper = new PasswordHelper(this.confirmPasswordField, this.confirmPasswordError, this.confirmPasswordEye);
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("getStarted");
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

  handleSubmit(e)
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

    browser.storage.sync.get(null, (data) =>
    {
      const token = data.bladeUserData.token;
      this.sendRequest(token);
    });
  }

  sendRequest(token)
  {
    request({
      method: "post",
      url: "/jwt/user/password",
      data: {password: this.passwordField.value},
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then((response) =>
    {
      super.handleChangeView("recoveredAccount");
    })
    .catch((err) =>
    {
      this.ConfirmPasswordHelper.onError(err.error);
    });
  }
}

module.exports = RecoverPassword;
