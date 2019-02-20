"use strict";

/* eslint-disable max-len */

const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_ERROR, MAX_PASSWORD_ERROR} = require("../../utils/constants");
class PasswordHelper
{
  constructor(passwordField, passwordError, eyeIcon, submitButton)
  {
    this.passwordField = passwordField;
    this.passwordError = passwordError;
    this.eyeIcon = eyeIcon;
    this.submitButton = submitButton;

    this.initListeners();
  }

  initListeners()
  {
    this.eyeIcon.addEventListener("click", this.handleShowPassword.bind(this));
  }

  checkPassword()
  {
    if (this.passwordField.value.length < MIN_PASSWORD_LENGTH)
    {
      this.onError(MIN_PASSWORD_ERROR);
      return false;
    }

    if (this.passwordField.value.length > MAX_PASSWORD_LENGTH)
    {
      this.onError(MAX_PASSWORD_ERROR);
      return false;
    }

    return true;
  }

  onError(errorText)
  {
    this.submitButton.classList.add("disabled");
    this.passwordError.innerHTML = errorText;
    this.passwordField.classList.add("input-invalid");
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

  removeErrors()
  {
    this.submitButton.classList.remove("disabled");
    this.passwordError.innerHTML = "";
    this.passwordField.classList.remove("input-invalid");
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
}

module.exports = PasswordHelper;
