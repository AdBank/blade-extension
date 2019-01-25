"use strict";

/* eslint-disable max-len */

const checkbox = require("./checkbox");

function menuList(active, withNotification)
{
  return `
  <div class="menu-wrapper hidden" id="menu-wrapper">
    <img class="logo" src="./skin/blade_assets/blade-logo.svg" alt="logo"/>
    <button id="close" class="close"></button>
    <nav class="menu-list">
      <ul>
        <li class="${active === "dashboard" && "active"}"><span>dashboard</span></li>
        <li class="${active === "transfers" && "active"}">
          <span>transfers ${withNotification ?
            "<div class=\"notification-icon\"><i class=\"fa fa-exclamation\"></i></div>" :
            ""}</span>
        </li>
        <li class="${active === "feed" && "active"}"><span>feed</span></li>
        <li class="${active === "refferals" && "active"}"><span>refferals</span></li>
        <li class="${active === "settings" && "active"}"><span>settings</span></li>
      </ul>
    </nav>
    <div class="toggler">
      <span>Status</span>${checkbox()}
    </div>
  </div>
  `;
}

module.exports = menuList;
