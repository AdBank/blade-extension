/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const {KYC_VERIFICATION_LINK} = require("../../utils/constants");
const {makeRequest} = require("../../utils/request");
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
    browser.tabs.create({url: KYC_VERIFICATION_LINK + this.userId});
  }

  getData()
  {
    makeRequest({
      method: "get",
      url: "/jwt/kyc/status"
    })
    .then((response) =>
    {
      const button = kycStatusButton(response.data.status);
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
