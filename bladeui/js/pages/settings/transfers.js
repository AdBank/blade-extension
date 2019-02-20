"use strict";

/* eslint-disable max-len */

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const {isAddress} = require("ethereum-address");
const walletCreationForm = require("../../html/transfers/walletCreationForm");
const PasswordHelper = require("../common/passwordHelper");
const {VALID_WALLET_ADDRESS_LENGTH} = require("../../utils/constants");
const loader = require("../../html/common/loader");
const walletInfo = require("../../html/transfers/walletInfo");
const WAIT_BEFORE_REDIRECT = 2000;

class Transfers extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.walletAddress = "";
  }

  initListeners()
  {
    this.automaticTransfers = document.getElementById("enable-automatic-transfers");
    this.thresholdAmount = document.getElementById("threshold-amount");
    this.walletArea = document.getElementById("wallet-action-area");
    this.saveButton = document.getElementById("save-wallet");
    this.enablerAutoTransfer = document.getElementById("checkbox");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.checkAutomaticTransferStatus();
      request({
        method: "get",
        url: "/jwt/transfer/threshold",
        headers: {
          Authorization: `Bearer ${this.bearerToken}`
        }
      })
      .then(response =>
      {
        const res = JSON.parse(response.response);
        this.thresholdAmount.innerText = Math.ceil(res.threshold) + " ADB";
      })
      .catch(() => this.thresholdAmount.innerText = "1000 ADB");
    });

    this.saveButton && this.saveButton.addEventListener("click", this.handleSaveButton.bind(this));
    this.enablerAutoTransfer.addEventListener("change", this.handleSwitchAutoTransfer.bind(this));
  }

  checkAutomaticTransferStatus()
  {
    request({
      method: "get",
      url: "/jwt/user/settings/transfers",
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(response =>
    {
      const res = JSON.parse(response.response);
      this.renderAutomaticTransferControl(res.auto_transfer, res.wallet_address);
      this.autoTransfer = res.auto_transfer;
      this.walletAddress = res.wallet_address ? res.wallet_address : "";
    })
    .catch(err => console.error(err));
  }

  renderAutomaticTransferControl(status, wallet)
  {
    if (status)
    {
      this.enablerAutoTransfer.checked = true;
      this.renderWalletContent(wallet);
    }
    else
    {
      this.clearWalletArea();
    }
  }

  renderWalletContent(wallet)
  {
    if (wallet)
    {
      this.renderSavedWallet(wallet);
    }
    else
    {
      this.renderWalletCreateForm();
    }
  }

  renderSavedWallet(wallet)
  {
    this.saveButton.innerHTML = "EDIT WALLET";
    this.showButton(true);
    this.walletArea.innerHTML = walletInfo(wallet);
  }

  handleEditButton()
  {
    this.saveButton.innerHTML = "SAVE WALLET";
    this.renderWalletCreateForm(this.walletAddress);
  }

  clearWalletArea()
  {
    while (this.walletArea.firstChild)
    {
      this.walletArea.removeChild(this.walletArea.firstChild);
    }
    this.showButton(false);
  }

  renderWalletCreateForm(wallet)
  {
    this.walletArea.innerHTML = walletCreationForm(wallet);
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("start-password");
    this.passwordFieldError = document.getElementById("password-error");

    this.startWalletField = document.getElementById("public-wallet-address");
    this.startWalletErrorField = document.getElementById("public-wallet-error");

    if (this.startWalletField)
    {
      this.startWalletField.addEventListener("change", this.handleWalletInputChange.bind(this));
      this.startWalletField.addEventListener("focus", this.handleWalletInputFocus.bind(this));
      this.startWalletField.addEventListener("blur", this.handleWalletInputBlur.bind(this));
    }

    this.passwordField.addEventListener("change", this.handlePasswordFieldChange.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordFieldError, passwordEye, this.saveButton);
  }

  unhighlightErrors(inputField, errorField)
  {
    if (inputField) inputField.classList.remove("input-invalid");
    if (errorField) errorField.innerHTML = "";
    const errors = document.getElementsByClassName("input-invalid");
    if (!errors.length)
    {
      this.saveButton.classList.remove("disabled");
    }
  }

  highlightErrors(errorField, inputField, error = "Please enter a ERC20 compatible wallet")
  {
    this.saveButton.classList.add("disabled");
    if (errorField) errorField.innerHTML = error;
    if (inputField) inputField.classList.add("input-invalid");
  }

  handleWalletInputFocus(e)
  {
    e.target.value = this.walletAddress;
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
  }

  handleWalletInputChange(e)
  {
    this.walletAddress = e.target.value;

    this.unhighlightErrors(e.target, this.startWalletErrorField);

    this.checkWallet(e.target, this.walletAddress, this.startWalletErrorField);
  }

  handleWalletInputBlur(e)
  {
    if (e.target.value.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      e.target.value = e.target.value.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }
  }

  handlePasswordFieldChange(e)
  {
    this.PasswordHelper.removeErrors();
    this.PasswordHelper.checkPassword();
  }

  switchSaveButton(status)
  {
    this.saveButton.disabled = status;
  }

  handleSaveButton()
  {
    if (this.saveButton.innerText === "EDIT WALLET")
    {
      this.handleEditButton();
      return true;
    }
    this.switchSaveButton(true);
    this.saveButton.classList.remove("disabled");
    const data = {
      user_wallet: this.walletAddress,
      password: this.passwordField.value,
      auto_transfer: this.autoTransfer
    };

    if (isAddress(this.walletAddress) &&
      this.PasswordHelper.checkPassword())
    {
      this.sendRequest(data);
    }
    else
    {
      this.highlightErrors();
      this.switchSaveButton(false);
    }
  }

  sendRequest(data)
  {
    const previousButtonContent = this.saveButton.innerHTML;
    this.saveButton.innerHTML = loader(true);
    request({
      method: "put",
      url: "/jwt/user/settings",
      data,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(() =>
    {
      this.switchSaveButton(false);
      this.saveButton.innerHTML = loader(false);
      const passwordContainer = document.getElementById("password");
      passwordContainer.remove();
      setTimeout(() => this.renderSavedWallet(this.walletAddress), WAIT_BEFORE_REDIRECT);
    })
    .catch(errorInfo =>
    {
      this.highlightErrors(this.passwordFieldError, null, errorInfo.error);
      this.saveButton.innerHTML = previousButtonContent;
      this.switchSaveButton(false);
    });
  }

  handleSwitchAutoTransfer(e)
  {
    this.enableSaveButton();

    this.autoTransfer = e.target.checked;
    if (this.autoTransfer && !this.walletAddress)
    {
      this.renderWalletCreateForm();
      this.showButton(true);
    }
    else if (this.autoTransfer && this.walletAddress)
    {
      this.renderSavedWallet(this.walletAddress);
      this.showButton(true);
    }
    else
    {
      this.walletAddress = "";
      this.passwordField.value = "";
      this.unhighlightErrors(this.passwordField, this.passwordFieldError);
      this.unhighlightErrors(this.startWalletField, this.startWalletErrorField);
      this.enablerAutoTransfer.disabled = true;
      request({
        method: "put",
        url: "/jwt/user/settings",
        data: {auto_transfer: false},
        headers: {
          Authorization: `Bearer ${this.bearerToken}`
        }
      })
      .then(() =>
      {
        this.enablerAutoTransfer.disabled = false;
        this.clearWalletArea();
        this.showButton(false);
      })
      .catch(errorInfo =>
      {
        this.enablerAutoTransfer.disabled = false;
        console.error(errorInfo);
      });
    }
  }

  showButton(show)
  {
    this.saveButton.style.display = show ? "block" : "none";
  }

  enableSaveButton()
  {
    this.saveButton.classList.remove("disabled");
  }
}

module.exports = Transfers;
