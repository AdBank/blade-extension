"use strict";

class PasswordHelper
{
  constructor(passwordField, passwordError, eyeIcon)
  {
    this.passwordField = passwordField;
    this.passwordError = passwordError;
    this.eyeIcon = eyeIcon;

    this.initListeners();
  }

  initListeners()
  {
    this.eyeIcon.addEventListener("click", this.handleShowPassword.bind(this));
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
