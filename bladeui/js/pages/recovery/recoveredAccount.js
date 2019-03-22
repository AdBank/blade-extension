"use strict";

const BaseClass = require("../common/baseClass");
const {TIMEOUT_BEFORE_REDIRECT} = require("../../utils/constants");

class RecoveredAccount extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const skipButton = document.getElementById("skip-button");

    skipButton.addEventListener("click", this.handleSkipClicked.bind(this));
    setTimeout(this.handleSkipClicked.bind(this), TIMEOUT_BEFORE_REDIRECT);
  }

  handleSkipClicked()
  {
    super.handleChangeView("feedMenuView");
  }
}

module.exports = RecoveredAccount;
