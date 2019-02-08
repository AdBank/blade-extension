"use strict";

/* eslint-disable max-len */

const infoTooltip = require("./informationTooltip");

function headerNavbar(activeMenu, withNotification = false, info = "")
{
  return `
  <header class="main-navbar-header">
    <div class="top-section">
      <img src="./skin/blade_assets/blade-logo.svg" />
      <button class="burger-menu" id="burger-button">
        <i class="fa fa-navicon"></i>
        ${withNotification ? "<div class=\"notification-icon\"><i class=\"fa fa-exclamation\"></i></div>" : ""}
      </button>
    </div>
    <div class="active-menu">
      <p class="tab-item">${activeMenu}</p>
      ${infoTooltip(info)}
    </div>
  </header>
  `;
}

module.exports = headerNavbar;
