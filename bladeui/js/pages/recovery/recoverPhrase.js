/* eslint-disable max-len, no-console */
"use strict";

const BaseClass = require("../common/baseClass");
const {makeRequest} = require("../../utils/request");
const saveAdserverUrl = require("../../utils/saveAdserverUrl");

class RecoverPhrase extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const backButton = document.getElementById("back-button");
    this.mainActionButton = document.getElementById("main-action-button");
    this.phraseTextarea = document.getElementById("phrase-textarea");
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    this.error = document.getElementById("error");

    mainAppWrapper.classList.remove("custom-bg");

    backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("getStarted");
  }

  handleSubmit()
  {
    this.error.innerHTML = "";

    browser.storage.sync.get("bladeUserData", (data) => this.sendRequest(data.bladeUserData));
  }

  sendRequest(userData)
  {
    makeRequest({
      method: "post",
      url: "/api/phrase/check",
      data: {secret_phrase: this.phraseTextarea.value.trim()}
    })
    .then((response) =>
    {
      const token = response.headers.token;
      const userCode = response.data.user_code;
      const referralCode = response.data.referral_code;
      const newObj = Object.assign({}, userData, {token, userCode, referralCode});

      saveAdserverUrl();

      browser.storage.sync.set({
        bladeUserData: newObj
      }, () => super.handleChangeView("feedMenuView"));
    })
    .catch((err) =>
    {
      this.error.innerHTML = err.error;
    });
  }
}

module.exports = RecoverPhrase;
