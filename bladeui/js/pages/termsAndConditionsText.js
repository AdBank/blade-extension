"use strict";

const BaseClass = require("./baseClass");

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
    super.handleChangeView("aboutExtension");
  }
}

module.exports = TermsAndConditionsText;
