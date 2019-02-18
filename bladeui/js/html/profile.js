"use strict";

/* eslint-disable max-len */

const headerNavbar = require("./common/headerNavbar");
const settingsTabGroup = require("./common/settingsTabGroup");
const menuList = require("./common/menuList");

const html = `
${menuList("settings")}
<div class="profile-view flex-column">
  ${headerNavbar("settings")}
  ${settingsTabGroup("profile")}
  <div class="content">
    <div class="kyc-status" id="kyc-status">

    </div>
    <div class="form-info">
      <div class="group">
        <p class="label">Account Number</p>
        <p class="value" id="user-id"></p>
        <p class="small-under-button" style="display: none">View Global Dash</p>
      </div>
    </div>
  </div>
  <button id="reset-password-button" class="main-action-button">RECOVER PASSWORD</button>
</div>
`;

module.exports = html;
