"use strict";

/* eslint-disable max-len */

const checkbox = require("./checkbox");

function menuList(active, withNotification)
{
  return `
  <div class="menu-wrapper hidden" id="menu-wrapper">
    <img class="logo" src="./skin/blade_assets/blade-logo.svg" alt="logo"/>
    <button id="close" class="close"></button>
    <nav class="menu-list" id="menu-list">
      <ul>
        <li data-menu-item="dashboardMenuView" class="${active === "dashboard" && "active"} menu-item"><span>dashboard</span></li>
        <li data-menu-item="transfersListView" class="${active === "transfers" && "active"} menu-item">
          <span>transfers ${withNotification ?
            "<div class=\"notification-icon\"><i class=\"fa fa-exclamation\"></i></div>" :
            ""}</span>
        </li>
        <li data-menu-item="feedMenuView" class="${active === "feed" && "active"} menu-item"><span>feed</span></li>
        <li data-menu-item="referralsMenuView" class="${active === "referrals" && "active"} menu-item" id="refferals-link"><span>refferals</span></li>
        <li data-menu-item="profile" class="${active === "settings" && "active"} menu-item"><span>settings</span></li>
      </ul>
    </nav>
    <div class="toggler">
      <span>Status</span>${checkbox()}
    </div>
  </div>
  `;
}

module.exports = menuList;
