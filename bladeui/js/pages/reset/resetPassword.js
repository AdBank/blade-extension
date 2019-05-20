/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const {makeRequest} = require("../../utils/request");
const {PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

class ResetPassword extends BaseClass
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

    this.passwordField.addEventListener("change", this.handlePasswordChange.bind(this));
    this.confirmPasswordField.addEventListener("change", this.handleConfirmPasswordChange.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordError, this.passwordEye, this.mainActionButton);
    this.ConfirmPasswordHelper = new PasswordHelper(this.confirmPasswordField, this.confirmPasswordError, this.confirmPasswordEye, this.mainActionButton);
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

    if (this.PasswordHelper.password !== this.ConfirmPasswordHelper.password)
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
    makeRequest({
      method: "post",
      url: "/jwt/user/password",
      data: {password: this.PasswordHelper.password}
    })
    .then((response) =>
    {
      super.handleChangeView("resettedPassword");
    })
    .catch((err) =>
    {
      this.ConfirmPasswordHelper.onError(err.error);
    });
  }
}

module.exports = ResetPassword;
