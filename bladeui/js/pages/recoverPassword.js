"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");
const request = require("../utils/request");
const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH} = require("../utils/constants");

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

    this.passwordEye.addEventListener("click", this.handleClickOnPasswordEye.bind(this));
    this.confirmPasswordEye.addEventListener("click", this.handleClickOnConfirmPasswordEye.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
    this.backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
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

  handleOpenPreviousView()
  {
    super.handleChangeView("getStarted");
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
      this.onErrorMainField("Passwords do not match");
      this.confirmPasswordField.classList.add("input-invalid");
      return false;
    }

    if (this.passwordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.onErrorMainField("Please enter at least 8 characters");
      return false;
    }

    if (this.passwordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.onErrorMainField("Please enter no more than 30 characters");
      return false;
    }

    if (this.confirmPasswordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.onErrorConfirmField("Please enter at least 8 characters");
      return false;
    }

    if (this.confirmPasswordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.onErrorConfirmField("Please enter no more than 30 characters");
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
