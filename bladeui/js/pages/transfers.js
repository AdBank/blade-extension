"use strict";

/* eslint-disable max-len*/

const BaseClass = require("./baseClass");
const request = require("../utils/request");
const {isAddress} = require("ethereum-address");
const walletCreationForm = require("../html/common/walletCreationForm.js");
const {MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_ERROR,
  MAX_PASSWORD_ERROR, VALID_WALLET_ADDRESS_LENGTH} = require("../utils/constants");
const loader = require("../html/common/loader");

class Transfers extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.startWalletAddress = "";
  }

  initListeners()
  {
    this.automaticTransfers = document.getElementById("enable-automatic-transfers");
    this.walletArea = document.getElementById("wallet-action-area");
    this.saveButton = document.getElementById("save-wallet");
    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.checkAutomaticTransferStatus();
    });
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
      this.startWalletAddress = res.wallet_address ? res.wallet_address : "";
    })
    .catch(err => console.error(err));
  }

  renderAutomaticTransferControl(status, wallet)
  {
    /* later will be changed, after move menu to different page cos now it also contains this switcher, so I had do duplicate this element with another id */
    this.enablerAutoTransfer = document.getElementById("switcher");
    this.enablerAutoTransfer && this.enablerAutoTransfer.addEventListener("change", this.handleSwitchAutoTransfer.bind(this));
    if (status) { this.enablerAutoTransfer.checked = true; }
    if (status)
    {
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
      this.saveButton.innerHTML = "EDIT WALLET";
      this.saveButton.addEventListener("click", this.handleEditButton.bind(this));
      this.renderSavedWallet(wallet);
    }
    else
    {
      this.renderWalletCreateForm();
    }
  }

  renderSavedWallet(wallet)
  {
    /* here will be implemented a method for representstion
      users wallet address, needed component will be pasted with this.walletArea.innerHTML*/
  }

  handleEditButton()
  {
    /* here will be implemented a method for edit wallet
      should be another data object for sending request */
  }

  clearWalletArea()
  {
    while (this.walletArea.firstChild)
    {
      this.walletArea.removeChild(this.walletArea.firstChild);
    }
    this.showButton(false);
  }

  renderWalletCreateForm()
  {
    this.walletArea.innerHTML = walletCreationForm();
    const passwordEye = document.getElementById("password-eye");
    this.passwordField = document.getElementById("start-password");
    this.passwordFieldError = document.getElementById("password-error");

    this.startWalletField = document.getElementById("public-wallet-address");
    this.startWalletErrorField = document.getElementById("public-wallet-error");

    this.startWalletField && this.startWalletField.addEventListener("change", this.handleWalletInputChange.bind(this));
    this.startWalletField && this.startWalletField.addEventListener("focus", this.handleWalletInputFocus.bind(this));
    this.startWalletField && this.startWalletField.addEventListener("blur", this.handleWalletInputBlur.bind(this));

    passwordEye && passwordEye.addEventListener("click", this.handleShowHidePassword.bind(this));
    this.passwordField && this.passwordField.addEventListener("change", this.handlePasswordFieldChange.bind(this));

    this.saveButton && this.saveButton.addEventListener("click", this.handleSaveButton.bind(this));
  }

  unhighlightErrors(inputField, errorField)
  {
    inputField.classList.remove("input-invalid");
    errorField.innerHTML = "";
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
    e.target.value = this.startWalletAddress;
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
    this.startWalletAddress = e.target.value;

    this.unhighlightErrors(e.target, this.startWalletErrorField);

    this.checkWallet(e.target, this.startWalletAddress, this.startWalletErrorField);
  }

  handleWalletInputBlur(e)
  {
    if (e.target.value.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      e.target.value = e.target.value.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }
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

  handlePasswordFieldChange(e)
  {
    this.unhighlightErrors(this.passwordField, this.passwordFieldError);
    const password = e.target.value;

    if (password.length < MIN_PASSWORD_LENGTH)
    {
      this.highlightErrors(this.passwordFieldError, this.passwordField, MIN_PASSWORD_ERROR);
    }
    if (password.length > MAX_PASSWORD_LENGTH)
    {
      this.highlightErrors(this.passwordFieldError, this.passwordField, MAX_PASSWORD_ERROR);
    }
  }

  disableSaveButton()
  {
    this.saveButton.disabled = true;
  }

  enableSaveButton()
  {
    this.saveButton.disabled = false;
  }

  handleSaveButton()
  {
    this.disableSaveButton();
    this.saveButton.classList.remove("disabled");
    const data = {
      user_wallet: this.startWalletAddress,
      password: this.passwordField.value,
      auto_transfer: this.autoTransfer
    };

    if (isAddress(this.startWalletAddress) &&
      this.passwordField.value.length >= MIN_PASSWORD_LENGTH &&
      this.passwordField.value.length < MAX_PASSWORD_LENGTH)
    {
      this.sendRequest(data);
    }
    else
    {
      this.highlightErrors();
      this.enableSaveButton();
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
      this.enableSaveButton();
      this.saveButton.innerHTML = loader(false);
      setTimeout(() => this.renderSavedWallet(this.startWalletAddress), 2000);
    })
    .catch(errorInfo =>
    {
      this.highlightErrors(this.passwordFieldError, null, errorInfo.error);
      this.saveButton.innerHTML = previousButtonContent;
      this.enableSaveButton();
    });
  }

  handleSwitchAutoTransfer(e)
  {
    this.autoTransfer = e.target.checked;
    if (e.target.checked && !this.wallet)
    {
      this.renderWalletCreateForm();
      this.showButton(true);
    }
    else
    {
      this.clearWalletArea();
      this.showButton(false);
    }
  }

  showButton(show)
  {
    this.saveButton.style.display = show ? "block" : "none";
  }
}

module.exports = Transfers;
