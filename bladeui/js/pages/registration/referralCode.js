/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {makeRequest} = require("../../utils/request");

class ReferralCode extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.mainActionButton = document.getElementById("action-btn");
    this.referralCodeField = document.getElementById("referral-code");
    this.referralCodeError = document.getElementById("referral-code-error");
    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
    });

    this.mainActionButton.addEventListener("click",
      this.handleSubmitButton.bind(this));
    this.referralCodeField.addEventListener("keydown",
      this.handleReferralCodeKeyDown.bind(this));
    this.referralCodeField.addEventListener("paste",
      this.handleReferralCodeKeyDown.bind(this));
  }

  highlightErrors(errorText)
  {
    this.mainActionButton.innerHTML = "SKIP";
    this.referralCodeError.innerHTML = errorText;
    this.referralCodeField.classList.add("input-invalid");
  }

  clearErrors()
  {
    this.referralCodeField.classList.remove("input-invalid");
    this.referralCodeError.innerHTML = "";
  }

  handleReferralCodeKeyDown(event)
  {
    const keyID = event.keyCode;
    // check if entered referral code was removed completely
    if (keyID === 8 || keyID === 46)
    {
      this.mainActionButton.innerHTML = this.referralCodeField.value === "" ||
        this.referralCodeField.value.length === 1 ? "SKIP" : "CONFIRM";
      return true;
    }
    this.clearErrors();
    this.mainActionButton.innerHTML = "CONFIRM";
  }

  handleSubmitButton(e)
  {
    this.clearErrors();

    if (this.referralCodeField.value && this.mainActionButton.innerHTML !== "SKIP")
    {
      this.sendRequest();
      return true;
    }
    super.handleChangeView("setExternalWallet");
  }

  sendRequest()
  {
    makeRequest({
      method: "post",
      url: "/jwt/user/referrals",
      data: {referral_code: this.referralCodeField.value},
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(() => super.handleChangeView("setExternalWallet"))
    .catch((err) => this.highlightErrors(err.error));
  }
}

module.exports = ReferralCode;
