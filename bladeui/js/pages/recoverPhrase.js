"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");

class RecoverPassword extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const backButton = document.getElementById("back-button");
    const mainActionButton = document.getElementById("main-action-button");
    this.phraseTextarea = document.getElementById("phrase-textarea");

    backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
    mainActionButton.addEventListener("click", this.handleOpenRecoverPhrase.bind(this));
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("recoverPhrase", "getStarted");
  }

  handleOpenRecoverPhrase()
  {
    const userPhrase = this.phraseTextarea.value;
    // send userPhrase to server if ok change view
    super.handleChangeView("recoverPhrase", "recoverPassword");
  }
}

module.exports = RecoverPassword;
