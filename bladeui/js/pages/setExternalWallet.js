/* eslint-disable max-len */

"use strict";

const BaseClass = require("./baseClass");
const {isAddress} = require("ethereum-address");

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
    if (isAddress(this.userInput) && this.checkbox.checked)
    {
      super.handleChangeView("setExternalWallet", "registrationCompleted");
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

  highlightErrors()
  {
    this.actionButton.classList.add("disabled");
    this.error.innerHTML = "Please enter a ERC20 compatible wallet";
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
