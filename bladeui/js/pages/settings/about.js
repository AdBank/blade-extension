"use strict";

const BaseClass = require("../common/baseClass");

class About extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btnPageChange = document.getElementById("terms-and-conditions");
    const urlLink = document.getElementById("url-link");

    btnPageChange.addEventListener("click", this.changePage.bind(this));
    urlLink.addEventListener("click", this.goToUrl.bind(this));
  }

  goToUrl(e)
  {
    browser.tabs.create({url: e.target.href});
  }

  changePage(e)
  {
    super.handleChangeView("termsAndConditionsText");
  }
}

module.exports = About;
