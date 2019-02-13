"use strict";

/* eslint-disable max-len, no-console */

const {isPageWhitelisted} = require("../popup.utils.js");
const PAGES_ALLOWED_FOR_UNREGISTERED = [
  "getStarted",
  "termsAndConditions",
  "createPasswordView",
  "recoverPhrase"
];
const FIRST_PAGE = "getStarted";
class BaseClass
{
  constructor({onChangeView})
  {
    this.wrapper = document.getElementById("main-app-wrapper");
    this.emitViewChange = onChangeView;
    // browser.storage.local.get(null, (data) =>
    // {
    //   const page = data.bladeCurrentPage;
    //   if (!PAGES_ALLOWED_FOR_UNREGISTERED.includes(page))
    //   {
    //     this.checkUserHasToken();
    //   }
    // });
  }

  checkUserHasToken()
  {
    browser.storage.sync.get(null, (data) =>
    {
      const token = data && data.bladeUserData ? data.bladeUserData.token : null;
      if (!token)
      {
        this.handleChangeView(FIRST_PAGE);
      }
    });
  }

  initListeners()
  {

  }

  initMenu()
  {
    this.menuWrapper = document.getElementById("menu-wrapper");
    const burgerButton = document.getElementById("burger-button");
    const closeButton = document.getElementById("close");
    const settingsTabs = document.getElementById("settings-tabs");
    const menuList = document.getElementById("menu-list");

    burgerButton && burgerButton.addEventListener("click", this.handleClickOnBurger.bind(this));
    closeButton && closeButton.addEventListener("click", this.handleClose.bind(this));
    settingsTabs && settingsTabs.addEventListener("click", this.handleSettingsTabClick.bind(this));
    menuList && menuList.addEventListener("click", this.handleGoToMenuView.bind(this));

    // browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
    // {
    //   if (menuList)
    //   {
    //     this.initToggleOnOff({id: tabs[0].id, url: tabs[0].url});
    //   }
    // });
  }

  initToggleOnOff(tab)
  {
    this.toggler = document.getElementById("checkbox");

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

  handleGoToMenuView(e)
  {
    if (!e.target.classList.contains("menu-item") && !e.target.parentNode.classList.contains("menu-item"))
    {
      return;
    }

    const menuItemClicked = e.target.getAttribute("data-menu-item") || e.target.parentNode.getAttribute("data-menu-item");

    this.handleChangeView(menuItemClicked);
  }

  handleSettingsTabClick(e)
  {
    if (!e.target.classList.contains("tab-item"))
    {
      return;
    }

    const itemClicked = e.target.getAttribute("data-item");

    this.handleChangeView(itemClicked);
  }

  handleClickOnBurger()
  {
    this.menuWrapper.classList.remove("hidden");
  }

  handleClose()
  {
    this.menuWrapper.classList.add("hidden");
  }

  handleChangeView(current, next)
  {
    this.emitViewChange(current, next);
  }

  render(html)
  {
    this.wrapper.insertAdjacentHTML("beforeend", html);
    this.initListeners();
    this.initMenu();
  }
}

module.exports = BaseClass;
