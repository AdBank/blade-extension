"use strict";

const BaseClass = require("./baseClass");

class GetStarted extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");
    const mainAppWrapper = document.getElementById("main-app-wrapper");
    mainAppWrapper.classList.add("custom-bg");
    btn.addEventListener("click", () =>
    {
      super.handleChangeView("getStarted", "termsAndConditions");
    });
  }
}

module.exports = GetStarted;
