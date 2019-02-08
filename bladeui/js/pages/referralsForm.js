"use strict";

const BaseClass = require("./baseClass");

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
    this.message = document.getElementById("message");

    this.backButton.addEventListener("click",
      this.handleOpenPreviousView.bind(this));
    this.sendButton.addEventListener("click",
      this.handleSubmitReferralForm.bind(this));
    this.email.addEventListener("change", this.onChangeEmail.bind(this));
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
    }
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
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  highlightErrors(email, message)
  {
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
    const form = document.getElementById("referral-form").elements;
    const email = form[0].value;
    const message = form[1].value;
    if (this.validateEmail(email) && message)
    {
      this.sendButton.innerHTML = "<div class=\"loader\"></div>";
      this.sendButton.disabled = true;
      // send some reqiest with form data in response set check as div
      setTimeout(() =>
      {
        this.sendButton.innerHTML = "<div class=\"check\"></div>";
        this.sendButton.disabled = false;
      }, 5000);
    }
    else
    {
      this.highlightErrors(email, message);
    }
  }
}

module.exports = ReferralsForm;
