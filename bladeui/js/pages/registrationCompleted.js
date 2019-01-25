"use strict";

const BaseClass = require("./baseClass");

class RegistrationCompleted extends BaseClass
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

module.exports = RegistrationCompleted;
