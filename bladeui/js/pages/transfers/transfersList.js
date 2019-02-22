/* eslint-disable max-len, no-console */

"use strict";

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const formatDate = require("../../utils/formatDate");
const infiniteScrollLoader = require("../../html/common/infiniteScrollLoader");
const tooltip = require("../../html/common/tooltipRedExclamation");
const TRANSFERS_ROW_COUNT = 10;
const MAXIMUM_FIT_WITHOUT_SCROLL = 4;
const THRESHOLD = 1000;

class Transfers extends BaseClass
{
  constructor(props)
  {
    super(props);
    this.skip = 0;
    this.limit = TRANSFERS_ROW_COUNT;
  }

  initListeners()
  {
    this.displayedTransfersQuantity = document.getElementById("dropdown-active");
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.transfersListTarget = document.getElementById("infinite-list-content");
    this.infiniteScrollTrigger = document.getElementById("infinite-scroll-trigger");
    this.transferActionArea = document.getElementById("control-transfer-action-area");

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;
      this.initScrollObserver = this.initScrollObserver.bind(this);
      this.initScrollObserver();
      this.getAccountInfo();
      this.getTransfersInfo(this.skip, this.limit);
    });

    optionsDropDown.addEventListener("click", this.handleOpenOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectOption.bind(this));
    window.addEventListener("click", this.closeSelectOptions.bind(this));
    this.transfersListTarget.addEventListener("click", this.goToUrl.bind(this));
  }

  getAccountInfo()
  {
    request({
      method: "get",
      url: "/jwt/transfer/info",
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then(response =>
    {
      const res = JSON.parse(response.response);
      this.renderAccountStats(Math.round(res.balance), Math.round(res.earned));
      request({
        method: "get",
        url: "/jwt/transfer/threshold",
        headers: {
          Authorization: `Bearer ${this.bearerToken}`
        }
      })
      .then(answer =>
      {
        const result = JSON.parse(answer.response);
        this.renderControlArea(res.transfer_possibility, Math.ceil(result.threshold));
      })
      .catch(() => this.renderControlArea(res.transfer_possibility, THRESHOLD));
    })
    .catch((err) => console.error(err));
  }

  renderControlArea(status, threshold)
  {
    if (status === "ALLOWED")
   {
      this.renderMakeTransferButton(threshold);
    }
    else if (status === "FORBIDDEN_BY_KYC" || status === "FORBIDDEN_BY_BALANCE")
   {
      this.renderWarningMessage(status, threshold);
    }
    else
   {
      this.renderAutoTransfersWarning();
    }
  }

  renderAutoTransfersWarning()
  {
    const notification = document.createElement("p");
    notification.className = "transfers-auto-transfers-warning";
    notification.innerHTML = "Automatic Transfers are Enabled. Visit <button class=\"go-to-settings-btn\" id=\"go-to-settings\">settings</button> if you wish to disable and switch to manual transfers.";
    this.transferActionArea.appendChild(notification);
    const settingsLink = document.getElementById("go-to-settings");
    settingsLink.addEventListener("click",
      this.handleChangeView.bind(this, "transfers"));
  }

  renderWarningMessage(reason, threshold)
  {
    const message = document.createElement("p");
    message.className = "transfers-warning-message";
    message.innerText = reason === "FORBIDDEN_BY_BALANCE" ? `You need to earn ${threshold} ADB to transfer to an external wallet` : "You need to verify your account to withdraw the reward";
    this.transferActionArea.appendChild(message);
  }

  renderMakeTransferButton(threshold)
  {
    const button = document.createElement("button");
    button.className = "main-action-button";
    button.id = "go-to-manual-transfer-btn";
    button.innerHTML = `<span>MAKE A TRANSFER</span>${tooltip(`Congrats! You’ve earned over ${threshold} ADB meaning your account is eligible to make a transfer to an external wallet address of your choosing!`)}`;
    this.transferActionArea.appendChild(button);
    const linkBnt = document.getElementById("go-to-manual-transfer-btn");
    if (linkBnt)
    {
      linkBnt.addEventListener("click", this.handleChangeView.bind(this, "makeManualTransfer"));
    }
  }

  initScrollObserver()
  {
    const options = {
      root: document.getElementById("transfers-list-scroll-container"),
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
        this.getTransfersInfo(this.skip, this.limit);
      }
    });
  }

  getTransfersInfo(skip = 0, limit = TRANSFERS_ROW_COUNT)
  {
    this.showLoader();
    request({
      method: "get",
      url: `/jwt/transfer/list?skip=${skip}&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);
      if (res.length)
      {
        this.renderTransfersList(res);
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

  renderAccountStats(accountBalance, earnedToday)
  {
    const leftQuantity = document.getElementById("left-quantity");
    const rightQuantity = document.getElementById("right-quantity");
    const leftDescription = document.getElementById("left-description");
    const rightDescription = document.getElementById("right-description");

    leftQuantity.innerHTML = `${accountBalance} <span>ADB</span>`;
    rightQuantity.innerHTML = `${earnedToday} <span>ADB</span>`;
    leftDescription.innerHTML = "account balance";
    rightDescription.innerHTML = "earned today";
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

  handleSelectOption(event)
  {
    const transfersQuantity = event.target.dataset.quantity;
    this.displayedTransfersQuantity.innerText = transfersQuantity;

    this.limit = Number(transfersQuantity);
    this.skip = 0;

    this.clearList();
    this.getTransfersInfo(this.skip, this.limit);

    this.closeSelectOptions();
  }

  clearList()
  {
    while (this.transfersListTarget.firstChild)
    {
      this.transfersListTarget.removeChild(this.transfersListTarget.firstChild);
    }
    this.stopScrollObserver();
  }

  renderTransfersList(info)
  {
    const virtualRowContainer = document.createElement("div");
    for (let i = 0; i < info.length; i += 1)
    {
      const newRow = document.createElement("div");
      newRow.className = "infinite-list-row";
      const rewardInfo = info[i].amount;
      const transferStatus = "<i class=\"fa fa-arrow-right red\"></i>";
      const date = formatDate(info[i].date);
      newRow.innerHTML = `${transferStatus}<p class="date">${date}</p><p class="quantity" title="${rewardInfo}">${Math.round(rewardInfo)}</p><p class="unit">ADB</p><p class="txhash"><a href="https://rinkeby.etherscan.io/tx/${info[i].txhash}">${info[i].txhash}.</button></p>`;
      virtualRowContainer.appendChild(newRow);
    }
    this.hideLoader();
    this.transfersListTarget.appendChild(virtualRowContainer);
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
    this.transfersListTarget.appendChild(loader);
  }

  hideLoader()
  {
    const loader = document.getElementById("waitting-request");
    this.transfersListTarget.removeChild(loader);
  }

  goToUrl(e)
  {
    if (e.target.href) browser.tabs.create({url: e.target.href});
  }

  handleChangeView(viewName)
  {
    super.handleChangeView(viewName);
  }
}

module.exports = Transfers;
