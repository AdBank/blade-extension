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
    this.kycButton = document.getElementById("kyc-button");

    btn.addEventListener("click", this.handleSubmitButton.bind(this));
    this.kycButton.addEventListener("click", this.handleKycClicked.bind(this));
  }

  handleKycClicked(e)
  {
    const href = this.kycButton.getAttribute("data-href");

    browser.storage.sync.get(null, (data) =>
    {
      browser.tabs.create({url: href + data.bladeUserData.userCode});
    });
  }

  handleSubmitButton(e)
  {
    super.handleChangeView("confirmSecretPhrase");
  }
}

module.exports = VerifyKyc;
