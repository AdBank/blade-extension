"use strict";

const BaseClass = require("../common/baseClass");

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
  }

  handleSkipClicked()
  {
    super.handleChangeView("info");
  }
}

module.exports = RecoveredAccount;
