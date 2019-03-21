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
    const link = document.getElementById("link");

    link.addEventListener("click", this.handleOpenLink.bind(this));
    btn.addEventListener("click", this.handleSubmitButton.bind(this));
  }

  handleOpenLink(e)
  {
    e.preventDefault();
    browser.tabs.create({url: e.target.href});
  }

  handleSubmitButton(e)
  {
    super.handleChangeView("info");
  }
}

module.exports = TermsAndConditionsText;
