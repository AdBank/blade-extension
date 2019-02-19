"use strict";

/* eslint-disable max-len */

const checkbox = require("./common/checkbox");

const html = `
  <div class="menu-wrapper" id="menu-wrapper">
    <img class="logo" src="./skin/blade_assets/blade-logo.svg" alt="logo"/>
    <button id="close" class="close"></button>
    <nav class="menu-list" id="menu-list">
      <ul>
        <li data-menu-item="dashboardMenuView" class="menu-item"><span>dashboard</span></li>
        <li data-menu-item="transfersListView" class="menu-item">
          <span>transfers<div class="hidden notification-icon" id="transfer-notification"><i class="fa fa-exclamation"></i></div></span>
        </li>
        <li data-menu-item="feedMenuView" class="menu-item"><span>feed</span></li>
        <li data-menu-item="referralsMenuView" class="menu-item" id="refferals-link"><span>refferals</span></li>
        <li data-menu-item="profile" class="menu-item"><span>settings</span></li>
      </ul>
    </nav>
    <div class="toggler">
      <span>Status</span>${checkbox()}
    </div>
  </div>
  `;

module.exports = html;
