/* eslint-disable max-len, no-console */

"use strict";

const BaseClass = require("./baseClass");
const {isAddress} = require("ethereum-address");
const request = require("../utils/request");

const VALID_LENGTH = 25;

class SetExternalWallet extends BaseClass
{
  constructor(props)
  {
    super(props);

    this.userInput = "";
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
    this.input.addEventListener("change", this.handleInputChange.bind(this));
    this.input.addEventListener("focus", this.handleInputFocus.bind(this));
    this.input.addEventListener("blur", this.handleInputBlur.bind(this));
    this.checkbox.addEventListener("change", this.handleCheckboxChange.bind(this));
  }

  handleInputFocus(e)
  {
    e.target.value = this.userInput;
  }

  handleInputBlur(e)
  {
    e.target.value = e.target.value.slice(0, VALID_LENGTH) + "...";
  }

  handleSubmitButton(e)
  {
    const data = {
      auto_transfer: this.checkbox.checked,
      user_wallet: this.userInput
    };

    if (isAddress(this.userInput) && this.checkbox.checked)
    {
      this.sendRequest(data);
    }
    else if (!this.checkbox.checked)
    {
      super.handleChangeView("setExternalWallet", "registrationCompleted");
    }
    else
    {
      this.highlightErrors();
    }
  }

  sendRequest(data)
  {
    request({
      method: "post",
      url: "/jwt/user/wallet",
      data,
      headers: {
        "Authorization": `Bearer ${this.bearerToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(() => super.handleChangeView("setExternalWallet", "registrationCompleted"))
    .catch(errorInfo => this.highlightErrors(errorInfo.error));
  }

  highlightErrors(error = "Please enter a ERC20 compatible wallet")
  {
    this.actionButton.classList.add("disabled");
    this.error.innerHTML = error;
    this.input.classList.add("input-invalid");
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
      this.input.value = "";
      this.error.innerHTML = "";
      this.input.classList.remove("input-invalid");
      this.actionButton.classList.remove("disabled");
    }
  }

  handleInputChange(e)
  {
    const userAddress = e.target.value;

    this.actionButton.classList.remove("disabled");
    e.target.classList.remove("input-invalid");
    this.error.innerHTML = "";

    if (userAddress.length > VALID_LENGTH)
    {
      this.userInput = userAddress;
      e.target.value = userAddress.slice(0, VALID_LENGTH) + "...";
    }
    else
    {
      this.userInput = userAddress;
    }

    if (!isAddress(this.userInput))
    {
      this.highlightErrors();
    }
  }
}

module.exports = SetExternalWallet;
