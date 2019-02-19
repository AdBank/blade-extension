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
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    this.termsAndConditionsCheckbox = document.getElementById("checkbox1");
    this.notResidentOfUSAorCanadaCheckbox = document.getElementById("checkbox2");

    mainAppWrapper.classList.remove("custom-bg");
    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));
    this.termsAndConditionsCheckbox.addEventListener("change", this.handleCheckboxChanged.bind(this));
    this.notResidentOfUSAorCanadaCheckbox.addEventListener("change", this.handleCheckboxChanged.bind(this));
  }

  handleCheckboxChanged(e)
  {
    if (this.termsAndConditionsCheckbox.checked && this.notResidentOfUSAorCanadaCheckbox.checked)
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
    if (!this.termsAndConditionsCheckbox.checked || !this.notResidentOfUSAorCanadaCheckbox.checked)
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
