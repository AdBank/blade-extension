/* eslint-disable max-len */

"use strict";

const BaseClass = require("../baseClass");
const request = require("../../utils/request");
const formatDate = require("../../utils/formatDate");
const infiniteScrollLoader = require("../../html/common/infiniteScrollLoader");
const REFERRAL_ROW_COUNT = 10;
const MAXIMUM_FIT_WITHOUT_SCROLL = 4;

class Referrals extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.skip = 0;
    this.limit = REFERRAL_ROW_COUNT;
  }

  initListeners()
  {
    const linkBnt = document.getElementById("go-to-referal-form-send-btn");
    this.displayedEmailQuantity = document.getElementById("displayed-emails");
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.emailListTarget = document.getElementById("referrals-list-content");
    this.infiniteScrollTrigger = document.getElementById("infinite-scroll-trigger");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.initScrollObserver = this.initScrollObserver.bind(this);
      this.initScrollObserver();
      this.getReferralsInfo(this.skip, this.limit);
    });

    linkBnt.addEventListener("click", this.handleLinkBnt.bind(this));
    optionsDropDown.addEventListener("click", this.handleOpenOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectOption.bind(this));
    window.addEventListener("click", this.closeSelectOptions.bind(this));
  }

  initScrollObserver()
  {
    const options = {
      root: document.getElementById("referral-list-scroll-container"),
      rootMargin: "0px",
      threshold: 1.0
    };

    this.scrollObserver = new IntersectionObserver(this.scrollObserverCallback.bind(this), options);
  }

  stopScrollObserver()
  {
    this.scrollObserver.unobserve(this.infiniteScrollTrigger);
  }

  scrollObserverCallback(entries)
  {
    entries.forEach(entry =>
    {
      if (entry.intersectionRatio === 1)
      {
        this.getReferralsInfo(this.skip, this.limit);
      }
    });
  }

  getReferralsInfo(skip = 0, limit = REFERRAL_ROW_COUNT)
  {
    this.showLoader();
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
      if (res.referrals.length)
      {
        this.renderReferralsList(res.referrals);
        this.skip = this.skip + limit;
      }
      else
      {
        this.hideLoader();
        this.stopScrollObserver();
      }
    })
    .catch((err) =>
    {
      this.hideLoader();
      this.stopScrollObserver();
    });
  }

  renderRewardStats(totalReferred, totalReward)
  {
    const leftQuantity = document.getElementById("left-quantity");
    const rightQuantity = document.getElementById("right-quantity");
    const leftDescription = document.getElementById("left-description");
    const rightDescription = document.getElementById("right-description");

    leftDescription.innerHTML = "friends referred";
    leftQuantity.innerHTML = totalReferred;
    rightQuantity.innerHTML = `${totalReward} <span>ADB</span>`;
    rightDescription.innerHTML = "rewards earned";
  }

  handleLinkBnt()
  {
    super.handleChangeView("referralsFormView");
  }

  closeSelectOptions()
  {
    this.dropdown.style.display = "none";
  }

  handleOpenOptions(event)
  {
    event.stopPropagation();
    this.dropdown.style.display = this.dropdown.style.display === "none" ?
      "block" : "none";
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
      const date = formatDate(info[i].created_at);
      newRow.innerHTML = `${userStatus}<p class="email">${info[i].email}</p><p class="info-tooltip">${info[i].email}</p><p class="date">${date}</p><p class="quantity">${rewardInfo}</p><p class="unit">ADB</p>`;
      virtualRowContainer.appendChild(newRow);
    }
    this.hideLoader();
    this.emailListTarget.appendChild(virtualRowContainer);
    if (info.length > MAXIMUM_FIT_WITHOUT_SCROLL)
    {
      this.scrollObserver.observe(this.infiniteScrollTrigger);
    }
  }

  showLoader()
  {
    const loader = document.createElement("div");
    loader.id = "waitting-request";
    loader.innerHTML = infiniteScrollLoader();
    this.emailListTarget.appendChild(loader);
  }

  hideLoader()
  {
    const loader = document.getElementById("waitting-request");
    this.emailListTarget.removeChild(loader);
  }

  handleSelectOption(event)
  {
    const emailQuantity = event.target.dataset.quantity;
    this.displayedEmailQuantity.innerText = emailQuantity;

    this.limit = Number(emailQuantity);
    this.skip = 0;

    this.clearList();
    this.getReferralsInfo(this.skip, this.limit);

    this.closeSelectOptions();
  }

  clearList()
  {
    while (this.emailListTarget.firstChild)
    {
      this.emailListTarget.removeChild(this.emailListTarget.firstChild);
    }
    this.stopScrollObserver();
  }
}

module.exports = Referrals;
