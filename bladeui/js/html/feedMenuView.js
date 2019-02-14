"use strict";

const menuList = require("./common/menuList");
const headerNavbar = require("./common/headerNavbar");

const html = `
${menuList("feed")}
<div class="get-started-view flex-column">
  ${headerNavbar("feed")}
  <p class="desciption">
    This is a feed view
  </p>
</div>
`;

module.exports = html;
