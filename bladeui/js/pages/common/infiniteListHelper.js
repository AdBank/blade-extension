/* eslint-disable max-len */

"use strict";

const request = require("../../utils/request");
const infiniteScrollLoader = require("../../html/common/infiniteScrollLoader");
const MAXIMUM_FIT_WITHOUT_SCROLL = 4;


class InfiniteListHelper
{
  constructor(props)
  {
    this.urlStaticData = props.urlStaticData,
    this.urlList = props.urlList;
    this.listRenderCb = props.listRenderCb;
    this.responseLeftDataKey = props.responseLeftDataKey;
    this.responseRightDataKey = props.responseRightDataKey;

    this.leftNumberInfo = props.leftNumberInfo;
    this.rightNumberInfo = props.rightNumberInfo;

    this.leftNumber = 0;
    this.rightNumber = 0;
    this.initListeners();
  }

  initListeners()
  {
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.activeDropdownItem = document.getElementById("dropdown-active");
    this.infiniteListContent = document.getElementById("infinite-list-content");
    this.infiniteScrollTrigger = document.getElementById("infinite-scroll-trigger");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.initScrollObserver = this.initScrollObserver.bind(this);
      this.initScrollObserver();
      this.getTopStaticData();
    });

    optionsDropDown.addEventListener("click", this.handleOpenOptions.bind(this));
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

  renderStats()
  {
    const leftQuantity = document.getElementById("left-quantity");
    const rightQuantity = document.getElementById("right-quantity");
    const leftDescription = document.getElementById("left-description");
    const rightDescription = document.getElementById("right-description");

    leftDescription.innerHTML = `${Math.round(Number(this.leftNumberInfo.fieldDescription))} <span>${this.leftNumberInfo.numberText}</span>`;
    leftQuantity.innerHTML = Math.round(Number(this.leftNumberInfo.numberText));
    rightQuantity.innerHTML = `${Math.round(Number(this.rightNumberInfo.fieldDescription))} <span>${this.rightNumberInfo.numberText}</span>`;
    rightDescription.innerHTML = Math.round(Number(this.rightNumberInfo.fieldDescription));
  }

  getTopStaticData()
  {
    request({
      method: "get",
      url: `${this.urlStaticData}?skip=${this.skip}&limit=${this.limit}`,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);

      const leftNumber = res[this.responseLeftDataKey];
      const rightNumber = res[this.responseRightDataKey];

      if (this.leftNumber !== leftNumber || this.rightNumber !== rightNumber)
      {
        this.leftNumber = leftNumber;
        this.rightNumber = rightNumber;
        this.renderStats();
      }
    })
    .catch((err) =>
    {
      console.error(err.error);
    });
  }

  getData()
  {
    this.showLoader();

    request({
      method: "get",
      url: `${this.urlList}?skip=${this.skip}&limit=${this.limit}`,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);

      if (res.referrals.length)
      {
        this.listRenderCb(res.referrals);

        this.hideLoader();
        this.startObserver(res.referrals);

        this.skip = this.skip + this.limit;
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

  showLoader()
  {
    const loader = document.createElement("div");
    loader.id = "waiting-request";
    loader.innerHTML = infiniteScrollLoader();
    this.infiniteListContent.appendChild(loader);
  }

  hideLoader()
  {
    const loader = document.getElementById("waiting-request");
    this.infiniteListContent.removeChild(loader);
  }

  handleSelectOption(event)
  {
    const emailQuantity = event.target.dataset.quantity;
    this.activeDropdownItem.innerText = emailQuantity;

    this.limit = Number(emailQuantity);
    this.skip = 0;

    this.clearList();
    this.getReferralsInfo();

    this.closeSelectOptions();
  }

  clearList()
  {
    while (this.infiniteListContent.firstChild)
    {
      this.infiniteListContent.removeChild(this.infiniteListContent.firstChild);
    }
    this.stopScrollObserver();
  }

  startObserver(info)
  {
    if (info.length > MAXIMUM_FIT_WITHOUT_SCROLL)
    {
      this.scrollObserver.observe(this.infiniteScrollTrigger);
    }
  }
}

module.exports = InfiniteListHelper;
