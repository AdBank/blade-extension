"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");

class GetStarted extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    const accountRecoveringButton = document.getElementById("account-recovering");

    mainAppWrapper.classList.add("custom-bg");

    btn.addEventListener("click", this.handleOpenTermsAndConditions.bind(this));

    accountRecoveringButton.addEventListener("click", this.handleOpenRecoveringPage.bind(this));
  }

  handleOpenTermsAndConditions()
  {
    super.handleChangeView("termsAndConditions");
  }

  handleOpenRecoveringPage()
  {
    super.handleChangeView("recoverPhrase");
  }
}

module.exports = GetStarted;
