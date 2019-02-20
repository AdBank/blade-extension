/* eslint-disable */

"use strict";

const {VALID_WALLET_ADDRESS_LENGTH} = require("../../utils/constants");
const {isAddress} = require("ethereum-address");

class WalletHelper
{
  constructor(walletField, walletError)
  {
    this.walletField = walletField;
    this.walletError = walletError;

    this.wallet = "";

    this.initListeners();
  }

  get walletAddress()
  {
    return this.wallet;
  }

  initListeners()
  {
    this.walletField.addEventListener("change", this.handleInputChange.bind(this));
    this.walletField.addEventListener("focus", this.handleInputFocus.bind(this));
    this.walletField.addEventListener("blur", this.handleInputBlur.bind(this));
  }

  handleInputFocus(e)
  {
    e.target.value = this.wallet;
  }

  handleInputBlur(e)
  {
    console.log(e);
    this.sliceInputIfPossible(e);
  }

  sliceInputIfPossible(e)
  {
    if (e.target.value.length > VALID_WALLET_ADDRESS_LENGTH)
    {
      e.target.value = e.target.value.slice(0, VALID_WALLET_ADDRESS_LENGTH) + "...";
    }
  }

  removeErrors()
  {
    this.walletField.classList.remove("input-invalid");
    this.walletError.innerHTML = "";
  }

  handleInputChange(e)
  {
    this.wallet = e.target.value;

    this.removeErrors();

    this.sliceInputIfPossible(e);

    this.checkInput();
  }

  checkInput()
  {
    if (!isAddress(this.wallet))
    {
      this.highlightErrors();

      return false;
    }

    return true;
  }

  highlightErrors(error = "Please enter a ERC20 compatible wallet")
  {
    this.walletError.innerHTML = error;
    this.walletField.classList.add("input-invalid");
  }

  clearField()
  {
    this.walletField.value = "";
    this.wallet = "";
  }
}

module.exports = WalletHelper;
