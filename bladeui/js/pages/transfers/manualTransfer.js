/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const PasswordHelper = require("../common/passwordHelper");
const {makeRequest} = require("../../utils/request");
const loader = require("../../html/common/loader");
const WalletHelper = require("../common/walletHelper");

class ManualTransfer extends BaseClass
{
  constructor(props)
  {
    super(props);
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

    this.passwordField.addEventListener("change", this.handlePasswordFieldChange.bind(this));

    backButton.addEventListener("click", this.handleChangeView.bind(this));

    this.sendButton.addEventListener("click", this.handleSubmitButton.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordFieldError, passwordEye, this.sendButton);
    this.WalletHelper = new WalletHelper(this.walletField, this.walletErrorField);
    this.ConfirmWalletHelper = new WalletHelper(this.walletConfirmField, this.walletConfirmErrorField);
  }

  handleChangeView()
  {
    super.handleChangeView("transfersListView");
  }

  checkWallet()
  {
    if (this.WalletHelper.checkInput() && this.ConfirmWalletHelper.checkInput() &&
      this.WalletHelper.walletAddress !== this.ConfirmWalletHelper.walletAddress)
    {
      this.ConfirmWalletHelper.highlightErrors("Addresses need to match");

      return false;
    }

    return true;
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
      user_wallet: this.WalletHelper.walletAddress,
      password: this.PasswordHelper.password
    };

    if (this.PasswordHelper.checkPassword() && this.checkWallet())
    {
      this.sendRequest(data);
      this.sendButton.innerHTML = loader(true);
    }

    this.enableSubmitButton();
  }

  sendRequest(data)
  {
    makeRequest({
      method: "post",
      url: "/jwt/transfer",
      data,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(() =>
    {
      this.sendButton.innerHTML = loader(false);
    })
    .catch(errorInfo =>
    {
      this.PasswordHelper.onError(errorInfo.error);
      this.sendButton.innerHTML = "SEND";
      this.enableSubmitButton();
    });
  }
}

module.exports = ManualTransfer;
