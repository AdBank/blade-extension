/* eslint-disable */

"use strict";

const BaseClass = require("../common/baseClass");
const request = require("../../utils/request");
const formatDate = require("../../utils/formatDate");
const tooltip = require("../../html/common/tooltipRedExclamation");
const InfiniteListHelper = require("../common/infiniteListHelper");
const THRESHOLD = 1000;

class Transfers extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.transfersListTarget = document.getElementById("infinite-list-content");
    this.transferActionArea = document.getElementById("control-transfer-action-area");

    this.InfiniteListHelper = new InfiniteListHelper({
      urlStaticData: "/jwt/transfer/info",
      urlList: "/jwt/transfer/list",
      listRenderCb: this.renderTransfersList.bind(this),
      leftNumberInfo: {numberText: "ADB", fieldDescription: "account balance"},
      rightNumberInfo: {numberText: "ADB", fieldDescription: "earned today"},
      responseLeftDataKey: "balance",
      responseRightDataKey: "earned",
      afterStaticRenderCb: this.getThreshold.bind(this)
    });

    this.transfersListTarget.addEventListener("click", this.goToUrl.bind(this));
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
