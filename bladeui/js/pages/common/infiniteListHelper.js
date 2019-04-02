/* eslint-disable max-len */

"use strict";

const request = require("../../utils/request");
const infiniteScrollLoader = require("../../html/common/infiniteScrollLoader");
const MAXIMUM_FIT_WITHOUT_SCROLL = 4;
const LIST_DEFAULT_LIMIT = 10;

class InfiniteListHelper
{
  constructor(props)
  {
    this.customStaticData = props.customStaticData;

    this.thumbnailName = props.thumbnailName;
    this.urlStaticData = props.urlStaticData,
    this.urlList = props.urlList;

    this.listRenderCb = props.listRenderCb;
    this.afterStaticRenderCb = props.afterStaticRenderCb;
    
    this.responseLeftDataKey = props.responseLeftDataKey;
    this.responseRightDataKey = props.responseRightDataKey;

    this.leftNumberInfo = props.leftNumberInfo;
    this.rightNumberInfo = props.rightNumberInfo;

    this.leftNumber = 0;
    this.rightNumber = 0;

    this.skip = 0;
    this.limit = LIST_DEFAULT_LIMIT;

    this.initListeners();
  }

  initListeners()
  {
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.activeDropdownItem = document.getElementById("dropdown-active");
    this.infiniteListContent = document.getElementById("infinite-list-content");
    this.infiniteScrollTrigger = document.getElementById("infinite-scroll-trigger");
    this.thumbnailContainer = document.getElementById("thumbnail");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.initScrollObserver = this.initScrollObserver.bind(this);
      this.initScrollObserver();

      if (!this.customStaticData)
      {
        this.getTopStaticData();
      }

      this.getListData();
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

    leftDescription.innerHTML = this.leftNumberInfo.fieldDescription;
    leftQuantity.innerHTML = `${Math.round(Number(this.leftNumber))} <span>${this.leftNumberInfo.numberText ? this.leftNumberInfo.numberText : ""}</span>`;
    rightDescription.innerHTML = this.rightNumberInfo.fieldDescription;
    rightQuantity.innerHTML = `${Math.round(Number(this.rightNumber))} <span>${this.rightNumberInfo.numberText ? this.rightNumberInfo.numberText : ""}</span>`;
  }

  getTopStaticData()
  {
    request({
      method: "get",
      url: this.urlStaticData,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);

      this.leftNumber = res[this.responseLeftDataKey];
      this.rightNumber = res[this.responseRightDataKey];

      this.renderStats();

      if (this.afterStaticRenderCb)  this.afterStaticRenderCb(res.transfer_possibility);
    })
    .catch((err) =>
    {
      console.error(err.error);
    });
  }

  getListData()
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
      const list = JSON.parse(response.response);

      if (list.length)
      {
        this.listRenderCb(list);

        this.hideLoader();
        this.startObserver(list);
        this.skip = this.skip + this.limit;
      }
      else
      {
        this.hideLoader();
        this.stopScrollObserver();
      }

      if(!list.length && !this.skip)
      {
        this.renderEmptyListThumbnail();
      }
    })
    .catch((err) =>
    {
      this.hideLoader();
      this.stopScrollObserver();
    });
  }

  renderEmptyListThumbnail()
  {
    this.thumbnailContainer.style.display = "block";
    const thumbnailImg = this.thumbnailContainer.querySelector("img");
    thumbnailImg.src = `./skin/blade_assets/${this.thumbnailName}.png`;
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

  handleOpenOptions(event)
  {
    event.stopPropagation();
    this.dropdown.style.display = this.dropdown.style.display === "none" ?
      "block" : "none";
  }

  closeSelectOptions()
  {
    this.dropdown.style.display = "none";
  }

  handleSelectOption(event)
  {
    const quantitySelected = event.target.dataset.quantity;
    this.activeDropdownItem.innerText = quantitySelected;

    this.limit = Number(quantitySelected);
    this.skip = 0;

    this.clearList();
    this.getListData();

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

  scrollObserverCallback(entries)
  {
    entries.forEach(entry =>
    {
      if (entry.intersectionRatio === 1)
      {
        this.getListData();
      }
    });
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
