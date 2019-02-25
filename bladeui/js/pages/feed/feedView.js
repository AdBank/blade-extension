"use strict";

/* eslint-disable max-len */

const BaseClass = require("../common/baseClass");
const InfiniteListHelper = require("../common/infiniteListHelper");
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
      responseLeftDataKey: "ad_views_total",
      responseRightDataKey: "ad_views_today"
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
    this.feedListWrapper.appendChild(container);
  }

  openWebsite(e)
  {
    const href = e.target.dateset.href;

    browser.tabs.create({url: href});
  }
}

module.exports = FeedView;
