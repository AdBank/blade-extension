"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");
const request = require("../utils/request");

const saveAdserverUrl = require("../utils/saveAdserverUrl");

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
    this.mainActionButton.classList.remove("disabled");

    browser.storage.sync.get("bladeUserData", (data) => this.sendRequest(data.bladeUserData));
  }

  sendRequest(userData)
  {
    request({
      method: "post",
      url: "/api/phrase/check",
      data: {secret_phrase: this.phraseTextarea.value.trim()}
    })
    .then((response) =>
    {
      const token = response.getResponseHeader("token");
      const userCode = JSON.parse(response.response).user_code;
      const newObj = Object.assign({}, userData, {token, userCode});

      saveAdserverUrl();

      browser.storage.sync.set({
        bladeUserData: newObj
      }, () => super.handleChangeView("resetPassword"));
    })
    .catch((err) =>
    {
      this.mainActionButton.classList.add("disabled");
      this.error.innerHTML = err.error;
    });
  }
}

module.exports = ResetPhrase;
