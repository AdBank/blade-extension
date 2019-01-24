"use strict";

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

  handleChangeView(current, next)
  {
    this.emitViewChange(current, next);
  }

  render(html)
  {
    this.wrapper.insertAdjacentHTML("beforeend", html);
    this.initListeners();
  }
}

module.exports = BaseClass;
