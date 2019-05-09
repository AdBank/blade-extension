"use strict";

/* eslint-disable max-len */

const {makeRequest} = require("../../utils/request");
const PAGES_ALLOWED_FOR_UNREGISTERED = [
  "getStarted",
  "termsAndConditions",
  "createPasswordView",
  "recoverPhrase"
];
const {FIRST_PAGE, FIRST_PAGE_FOR_REGISTERED} = require("../../utils/constants");

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
      else
      {
        this._setNotauthorizedIcon();
      }
    });

    browser.storage.onChanged.addListener(this.listenOnUserDataCleanUp.bind(this));
  }

  listenOnUserDataCleanUp(changes, area)
  {
    if (area === "sync")
    {
      const changedItems = Object.keys(changes);
      for (const item of changedItems)
      {
        if (item === "bladeUserData" && changes[item].newValue === undefined)
        {
          this.handleChangeView(FIRST_PAGE);
        }
      }
    }
  }

  _setNotauthorizedIcon()
  {
    browser.browserAction.setIcon({
      path: "/icons/blade/blade-16-whitelisted.png"
    });
  }

  _setAuthorizedIcon()
  {
    browser.browserAction.setIcon({
      path: "/icons/blade/blade-16.png"
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
        this._setNotauthorizedIcon();
      }
      else
      {
        this._setAuthorizedIcon();
        this.bearerToken = token;
        this._renderTransferNotification();
      }
    });
  }

  initListeners()
  {
    // The error is thrown because this method is required to implement in child classes
    throw new Error("you must implement this method");
  }

  _initMenu()
  {
    this.burgerButton = document.getElementById("burger-button");
    const settingsTabs = document.getElementById("settings-tabs");

    this.burgerButton && this.burgerButton.addEventListener("click", this._handleClickOnBurger.bind(this));
    settingsTabs && settingsTabs.addEventListener("click", this._handleSettingsTabClick.bind(this));
  }

  _renderTransferNotification()
  {
    makeRequest.get("/jwt/transfer/info?type=BALANCE")
    .then(response =>
    {
      const res = JSON.parse(response.response);
      this.transferPossibilityNotification = res.transfer_possibility === "ALLOWED";
      if (this.transferPossibilityNotification && this.burgerButton)
      {
        const notification = document.createElement("div");
        notification.className = "notification-icon";
        notification.innerHTML = "<i class=\"fa fa-exclamation\"></i>";
        this.burgerButton.appendChild(notification);
        browser.storage.sync.set({transferAllowed: true});
      }
      else
      {
        browser.storage.sync.set({transferAllowed: false});
      }
    })
    .catch(err => console.error(err));
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
    this.handleChangeView("menu");
  }

  handleChangeView(next)
  {
    browser.storage.local.get(null, (data) =>
    {
      let prev = FIRST_PAGE_FOR_REGISTERED;
      if (data && data.bladeCurrentPage)
      {
        prev = data.bladeCurrentPage;
      }

      this.emitViewChange(next, prev);
    });
  }

  render(html)
  {
    this.wrapper.insertAdjacentHTML("beforeend", html);
    this.initListeners();
    this._initMenu();
  }
}

module.exports = BaseClass;
