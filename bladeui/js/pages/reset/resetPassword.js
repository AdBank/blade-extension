/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_ERROR, MAX_PASSWORD_ERROR, PASSWORDS_MATCH_ERROR} = require("../../utils/constants");

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

    this.passwordEye.addEventListener("click", this.handleClickOnPasswordEye.bind(this));
    this.confirmPasswordEye.addEventListener("click", this.handleClickOnConfirmPasswordEye.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  handleClickOnPasswordEye(e)
  {
    if (e.target.classList.contains("ion-md-eye-off"))
    {
      this.showEyeIcon(e);
      this.passwordField.type = "text";
    }
    else
    {
      this.hideEyeIcon(e);
      this.passwordField.type = "password";
    }
  }

  handleClickOnConfirmPasswordEye(e)
  {
    if (e.target.classList.contains("ion-md-eye-off"))
    {
      this.showEyeIcon(e);
      this.confirmPasswordField.type = "text";
    }
    else
    {
      this.hideEyeIcon(e);
      this.confirmPasswordField.type = "password";
    }
  }

  showEyeIcon(e)
  {
    e.target.classList.remove("ion-md-eye-off");
    e.target.classList.add("ion-md-eye");
  }

  hideEyeIcon(e)
  {
    e.target.classList.add("ion-md-eye-off");
    e.target.classList.remove("ion-md-eye");
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
      super.handleChangeView("resettedPassword");
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

module.exports = ResetPassword;
