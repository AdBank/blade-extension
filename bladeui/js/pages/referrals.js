"use strict";

const BaseClass = require("./baseClass");
const request = require("../utils/request");
const REFERRAL_ROW_COUNT = 10;

class Referrals extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const linkBnt = document.getElementById("go-to-referal-form-send-btn");
    this.displayedEmailQuantity = document.getElementById("displayed-emails");
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.emailListTarget = document.getElementById("referrals-list-content");
    // in developer mode doesnt work requests
    // browser.storage.sync.get("bladeUserData", (data) =>
    // {
      //   this.bearerToken = data.bladeUserData.token;
      //   this.getReferralsInfo();
      // });
    // to render at list something according to designed layout
    this.getReferralsInfo();
    this.totalReferred = 0;
    this.totalReward = 0;

    linkBnt.addEventListener("click", this.handleLinkBnt.bind(this));
    optionsDropDown.addEventListener("click",
      this.handleOpenOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectOption.bind(this));
    window.addEventListener("click", this.closeSelectOptions.bind(this));
  }

  getReferralsInfo(skip = 0, limit = REFERRAL_ROW_COUNT)
  {
    this.renderRewardStats("0", "0");
    request({
      method: "get",
      url: `/jwt/user/referrals/list?skip=${skip}&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);
      if (this.totalReferred !== res.total_referred ||
        this.totalReward !== res.total_rewards)
      {
        this.totalReferred = res.total_referred;
        this.totalReward = res.total_rewards;
        this.renderRewardStats(this.totalReferred, this.totalReward);
      }
      this.renderReferralsList(res.referrals);
    })
    .catch((err) => console.error(err));
  }

  renderRewardStats(totalReferred, totalReward)
  {
    const leftQuantity = document.getElementById("left-quantity");
    const rightQuantity = document.getElementById("right-quantity");
    leftQuantity.innerHTML = totalReferred;
    rightQuantity.innerHTML = `${totalReward} <span>ADB</span>`;
    const leftDescription = document.getElementById("left-description");
    const rightDescription = document.getElementById("right-description");
    leftDescription.innerHTML = "friends refered";
    rightDescription.innerHTML = "rewards earned";
  }

  handleLinkBnt()
  {
    super.handleChangeView("referralsFormView");
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("referralsMenuView");
  }

  closeSelectOptions()
  {
    this.dropdown.style.display = "none";
  }

  handleOpenOptions(event)
  {
    /* to prevent mess due to event listener on window
    for closing opened options */
    event.stopPropagation();
    if (this.dropdown.style.display === "none")
    {
      this.dropdown.style.display = "block";
    }
    else
    {
      this.dropdown.style.display = "none";
    }
  }

  renderReferralsList(info)
  {
    const virtualRowContainer = document.createElement("div");
    for (let i = 0; i < info.length; i += 1)
    {
      const newRow = document.createElement("div");
      newRow.className = "referrals-list-row";
      const rewardInfo = info[i].reward;
      let userStatus = "<i class=\"icon-user-follow green\"></i>";
      if (info[i].status !== "ACCEPTED")
      {
        userStatus = info[i].status === "PENDING" ?
          "<img src=\"./skin/blade_icons/pending-referral.svg\"></img>" :
          "<i class=\"icon-user-unfollow red\"></i>";
      }
      /* eslint-disable max-len */
      const date = info[i].created_at.substring(0, 10).split("").reverse().join("");
      newRow.innerHTML = `${userStatus}<p class="email">${info[i].email}</p><p class="date">${date}</p><p class="quantity">${rewardInfo}</p><p class="unit">ADB</p>`;
      virtualRowContainer.appendChild(newRow);
    }
    this.emailListTarget.appendChild(virtualRowContainer);
  }

  handleSelectOption(event)
  {
    const emailQuantity = event.target.dataset.quantity;
    this.displayedEmailQuantity.innerText = emailQuantity;
    this.handleOpenOptions();
    while (this.emailListTarget.firstChild)
    {
      this.emailListTarget.removeChild(this.emailListTarget.firstChild);
    }
    this.getReferralsInfo(0, Number(emailQuantity));
  }
}

module.exports = Referrals;
