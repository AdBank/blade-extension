/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const request = require("../../utils/request");
const {isAddress} = require("ethereum-address");
const {VALID_WALLET_ADDRESS_LENGTH} = require("../../utils/constants");
const loader = require("../../html/common/loader");

class ManualTransfer extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.walletAddress = "";
    this.walletConfirmAddress = "";
  }

  initListeners()
  {
    const backButton = document.getElementById("back-button");

    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("password");
    this.passwordFieldError = document.getElementById("password-error");

    this.walletField = document.getElementById("wallet-address");
    this.walletErrorField = document.getElementById("wallet-error");

    this.walletConfirmField = document.getElementById("confirm-wallet-address");
    this.walletConfirmErrorField = document.getElementById("confirm-wallet-error");

    this.sendButton = document.getElementById("send-button");

    browser.storage.sync.get(null, (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
    });

    this.walletField.addEventListener("change", this.handleWalletInputChange.bind(this));
    this.walletField.addEventListener("focus", this.handleWalletInputFocus.bind(this));
    this.walletField.addEventListener("blur", this.handleWalletInputBlur.bind(this));

    this.walletConfirmField.addEventListener("change", this.handleConfirmWalletInputChange.bind(this));
    this.walletConfirmField.addEventListener("focus", this.handleWalletConfirmInputFocus.bind(this));
    this.walletConfirmField.addEventListener("blur", this.handleWalletInputBlur.bind(this));

    this.passwordField.addEventListener("change", this.handlePasswordFieldChange.bind(this));

    backButton.addEventListener("click", this.handleChangeView.bind(this));

    this.sendButton.addEventListener("click", this.handleSubmitButton.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordFieldError, passwordEye, this.sendButton);
  }

  handleChangeView()
  {
    super.handleChangeView("transfersListView");
  }

  handleWalletInputFocus(e)
  {
    e.target.value = this.walletAddress;
  }

  handleWalletConfirmInputFocus(e)
  {
    e.target.value = this.walletConfirmAddress;
  }

  handleWalletInputBlur(e)
  {
    if (e.target.value.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      e.target.value = e.target.value.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }
  }

  handleWalletInputChange(e)
  {
    this.walletAddress = e.target.value;

    this.unhighlightErrors(e.target, this.walletErrorField);

    this.checkWallet(e.target, this.walletAddress, this.walletErrorField);
  }

  handleConfirmWalletInputChange(e)
  {
    this.walletConfirmAddress = e.target.value;

    this.unhighlightErrors(e.target, this.walletConfirmErrorField);

    this.checkWallet(e.target, this.walletConfirmAddress, this.walletConfirmErrorField);
  }

  checkWallet(walletField, walletAddress, walletErrorField)
  {
    if (walletAddress.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      walletField.value = walletAddress.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }

    if (!isAddress(walletAddress))
    {
      this.highlightErrors(walletErrorField, walletField);
    }

    if (this.walletAddress && this.walletConfirmAddress && this.walletAddress !== this.walletConfirmAddress)
    {
      this.highlightErrors(this.walletConfirmErrorField, this.walletConfirmField, "Addresses need to match");
    }
  }

  unhighlightErrors(inputField, errorField)
  {
    inputField.classList.remove("input-invalid");
    errorField.innerHTML = "";
  }

  highlightErrors(errorField, inputField, error = "Please enter a ERC20 compatible wallet")
  {
    if (errorField) errorField.innerHTML = error;
    if (inputField) inputField.classList.add("input-invalid");
  }

  handlePasswordFieldChange(e)
  {
    this.PasswordHelper.checkPassword();
  }

  disableSubmitButton()
  {
    this.sendButton.disabled = true;
  }

  enableSubmitButton()
  {
    this.sendButton.disabled = false;
  }

  handleSubmitButton()
  {
    this.disableSubmitButton();
    const data = {
      user_wallet: this.walletAddress,
      password: this.passwordField.value
    };

    if (isAddress(this.walletAddress) && isAddress(this.walletConfirmAddress) && this.PasswordHelper.checkPassword())
    {
      this.sendRequest(data);
      this.sendButton.innerHTML = loader(true);
    }
    else
    {
      this.highlightErrors();
      this.enableSubmitButton();
    }
  }

  sendRequest(data)
  {
    request({
      method: "post",
      url: "/jwt/transfer",
      data,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(() =>
    {
      this.sendButton.innerHTML = loader(true);
      this.enableSubmitButton();
    })
    .catch(errorInfo =>
    {
      this.highlightErrors(this.passwordFieldError, null, errorInfo.error);
      this.sendButton.innerHTML = "SEND";
      this.enableSubmitButton();
    });
  }
}

module.exports = ManualTransfer;
