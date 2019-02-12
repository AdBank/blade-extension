"use strict";

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");

const html = `
${menuList("transfers")}
<div class="manual-transfers-view">
  ${headerNavbar("transfers")}
  <div class="content">
    it is transfers
  </div>
</div>
`;

module.exports = html;
