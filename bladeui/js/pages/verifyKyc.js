"use strict";

const BaseClass = require("./baseClass");

class VerifyKyc extends BaseClass
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
    super.handleChangeView("verifyKyc", "confirmSecretPhrase");
  }
}

module.exports = VerifyKyc;
