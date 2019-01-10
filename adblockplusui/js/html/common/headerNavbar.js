"use strict";

const infoTooltip = require("./informationTooltip");

function headerNavbar(activeMenu, info = "")
{
  return `
  <header class="main-navbar-header">
    <div class="top-section">
      <img src="./skin/blade_assets/blade-logo.svg" />
      <span class="burger-menu">
        <i class="fa fa-navicon"></i>
      </span>
    </div>
    <div class="active-menu">
      <p class="menu-item">${activeMenu}</p>
      ${infoTooltip(info)}
    </div>
  </header>
  `;
}

module.exports = headerNavbar;
