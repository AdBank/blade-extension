"use strict";

/* eslint-disable max-len, no-console */

class BaseClass
{
  constructor({onChangeView})
  {
    this.wrapper = document.getElementById("main-app-wrapper");
    this.emitViewChange = onChangeView;
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
    this.menuList = document.getElementById("menu-list");

    burgerButton && burgerButton.addEventListener("click", this.handleClickOnBurger.bind(this));
    closeButton && closeButton.addEventListener("click", this.handleClose.bind(this));
    settingsTabs && settingsTabs.addEventListener("click", this.handleSettingsTabClick.bind(this));
    this.menuList && this.menuList.addEventListener("click", this.handleGoToMenuView.bind(this));
  }

  handleGoToMenuView(e)
  {
    if (!e.target.classList.contains("menu-item"))
    {
      return;
    }

    const menuItemClicked = e.target.getAttribute("data-menu-item");

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
