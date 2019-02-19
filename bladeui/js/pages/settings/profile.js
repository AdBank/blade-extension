/* eslint-disable max-len */

"use strict";

const BaseClass = require("../baseClass");
const {KYC_LINK} = require("../../utils/constants");
const request = require("../../utils/request");
const kycStatusButton = require("../../html/common/kycStatusButton");

class Profile extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.kycStatus = document.getElementById("kyc-status");
    this.resetPasswordButton = document.getElementById("reset-password-button");
    this.userIdField = document.getElementById("user-id");

    browser.storage.sync.get(null, (data) =>
    {
      this.userId = data.bladeUserData.userCode;
      this.token = data.bladeUserData.token;

      this.kycStatus.addEventListener("click", this.openKyc.bind(this));
      this.insertUserId();
      this.getData();
    });
    this.resetPasswordButton.addEventListener("click", this.handleOpenRecovering.bind(this));
  }

  insertUserId()
  {
    this.userIdField.innerHTML = this.userId;
  }

  openKyc()
  {
    browser.tabs.create({url: KYC_LINK + this.userId});
  }

  getData()
  {
    request({
      method: "get",
      url: "/jwt/kyc/status",
      headers: {
        Authorization: "Bearer " + this.token
      }
    })
    .then((data) =>
    {
      const res = JSON.parse(data.response);
      const button = kycStatusButton(res.status);
      this.kycStatus.insertAdjacentHTML("beforeend", button);
    })
    .catch((error) =>
    {
      console.error(error);
    });
  }

  handleOpenRecovering()
  {
    super.handleChangeView("resetPhrase");
  }
}

module.exports = Profile;
