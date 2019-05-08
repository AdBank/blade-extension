/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {makeRequest} = require("../../utils/request");
const {isAddress} = require("ethereum-address");
const walletCreationForm = require("../../html/transfers/walletCreationForm");
const PasswordHelper = require("../common/passwordHelper");
const {VALID_WALLET_ADDRESS_LENGTH} = require("../../utils/constants");
const loader = require("../../html/common/loader");
const walletInfoRepresentation = require("../../html/transfers/walletInfo");
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
      this.checkThresholdAmount();
    });

    this.saveButton && this.saveButton.addEventListener("click", this.handleSaveButton.bind(this));
    this.enablerAutoTransfer.addEventListener("change", this.handleSwitchAutoTransfer.bind(this));
  }

  checkThresholdAmount()
  {
    makeRequest({
      method: "get",
      url: "/jwt/transfer/threshold"
    })
    .then(response =>
    {
      const res = JSON.parse(response.response);
      this.thresholdAmount.innerText = Math.ceil(res.threshold) + " ADB";
    })
    .catch(() => this.thresholdAmount.innerText = "not available");
  }

  checkAutomaticTransferStatus()
  {
    makeRequest({
      method: "get",
      url: "/jwt/user/settings/transfers"
    })
    .then(response =>
    {
      const res = JSON.parse(response.response);
      this.handleAutoTransfersStatus(res.auto_transfer, res.wallet_address);
    })
    .catch(err => console.error(err));
  }

  handleAutoTransfersStatus(status, wallet)
  {
    this.autoTransfer = status;
    this.walletAddress = wallet || "";
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
    if (wallet) this.renderSavedWallet(wallet);
    else this.renderWalletForm();
  }

  renderSavedWallet(walletAddress)
  {
    this.saveButton.innerHTML = "EDIT WALLET";
    this.showButton(true);
    this.walletArea.innerHTML = walletInfoRepresentation(walletAddress);
  }

  handleEditButton()
  {
    this.renderWalletForm(this.walletAddress);
  }

  clearWalletArea()
  {
    while (this.walletArea.firstChild)
    {
      this.walletArea.removeChild(this.walletArea.firstChild);
    }
    this.showButton(false);
  }

  renderWalletForm(wallet)
  {
    this.saveButton.innerHTML = "SAVE WALLET";

    this.walletArea.innerHTML = walletCreationForm(wallet);
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("start-password");
    this.passwordFieldError = document.getElementById("password-error");

    this.walletField = document.getElementById("public-wallet-address");
    this.walletErrorField = document.getElementById("public-wallet-error");

    this.walletField.addEventListener("change", this.handleWalletInputChange.bind(this));
    this.walletField.addEventListener("focus", this.handleWalletInputFocus.bind(this));
    this.walletField.addEventListener("blur", this.handleWalletInputBlur.bind(this));

    this.passwordField.addEventListener("change", this.handlePasswordFieldChange.bind(this));

    this.PasswordHelper = new PasswordHelper(this.passwordField, this.passwordFieldError, passwordEye);

    this.showButton(true);
  }

  checkWallet(walletField, walletAddress)
  {
    if (walletAddress.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      walletField.value = walletAddress.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }

    if (!isAddress(walletAddress))
    {
      this.showWalletError();
    }
  }

  showWalletError(error = "Please enter a ERC20 compatible wallet")
  {
    this.walletErrorField.innerHTML = error;
    this.walletField.classList.add("input-invalid");
  }

  removeWalletError()
  {
    this.walletField.classList.remove("input-invalid");
    this.walletErrorField.innerHTML = "";
  }

  handleWalletInputFocus(e)
  {
    e.target.value = this.walletAddress;
  }

  handleWalletInputChange(e)
  {
    this.walletAddress = e.target.value;

    this.removeWalletError();

    this.checkWallet(this.walletField, this.walletAddress);
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

  disableSaveButton(status)
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
    this.disableSaveButton(true);
    const data = {
      user_wallet: this.walletAddress,
      password: this.passwordField.value,
      auto_transfer: this.autoTransfer
    };

    if (isAddress(this.walletAddress) && this.PasswordHelper.checkPassword())
    {
      this.sendRequest(data);
    }
    else
    {
      if (!isAddress(this.walletAddress)) this.showWalletError();
      this.disableSaveButton(false);
    }
  }

  clearInputs()
  {
    this.walletAddress = "";
    if (this.passwordField)
    {
      this.passwordField.value = "";
      this.PasswordHelper.removeErrors();
      this.removeWalletError();
    }
  }

  sendRequest(data)
  {
    this.saveButton.innerHTML = loader(true);
    makeRequest({
      method: "put",
      url: "/jwt/user/settings",
      data
    })
    .then(() =>
    {
      this.disableSaveButton(false);
      this.saveButton.innerHTML = loader(false);
      const passwordContainer = document.getElementById("password");
      passwordContainer.remove();
      setTimeout(() => this.renderSavedWallet(this.walletAddress), WAIT_BEFORE_REDIRECT);
    })
    .catch(errorInfo =>
    {
      this.PasswordHelper.onError(errorInfo.error);
      this.saveButton.innerHTML = "SAVE WALLET";
      this.disableSaveButton(false);
    });
  }

  handleSwitchAutoTransfer(e)
  {
    this.autoTransfer = e.target.checked;
    if (this.autoTransfer && !this.walletAddress)
    {
      this.renderWalletForm();
    }
    else if (this.autoTransfer && this.walletAddress)
    {
      this.renderSavedWallet(this.walletAddress);
    }
    else
    {
      this.clearInputs();
      this.enablerAutoTransfer.disabled = true;
      makeRequest({
        method: "put",
        url: "/jwt/user/settings",
        data: {auto_transfer: false}
      })
      .then(() =>
      {
        this.enablerAutoTransfer.disabled = false;
        this.clearWalletArea();
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
}

module.exports = Transfers;
