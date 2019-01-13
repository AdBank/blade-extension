"use strict";

const BaseClass = require("./baseClass");

class TermsAndConditions extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    mainAppWrapper.classList.remove("custom-bg");
    btn.addEventListener("click", this.handleSubmitButton.bind(this));
  }

  handleSubmitButton(e)
  {
    const checkbox1 = document.getElementById("checkbox1");
    const checkbox2 = document.getElementById("checkbox2");

    if (!checkbox1.checked || !checkbox2.checked)
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
