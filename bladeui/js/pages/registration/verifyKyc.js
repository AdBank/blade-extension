"use strict";

const BaseClass = require("../common/baseClass");
const {KYC_VERIFICATION_LINK} = require("../../utils/constants");

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
    browser.storage.sync.get(null, (data) =>
    {
      browser.tabs.create({url: KYC_VERIFICATION_LINK + data.bladeUserData.userCode});
    });
  }

  handleSubmitButton(e)
  {
    super.handleChangeView("referralCode");
  }
}

module.exports = VerifyKyc;
