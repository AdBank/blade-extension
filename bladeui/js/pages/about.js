"use strict";

const BaseClass = require("./baseClass");

class About extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btnPageChange = document.getElementById("terms-and-conditions");

    btnPageChange.addEventListener("click", this.changePage.bind(this));
  }

  changePage(e)
  {
    super.handleChangeView("aboutExtension", "termsAndConditionsText");
  }
}

module.exports = About;
