"use strict";

const BaseClass = require("./baseClass");
const request = require("../utils/request");

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
    this.referralCodeField.addEventListener("keypress",
      this.handleReferralCodeKeyPress.bind(this)
    );
    this.referralCodeField.addEventListener("keydown", this.keyDown.bind(this));
    this.referralCodeField.addEventListener("paste",
      this.handlePasteCode.bind(this));
  }

  highlightErrors(errorText)
  {
    this.mainActionButton.innerHTML = "SKIP";
    this.referralCodeError.innerHTML = errorText;
    this.referralCodeField.classList.add("input-invalid");
  }

  handleReferralCodeKeyPress()
  {
    this.referralCodeField.classList.remove("input-invalid");
    this.referralCodeError.innerHTML = "";
    this.mainActionButton.innerHTML = "CONFIRM";
  }

  keyDown(event)
  {
    const keyID = event.keyCode;
    switch (keyID)
    {
      case 8:
      case 46:
        this.mainActionButton.innerHTML = this.referralCodeField.value === "" ||
          this.referralCodeField.value.length === 1 ? "SKIP" : "CONFIRM";
        break;
      default:
        break;
    }
  }

  handlePasteCode()
  {
    this.handleReferralCodeKeyPress();
  }

  handleSubmitButton(e)
  {
    this.referralCodeError.innerHTML = "";
    this.referralCodeField.classList.remove("input-invalid");

    if (this.referralCodeField.value)
    {
      this.sendRequest();
      return true;
    }
    super.handleChangeView("setExternalWallet");
  }

  sendRequest()
  {
    request({
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
