"use strict";

/* eslint-disable max-len */

const BaseClass = require("../common/baseClass");
const InfiniteListHelper = require("../common/infiniteListHelper");

const WEBSITE_VISIBLE_LENGTH = 20;
class FeedView extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    this.feedListWrapper = document.getElementById("infinite-list-content");

    this.InfiniteListHelper = new InfiniteListHelper({
      urlStaticData: "/jwt/feed/info",
      urlList: "/jwt/feed/list",
      listRenderCb: this.renderFeedsList.bind(this),
      leftNumberInfo: {numberText: null, fieldDescription: "ad views total"},
      rightNumberInfo: {numberText: null, fieldDescription: "ad views today"},
      responseLeftDataKey: "total_views",
      responseRightDataKey: "today_views"
    });
  }


  renderFeedsList(data)
  {
    this.generateHtml(data);
  }

  generateHtml(data)
  {
    const container = document.createElement("div");
    for (let i = 0; i < data.length; i += 1)
    {
      const newRow = document.createElement("div");
      const button = document.createElement("button");
      const amountField = document.createElement("p");
      const icon = document.createElement("i");

      newRow.className = "infinite-list-row";
      icon.className = "fa fa-sign-out";
      amountField.className = "amount";

      button.innerHTML = data[i].website_url.length > WEBSITE_VISIBLE_LENGTH ? data[i].website_url.slice(0, WEBSITE_VISIBLE_LENGTH) + "..." : data[i].website_url;
      button.title = data[i].website_url;
      button.dataset.href = data[i].website_url;

      amountField.innerHTML = Math.ceil(Number(data[i].amount)) + " ADB";

      icon.dataset.href = data[i].website_url;

      button.addEventListener("click", this.openWebsite.bind(this));
      icon.addEventListener("click", this.openWebsite.bind(this));

      newRow.appendChild(button);
      newRow.appendChild(amountField);
      newRow.appendChild(icon);

      container.appendChild(newRow);
    }
    this.feedListWrapper.appendChild(container);
  }

  openWebsite(e)
  {
    const href = e.target.dateset.href;

    browser.tabs.create({url: href});
  }
}

module.exports = FeedView;
