"use strict";

const headerNavbar = require("./common/headerNavbar");
const settingsTabGroup = require("./common/settingsTabGroup");
const menuList = require("./common/menuList");

const html = `
${menuList("settings")}
<div class="profile-view">
  ${headerNavbar("profile")}
  ${settingsTabGroup("profile")}
  <div class="content">
    it is profile
  </div>
</div>
`;

module.exports = html;
