"use strict";

const headerNavbar = require("./common/headerNavbar");
const settingsTabGroup = require("./common/settingsTabGroup");
const menuList = require("./common/menuList");

const html = `
${menuList("settings")}
<div class="transfers-view">
  ${headerNavbar("transfers")}
  ${settingsTabGroup("transfers")}
  <div class="content">
    it is transfers
  </div>
</div>
`;

module.exports = html;
