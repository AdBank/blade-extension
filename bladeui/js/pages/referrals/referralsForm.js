"use strict";

/* eslint-disable max-len */

const BaseClass = require("../common/baseClass");

class ReferralsForm extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.backButton = document.getElementById("back-button");
    this.copyButton = document.getElementById("copy-button");
    this.referralCodeField = document.getElementById("referral-code");
   

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.referralCode = data.bladeUserData.referralCode;

      this.referralCodeField.innerHTML = this.referralCode;
    });

    this.copyButton.addEventListener("click", this.handleCopyButton.bind(this));
    this.backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
  }

  copyToClipboard(str)
  {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) :
        false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected)
    {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  handleCopyButton(e)
  {
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("hidden");
    tooltip.classList.add("visible");
    setTimeout(() =>
    {
      tooltip.classList.add("hidden");
      tooltip.classList.remove("visible");
    }, 3000);
    this.copyToClipboard(this.referralCode);
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("referralsMenuView");
  }

}

module.exports = ReferralsForm;
