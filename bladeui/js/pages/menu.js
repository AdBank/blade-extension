"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");
const {isPageWhitelisted} = require("../popup.utils.js");
const {FIRST_PAGE_FOR_REGISTERED} = require("../utils/constants");

class Menu extends BaseClass
{
  constructor(props)
  {
    super(props);

    this.previousPage = props.previousPage || FIRST_PAGE_FOR_REGISTERED;
  }

  initListeners()
  {
    const closeButton = document.getElementById("close");
    const menuList = document.getElementById("menu-list");
    this.toggler = document.getElementById("checkbox");

    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
    {
      if (menuList)
      {
        this.initToggleOnOff({id: tabs[0].id, url: tabs[0].url});
      }
    });

    closeButton.addEventListener("click", this.handleClose.bind(this));
    menuList.addEventListener("click", this.handleGoToMenuView.bind(this));
    this.highlightActivePage();
    this.getTransferPossibility();
  }

  getTransferPossibility()
  {
    browser.storage.sync.get(null, data =>
    {
      if (data.transferAllowed)
      {
        const transferNotificationMark = document.getElementById("transfer-notification");
        transferNotificationMark.classList.remove("hidden");
      }
    });
  }

  handleClose()
  {
    super.handleChangeView(this.previousPage);
  }

  highlightActivePage()
  {
    const item = document.querySelector(`[data-menu-item="${this.previousPage}"]`);
    if (item)
    {
      item.classList.add("active");
    }
    else
    {
      document.querySelector(`[data-menu-item="${FIRST_PAGE_FOR_REGISTERED}"]`).classList.add("active");
    }
  }

  handleGoToMenuView(e)
  {
    if (!e.target.classList.contains("menu-item") && !e.target.parentNode.classList.contains("menu-item"))
    {
      return;
    }

    const menuItemClicked = e.target.getAttribute("data-menu-item") || e.target.parentNode.getAttribute("data-menu-item");

    super.handleChangeView(menuItemClicked);
  }

  initToggleOnOff(tab)
  {
    isPageWhitelisted(tab, whitelisted =>
    {
      if (whitelisted)
      {
        this.toggler.checked = false;
      }
    });

    this.toggler.addEventListener("change", () =>
    {
      if (this.toggler.checked)
      {
        browser.runtime.sendMessage({
          type: "filters.unwhitelist",
          tab
        });
      }
      else
      {
        browser.runtime.sendMessage({
          type: "filters.whitelist",
          tab
        });
      }
    });
  }
}

module.exports = Menu;
