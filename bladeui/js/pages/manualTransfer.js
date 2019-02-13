"use strict";

/* eslint-disable */

const BaseClass = require("./baseClass");
const request = require("../utils/request");
const {isAddress} = require("ethereum-address");
const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, VALID_WALLET_ADDRESS_LENGTH} = require("../utils/constants");

class ManualTransfer extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.walletAddress = "";
  }

  initListeners()
  {
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("password");
    this.walletField = document.getElementById("wallet-address");
    this.confirmWalletField = document.getElementById("confirm-wallet-address");
    this.sendButton = document.getElementById("send-button");
    this.walletErrorField = document.getElementById("wallet-error");

    browser.storage.sync.get(null, (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
    });

    this.walletField.addEventListener("change", this.handleWalletInputChange.bind(this));
    this.walletField.addEventListener("focus", this.handleWalletInputFocus.bind(this));
    this.walletField.addEventListener("blur", this.handleWalletInputBlur.bind(this));
    // this.confirmWalletField.addEventListener("focus", this.handleInputFocus.bind(this));
    // this.confirmWalletField.addEventListener("blur", this.handleInputBlur.bind(this));
    passwordEye.addEventListener("click", this.handleShowHidePassword.bind(this));
    this.sendButton.addEventListener("click", this.handleSubmitButton.bind(this));
  }

  handleWalletInputFocus(e)
  {
    e.target.value = this.walletAddress;
  }

  handleWalletInputBlur(e)
  {
    e.target.value = e.target.value.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
  }

  handleWalletInputChange(e)
  {
    this.walletAddress = e.target.value;

    this.sendButton.classList.remove("disabled");
    e.target.classList.remove("input-invalid");
    this.error.innerHTML = "";

    if (this.walletAddress.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      e.target.value = this.walletAddress.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }

    if (!isAddress(this.walletAddress))
    {
      this.highlightErrors(this.walletErrorField, this.walletField);
    }
  }

  highlightErrors(errorField, inputField, error = "Please enter a ERC20 compatible wallet")
  {
    this.sendButton.classList.add("disabled");
    if (errorField) errorField.innerHTML = error;
    if (inputField) inputField.classList.add("input-invalid");
  }

  handleShowHidePassword(e)
  {
    const icon = e.target;
    const shownIconClassname = "ion-md-eye";
    const hiddenIconClassname = "ion-md-eye-off";

    if (icon.classList.contains(hiddenIconClassname))
    {
      icon.classList.remove(hiddenIconClassname);
      icon.classList.add(shownIconClassname);
      this.passwordField.type = "text";
    }
    else
    {
      icon.classList.add(hiddenIconClassname);
      icon.classList.remove(shownIconClassname);
      this.passwordField.type = "password";
    }
  }

  handleSubmitButton()
  {
    const data = {
      user_wallet: this.walletAddress,
      password: this.passwordField.value
    };

    if (isAddress(this.userInput) && this.passwordField.length > MIN_PASSWORD_LENGTH &&
      this.passwordField.length < MAX_PASSWORD_LENGTH)
    {
      this.sendRequest(data);
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
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(() => {})
    .catch(errorInfo => this.highlightErrors(errorInfo.error));
  }
}

module.exports = ManualTransfer;
