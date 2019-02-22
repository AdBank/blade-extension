"use strict";

/* eslint-disable max-len */

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const infiniteScrollLoader = require("../../html/common/infiniteScrollLoader");
const DEFAULT_LIMIT = 4;
const MAXIMUM_FIT_WITHOUT_SCROLL = 5;
class FeedView extends BaseClass
{
  constructor(props)
  {
    super(props);

    this.skip = 0;
    this.limit = DEFAULT_LIMIT;

    this.totalAdsViewed = 0;
    this.todayAdsViewed = 0;
  }

  initListeners()
  {
    const dropdownHandler = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.dropdownActiveItem = document.getElementById("dropdown-active");
    this.feedListWrapper = document.getElementById("infinite-list-content");

    // browser.storage.sync.get("bladeUserData", (data) =>
    // {
    //   this.bearerToken = data.bladeUserData.token;
    //   this.initScrollObserver = this.initScrollObserver.bind(this);
    //   this.initScrollObserver();
    //   this.getFeedInfo(this.skip, this.limit);
    // });
    this.initScrollObserver = this.initScrollObserver.bind(this);
    this.initScrollObserver();
    this.getFeedInfo();

    dropdownHandler.addEventListener("click", this.handleOpenOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectOption.bind(this));
    window.addEventListener("click", this.closeSelectOptions.bind(this));
  }

  initScrollObserver()
  {
    const options = {
      root: document.getElementById("infinite-list-scroll-container"),
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
        this.getFeedsInfo(this.skip, this.limit);
      }
    });
  }

  handleOpenOptions(event)
  {
    event.stopPropagation();
    this.dropdown.style.display = this.dropdown.style.display === "none" ?
      "block" : "none";
  }

  handleSelectOption(event)
  {
    const selectedItem = event.target.dataset.quantity;
    this.dropdownActiveItem.innerText = selectedItem;

    this.limit = selectedItem;
    this.skip = 0;

    // this.clearList();
    // this.getReferralsInfo(this.skip, this.limit);

    this.closeSelectOptions();
  }

  getFeedInfo(skip = 0, limit = DEFAULT_LIMIT)
  {
    this.showLoader();
    // request({
    //   method: "get",
    //   url: `/jwt/user/referrals/list?skip=${skip}&limit=${limit}`,
    //   headers: {
    //     Authorization: `Bearer ${this.bearerToken}`
    //   }
    // })
    // .then((response) =>
    // {
    //   const res = JSON.parse(response.response);
    //   if (this.totalReferred !== res.total_referred ||
    //     this.totalReward !== res.total_rewards)
    //   {
    //     this.totalReferred = res.total_referred;
    //     this.totalReward = res.total_rewards;
    //     this.renderRewardStats(this.totalReferred, this.totalReward);
    //   }
    //   if (res.referrals.length)
    //   {
    //     this.renderReferralsList(res.referrals);
    //     this.skip = this.skip + limit;
    //   }
    //   else
    //   {
    //     this.hideLoader();
    //     this.stopScrollObserver();
    //   }
    // })
    // .catch((err) =>
    // {
    //   this.hideLoader();
    //   this.stopScrollObserver();
    // });

    const response = {
      total_ad_viewed: 1234,
      today_ad_viewed: 12,
      list: [
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params",
        "example.com/very/cool/and/big/round?with_params"
      ]
    };

    if (this.totalAdsViewed !== response.total_ad_viewed ||
      this.todayAdsViewed !== response.today_ad_viewed)
    {
      this.totalAdsViewed = response.total_ad_viewed;
      this.todayAdsViewed = response.today_ad_viewed;
      this.renderAdStatistics();
    }

    this.renderFeedsList(response.list);
  }

  renderAdStatistics()
  {
    const leftQuantity = document.getElementById("left-quantity");
    const rightQuantity = document.getElementById("right-quantity");
    const leftDescription = document.getElementById("left-description");
    const rightDescription = document.getElementById("right-description");

    leftDescription.innerHTML = "ad views total";
    leftQuantity.innerHTML = this.totalAdsViewed;
    rightQuantity.innerHTML = this.todayAdsViewed;
    rightDescription.innerHTML = "ad views today";
  }

  renderFeedsList(data)
  {
    const container = document.createElement("div");
    for (let i = 0; i < data.length; i += 1)
    {
      const newRow = document.createElement("div");
      const button = document.createElement("button");
      const icon = document.createElement("i");

      newRow.className = "infinite-list-row";
      icon.className = "fa fa-sign-out";

      button.innerHTML = data[i].length > 20 ? data[i].slice(0, 20) + "..." : data[i];
      button.title = data[i];
      button.dataset.href = data[i];

      icon.dataset.href = data[i];

      button.addEventListener("click", this.openWebsite.bind(this));
      icon.addEventListener("click", this.openWebsite.bind(this));

      newRow.appendChild(button);
      newRow.appendChild(icon);

      container.appendChild(newRow);
    }

    this.hideLoader();
    this.feedListWrapper.appendChild(container);

    if (data.length > MAXIMUM_FIT_WITHOUT_SCROLL)
    {
      this.scrollObserver.observe(this.infiniteScrollTrigger);
    }
  }

  openWebsite(e)
  {
    const href = e.target.dateset.href;

    browser.tabs.create({url: href});
  }

  showLoader()
  {
    this.loader = document.createElement("div");
    this.loader.id = "waitting-request";
    this.loader.innerHTML = infiniteScrollLoader();
    this.feedListWrapper.appendChild(this.loader);
  }

  hideLoader()
  {
    this.feedListWrapper.removeChild(this.loader);
  }

  closeSelectOptions()
  {
    this.dropdown.style.display = "none";
  }
}

module.exports = FeedView;
