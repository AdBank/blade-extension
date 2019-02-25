/* eslint-disable max-len */

"use strict";

const BaseClass = require("../common/baseClass");
const formatDate = require("../../utils/formatDate");
const InfiniteListHelper = require("../common/infiniteListHelper");

class Referrals extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.infiniteListHelper = new InfiniteListHelper({
      listRenderCb: this.renderReferralsList.bind(this),
      urlStaticData: "here will be url for static data",
      urlList: "/jwt/user/referrals/list",
      responseLeftDataKey: "total_referred",
      responseRightDataKey: "total_rewards",
      leftNumberInfo: {numberText: "ADB", fieldDescription: "friends referred"},
      rightNumberInfo: {numberText: null, fieldDescription: "rewards earned"}
    });

    const linkButton = document.getElementById("go-to-referal-form-send-btn");
    this.emailListTarget = document.getElementById("infinite-list-content");

    linkButton.addEventListener("click", this.handleLinkBnt.bind(this));
  }

  handleLinkBnt()
  {
    super.handleChangeView("referralsFormView");
  }

  renderReferralsList(info)
  {
    this.generateHtml(info);
  }

  generateHtml(info)
  {
    const virtualRowContainer = document.createElement("div");
    for (let i = 0; i < info.length; i += 1)
    {
      const newRow = document.createElement("div");
      newRow.className = "infinite-list-row";
      const rewardInfo = Math.round(Number(info[i].reward));
      let userStatus = "<i class=\"icon-user-follow green\"></i>";
      if (info[i].status !== "ACCEPTED")
      {
        userStatus = info[i].status === "PENDING" ?
          "<img src=\"./skin/blade_icons/pending-referral.svg\"></img>" :
          "<i class=\"icon-user-unfollow red\"></i>";
      }
      const date = formatDate(info[i].created_at);
      newRow.innerHTML = `${userStatus}<p class="email">${info[i].email}</p><p class="info-tooltip">${info[i].email}</p><p class="date">${date}</p><p class="quantity">${rewardInfo}</p><p class="unit">ADB</p>`;
      virtualRowContainer.appendChild(newRow);
    }

    this.emailListTarget.appendChild(virtualRowContainer);
  }
}

module.exports = Referrals;
