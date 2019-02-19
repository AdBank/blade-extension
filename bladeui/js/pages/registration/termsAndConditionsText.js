"use strict";

const BaseClass = require("../common/baseClass");

class TermsAndConditionsText extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");

    btn.addEventListener("click", this.handleSubmitButton.bind(this));
  }

  handleSubmitButton(e)
  {
    super.handleChangeView("info");
  }
}

module.exports = TermsAndConditionsText;
