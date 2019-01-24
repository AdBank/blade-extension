"use strict";

/* eslint-disable max-len, no-console, no-debugger */

const BaseClass = require("./baseClass");
const request = require("../utils/request");

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 30;

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
    this.confirmPasswordField = document.getElementById("confirm-password");
    this.confirmPasswordError = document.getElementById("confirm-password-error");


    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));
    passwordEye.addEventListener("click", this.handleShowPassword.bind(this));
    confirmPasswordEye.addEventListener("click", this.handleShowConfirmPassword.bind(this));
  }

  handleShowPassword(e)
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

  handleShowConfirmPassword(e)
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

    this.sendRequest();
  }

  sendRequest()
  {
    request({
      method: "post",
      url: "/api/user",
      data: {password: this.passwordField.value},
      headers: {
        "Content-Type": "application/json"
      }
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
