/* eslint-disable max-len */

"use strict";

const PasswordHelper = require("../common/passwordHelper");
const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_ERROR, MAX_PASSWORD_ERROR, PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

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

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordError, this.passwordEye);
    this.ConfirmPasswordHelper = new PasswordHelper(this.confirmPasswordField, this.confirmPasswordError, this.confirmPasswordEye);

    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
    this.backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("getStarted");
  }

  onErrorMainField(errorText)
  {
    this.disableSubmitButton();
    this.passwordError.innerHTML = errorText;
    this.passwordField.classList.add("input-invalid");
  }

  onErrorConfirmField(errorText)
  {
    this.disableSubmitButton();
    this.confirmPasswordError.innerHTML = errorText;
    this.confirmPasswordField.classList.add("input-invalid");
  }

  handleSubmit(e)
  {
    this.passwordError.innerHTML = "";
    this.confirmPasswordError.innerHTML = "";
    this.confirmPasswordField.classList.remove("input-invalid");
    this.passwordField.classList.remove("input-invalid");

    if (this.passwordField.value !== this.confirmPasswordField.value)
    {
      this.onErrorMainField(PASSWORDS_MATCH_ERROR);
      this.confirmPasswordField.classList.add("input-invalid");
      return false;
    }

    if (this.passwordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.onErrorMainField(MIN_PASSWORD_ERROR);
      return false;
    }

    if (this.passwordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.onErrorMainField(MAX_PASSWORD_ERROR);
      return false;
    }

    if (this.confirmPasswordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.onErrorConfirmField(MIN_PASSWORD_ERROR);
      return false;
    }

    if (this.confirmPasswordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.onErrorConfirmField(MAX_PASSWORD_ERROR);
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
      this.onErrorMainField(err.error);
    });
  }

  disableSubmitButton()
  {
    this.mainActionButton.classList.add("disabled");
  }
}

module.exports = RecoverPassword;
