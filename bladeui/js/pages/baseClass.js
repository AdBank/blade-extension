"use strict";

/* eslint-disable max-len, no-console */

const {isPageWhitelisted} = require("../popup.utils.js");
const request = require("../utils/request");
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
    browser.storage.local.get(null, (data) =>
    {
      const page = data.bladeCurrentPage;
      if (!PAGES_ALLOWED_FOR_UNREGISTERED.includes(page))
      {
        this._checkUserHasToken();
      }
    });
  }

  _checkUserHasToken()
  {
    browser.storage.sync.get(null, (data) =>
    {
      const token = data && data.bladeUserData ? data.bladeUserData.token : null;
      if (!token)
      {
        this.handleChangeView(FIRST_PAGE);
      }
      else
      {
        this.bearerToken = token;
        request({
          method: "get",
          url: "/jwt/transfer/info",
          headers: {
            Authorization: `Bearer ${data.bladeUserData.token}`
          }
        })
        .then(response =>
        {
          const res = JSON.parse(response.response);
          this.transferPossibilityNotification = res.transfer_possibility === "ALLOWED";
          if (this.transferPossibilityNotification)
          {
            this._renderTransferNotification();
          }
        })
        .catch(err => console.error(err));
      }
    });
  }

  initListeners()
  {
    throw new Error("you mast implement this method");
  }

  _initMenu()
  {
    this.menuWrapper = document.getElementById("menu-wrapper");
    this.burgerButton = document.getElementById("burger-button");
    const closeButton = document.getElementById("close");
    const settingsTabs = document.getElementById("settings-tabs");
    const menuList = document.getElementById("menu-list");

    this.burgerButton && this.burgerButton.addEventListener("click", this._handleClickOnBurger.bind(this));
    closeButton && closeButton.addEventListener("click", this._handleClose.bind(this));
    settingsTabs && settingsTabs.addEventListener("click", this._handleSettingsTabClick.bind(this));
    menuList && menuList.addEventListener("click", this._handleGoToMenuView.bind(this));

    browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
    {
      if (menuList)
      {
        this._initToggleOnOff({id: tabs[0].id, url: tabs[0].url});
      }
    });
  }

  _renderTransferNotification()
  {
    if (this.burgerButton)
    {
      const notification = document.createElement("div");
      notification.className = "notification-icon";
      notification.innerHTML = "<i class=\"fa fa-exclamation\"></i>";
      this.burgerButton.appendChild(notification);
    }
  }

  _initToggleOnOff(tab)
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

  _handleGoToMenuView(e)
  {
    if (!e.target.classList.contains("menu-item") && !e.target.parentNode.classList.contains("menu-item"))
    {
      return;
    }

    const menuItemClicked = e.target.getAttribute("data-menu-item") || e.target.parentNode.getAttribute("data-menu-item");

    this.handleChangeView(menuItemClicked);
  }

  _handleSettingsTabClick(e)
  {
    if (!e.target.classList.contains("tab-item"))
    {
      return;
    }

    const itemClicked = e.target.getAttribute("data-item");

    this.handleChangeView(itemClicked);
  }

  _handleClickOnBurger()
  {
    this.menuWrapper.classList.remove("hidden");
    if (this.transferPossibilityNotification)
    {
      const transferNotificationMark = document.getElementById("transfer-notification");
      transferNotificationMark.classList.remove("hidden");
    }
  }

  _handleClose()
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
    this._initMenu();
  }
}

module.exports = BaseClass;
