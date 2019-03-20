/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");

class TermsAndConditions extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.mainActionButton = document.getElementById("action-btn");
    const link = document.getElementById("link");
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    this.termsAndConditionsCheckbox = document.getElementById("checkbox1");
    const backButton = document.getElementById("back-button");

    mainAppWrapper.classList.remove("custom-bg");
    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));
    this.termsAndConditionsCheckbox.addEventListener("change", this.handleCheckboxChanged.bind(this));
    link.addEventListener("click", this.handleOpenLink.bind(this));
    backButton.addEventListener("click", this.handleGoBack.bind(this));
  }

  handleOpenLink(e)
  {
    debugger;
    e.preventDefault();
    browser.tabs.create({url: e.target.href});
  }

  handleGoBack()
  {
    super.handleChangeView("getStarted");
  }

  handleCheckboxChanged(e)
  {
    if (this.termsAndConditionsCheckbox.checked)
    {
      this.mainActionButton.disabled = false;
    }
    else
    {
      this.mainActionButton.disabled = true;
    }
  }

  handleSubmitButton(e)
  {
    if (!this.termsAndConditionsCheckbox.checked)
    {
      e.target.classList.add("disabled");
    }
    else
    {
      super.handleChangeView("createPasswordView");
    }
  }
}

module.exports = TermsAndConditions;
