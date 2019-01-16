"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");

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
    this.checkbox1 = document.getElementById("checkbox1");
    this.checkbox2 = document.getElementById("checkbox2");

    mainAppWrapper.classList.remove("custom-bg");
    this.mainActionButton.addEventListener("click", this.handleSubmitButton.bind(this));
    this.checkbox1.addEventListener("change", this.handleCheckboxChanged.bind(this));
    this.checkbox2.addEventListener("change", this.handleCheckboxChanged.bind(this));
  }

  handleCheckboxChanged(e)
  {
    if (this.checkbox1.checked && this.checkbox2.checked)
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
    if (!this.checkbox1.checked || !this.checkbox2.checked)
    {
      e.target.classList.add("disabled");
    }
    else
    {
      super.handleChangeView("termsAndConditions", "createPasswordView");
    }
  }
}

module.exports = TermsAndConditions;
