/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {makeRequest} = require("../../utils/request");
const WalletHelper = require("../common/walletHelper");

class SetExternalWallet extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.actionButton = document.getElementById("action-btn");
    this.input = document.getElementById("public-wallet-address");
    this.error = document.getElementById("error");
    this.inputGroup = document.getElementById("form-group");
    this.checkbox = document.getElementById("checkbox");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
    });

    this.actionButton.addEventListener("click", this.handleSubmitButton.bind(this));
    this.checkbox.addEventListener("change", this.handleCheckboxChange.bind(this));

    this.WalletHelper = new WalletHelper(this.input, this.error);
  }


  handleSubmitButton(e)
  {
    const data = {
      auto_transfer: this.checkbox.checked,
      user_wallet: this.WalletHelper.walletAddress
    };

    if (this.WalletHelper.checkInput() && this.checkbox.checked)
    {
      this.sendRequest(data);
    }
    else if (!this.checkbox.checked)
    {
      super.handleChangeView("registrationCompleted");
    }
  }

  sendRequest(data)
  {
    makeRequest({
      method: "post",
      url: "/jwt/user/wallet",
      data
    })
    .then(() => super.handleChangeView("registrationCompleted"))
    .catch(errorInfo => this.WalletHelper.highlightErrors(errorInfo.error));
  }

  handleCheckboxChange(e)
  {
    if (this.checkbox.checked)
    {
      this.inputGroup.classList.remove("wrapper-hidden");
    }
    else
    {
      this.inputGroup.classList.add("wrapper-hidden");
      this.WalletHelper.clearField();
      this.WalletHelper.removeErrors();
    }
  }
}

module.exports = SetExternalWallet;
