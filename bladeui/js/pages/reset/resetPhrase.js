/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {makeRequest} = require("../../utils/request");
const saveAdserverUrl = require("../../utils/saveAdserverUrl");

class ResetPhrase extends BaseClass
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
    this.error = document.getElementById("error");

    backButton.addEventListener("click", this.handleOpenPreviousView.bind(this));
    this.mainActionButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("profile");
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
      }, () => super.handleChangeView("resetPassword"));
    })
    .catch((err) =>
    {
      this.error.innerHTML = err.error;
    });
  }
}

module.exports = ResetPhrase;
