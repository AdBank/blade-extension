"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");

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
    const btn = document.getElementById("action-btn");
    const confirmPasswordEye = document.getElementById("confirm-password-eye");
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("password");
    this.confirmPasswordField = document.getElementById("confirm-password");

    btn.addEventListener("click", this.handleSubmitButton.bind(this));
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

  handleSubmitButton(e)
  {
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    this.confirmPasswordField.classList.remove("input-invalid");
    this.passwordField.classList.remove("input-invalid");

    if (this.passwordField.value !== this.confirmPasswordField.value)
    {
      this.disableSubmitButton(e);
      confirmPasswordError.innerHTML = "Passwords do not match";
      this.confirmPasswordField.classList.add("input-invalid");
      this.passwordField.classList.add("input-invalid");
      return false;
    }

    if (this.passwordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.disableSubmitButton(e);
      passwordError.innerHTML = "Please enter at least 8 characters";
      this.passwordField.classList.add("input-invalid");
      return false;
    }

    if (this.passwordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.disableSubmitButton(e);
      passwordError.innerHTML = "Please enter no more than 30 characters";
      this.passwordField.classList.add("input-invalid");
      return false;
    }

    if (this.confirmPasswordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.disableSubmitButton(e);
      confirmPasswordError.innerHTML = "Please enter at least 8 characters";
      this.confirmPasswordField.classList.add("input-invalid");
      return false;
    }

    if (this.confirmPasswordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.disableSubmitButton(e);
      confirmPasswordError.innerHTML = "Please enter no more than 30 characters";
      this.confirmPasswordField.classList.add("input-invalid");
      return false;
    }

    super.handleChangeView("createPassword", "secretPhrase");
  }

  disableSubmitButton(e)
  {
    e.target.classList.add("disabled");
  }
}

module.exports = CreatePassword;
