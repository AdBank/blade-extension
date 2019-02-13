"use strict";

const BaseClass = require("./baseClass");
const loader = require("../html/common/loader");
const request = require("../utils/request");

class ReferralsForm extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.backButton = document.getElementById("back-button");
    this.sendButton = document.getElementById("send-referral-btn");
    this.email = document.getElementById("email");
    this.emailError = document.getElementById("email-error");
    this.message = document.getElementById("message");
    this.form = document.getElementById("referral-form");
    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
    });

    this.backButton.addEventListener("click",
      this.handleOpenPreviousView.bind(this));
    this.sendButton.addEventListener("click",
      this.handleSubmitReferralForm.bind(this));
    this.email.addEventListener("change", this.onChangeEmail.bind(this));
    this.email.addEventListener("paste", this.handlePasteEmail.bind(this));
    this.message.addEventListener("change", this.onChangeMessage.bind(this));
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("referralsMenuView");
  }

  onChangeEmail(e)
  {
    if (this.validateEmail(e.target.value))
    {
      this.email.classList.remove("input-invalid");
      this.sendButton.innerHTML = "SEND";
    }
  }

  handlePasteEmail()
  {
    this.email.classList.remove("input-invalid");
    this.sendButton.innerHTML = "SEND";
  }

  onChangeMessage(e)
  {
    if (e.target.value)
    {
      this.message.classList.remove("input-invalid");
    }
  }

  validateEmail(email)
  {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  highlightErrors(email, message)
  {
    this.sendButton.innerHTML = "SEND";
    if (!this.validateEmail(email))
    {
      this.email.classList.add("input-invalid");
    }
    if (!message)
    {
      this.message.classList.add("input-invalid");
    }
  }

  handleSubmitReferralForm(e)
  {
    e.preventDefault();
    const email = this.form.elements["email"].value;
    const message = this.form.elements["message"].value;
    this.emailError.innerHTML = "";
    if (this.validateEmail(email) && message)
    {
      this.sendButton.innerHTML = loader(true);
      this.sendButton.disabled = true;
      request({
        method: "post",
        url: "/jwt/user/referrals/send",
        data: {email, message},
        headers: {
          Authorization: `Bearer ${this.bearerToken}`
        }
      })
      .then(() =>
      {
        this.sendButton.innerHTML = loader(false);
        this.sendButton.disabled = false;
      })
      .catch((err) =>
      {
        this.sendButton.innerHTML = "SEND";
        this.sendButton.disabled = false;
        this.emailError.innerHTML = err.error;
      });
    }
    else
    {
      this.highlightErrors(email, message);
    }
  }
}

module.exports = ReferralsForm;
