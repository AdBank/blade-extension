/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const request = require("../../utils/request");
const saveAdserverUrl = require("../../utils/saveAdserverUrl");
const {MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_ERROR,
  MAX_PASSWORD_ERROR,
  PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

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

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordError, passwordEye);
    this.ConfirmPasswordHelper = new PasswordHelper(this.confirmPasswordField, this.confirmPasswordError, confirmPasswordEye);

    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));
  }

  onErrorMainField(errorText)
  {
    this.disableSubmitButton();
    this.confirmPasswordError.innerHTML = errorText;
    this.passwordField.classList.add("input-invalid");
  }

  onErrorConfirmField(errorText)
  {
    this.disableSubmitButton();
    this.confirmPasswordError.innerHTML = errorText;
    this.confirmPasswordField.classList.add("input-invalid");
  }

  handleSubmitButton(e)
  {
    const passwordError = document.getElementById("password-error");

    passwordError.innerHTML = "";
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
      this.onErrorMainField(err.statusText);
    });
  }

  disableSubmitButton()
  {
    this.mainActionButton.classList.add("disabled");
  }
}

module.exports = CreatePassword;
