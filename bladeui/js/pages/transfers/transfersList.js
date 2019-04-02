/* eslint-disable */

"use strict";

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const formatDate = require("../../utils/formatDate");
const tooltip = require("../../html/common/tooltipRedExclamation");
const InfiniteListHelper = require("../common/infiniteListHelper");
const THRESHOLD = 1000;
const {TRANSFERS_OPTIONS, TRANSFERS_OPTIONS_INFO} = require("../../utils/constants");
const infoTooltip = require("../../html/common/informationTooltip");

class Transfers extends BaseClass
{
  constructor(props)
  {
    super(props);

    this.periodParam = TRANSFERS_OPTIONS[0];
  }

  initListeners()
  {
    this.transfersListTarget = document.getElementById("infinite-list-content");
    this.transferActionArea = document.getElementById("control-transfer-action-area");
    const optionsDropDown = document.getElementById("open-select-period-options");
    this.dropdown = document.getElementById("choose-period-option");
    this.activeDropdownItem = document.getElementById("active-period");
    this.centerValueField = document.getElementById("center-quantity");

    this.InfiniteListHelper = new InfiniteListHelper({
      thumbnailName: "transfer-coming-soon",
      customStaticData: true,
      urlList: "/jwt/transfer/list",
      listRenderCb: this.renderTransfersList.bind(this),
    });

    browser.storage.sync.get("bladeUserData", (data) =>
    {
      this.bearerToken = data.bladeUserData.token;

      this.getStaticData();
    });

    this.transfersListTarget.addEventListener("click", this.goToUrl.bind(this));
    optionsDropDown.addEventListener("click", this.handleOpenPeriodOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectPeriodOption.bind(this));
    window.addEventListener("click", this.closeSelectPeriodOptions.bind(this));
  }

  handleOpenPeriodOptions(event)
  {
    event.stopPropagation();
    this.dropdown.style.display = this.dropdown.style.display === "none" ?
      "block" : "none";
  }

  handleOpenLearnMore(e)
  {
    e.preventDefault();
    browser.tabs.create({url: e.target.href});
  }

  closeSelectPeriodOptions()
  {
    this.dropdown.style.display = "none";
  }

  getStaticData()
  {
    request({
      method: "get",
      url: `/jwt/transfer/info?type=${this.periodParam}`,
      headers: {
        Authorization: `Bearer ${this.bearerToken}`
      }
    })
    .then((response) =>
    {
      const res = JSON.parse(response.response);

      const value = res.value;
      const transferPossibility = res.transfer_possibility;

      this.renderValueNumber(value);

      this.getThreshold(transferPossibility);
    })
    .catch((err) =>
    {
      console.error(err.error);
    });
  }

  renderValueNumber(value)
  {
    const tooltip = infoTooltip(`Balance can take from 3-30 days to be updated based on individual adbank campaign timelines.<a href="https://blade.software/faq" class="learn-more" id="learn-more">Learn more</a>`);

    this.centerValueField.innerHTML = Math.round(Number(value)) + " ADB" + tooltip;

    this.learnMoreLink = document.getElementById("learn-more");
    this.learnMoreLink.addEventListener("click", this.handleOpenLearnMore.bind(this));
  }

  handleSelectPeriodOption(event)
  {
    this.periodParam = event.target.dataset.period;
    this.activeDropdownItem.innerText = TRANSFERS_OPTIONS_INFO[this.periodParam];

    this.getStaticData();

    this.closeSelectPeriodOptions();
  }

  getThreshold(transferPossibility)
  {
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
      this.renderControlArea(transferPossibility, Math.ceil(result.threshold));
    })
    .catch(() => this.renderControlArea(transferPossibility, THRESHOLD));
  }

  renderControlArea(status, threshold)
  {
    this.transferActionArea.innerHTML = "";

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
    const caption = document.createElement("span");

    caption.className = "caption-link";
    caption.innerHTML = "Settings";
    caption.addEventListener("click", () => super.handleChangeView("profile"));

    message.className = "transfers-warning-message";
    if (reason === "FORBIDDEN_BY_BALANCE")
    {
      message.innerText = `You need to earn ${threshold} ADB to transfer to an external wallet`;
    }
    else 
    {
      message.innerText = "You need to complete KYC verification to withdraw the rewards";
      message.appendChild(caption);
    }
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

  renderTransfersList(info)
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
      const rewardInfo = info[i].amount;
      const transferStatus = "<i class=\"fa fa-arrow-right red\"></i>";
      const date = formatDate(info[i].date);
      newRow.innerHTML = `${transferStatus}<p class="date">${date}</p><p class="quantity" title="${rewardInfo}">${Math.round(rewardInfo)}</p><p class="unit">ADB</p><p class="txhash"><a href="https://rinkeby.etherscan.io/tx/${info[i].txhash}">${info[i].txhash}.</button></p>`;
      virtualRowContainer.appendChild(newRow);
    }
    this.transfersListTarget.appendChild(virtualRowContainer);
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
