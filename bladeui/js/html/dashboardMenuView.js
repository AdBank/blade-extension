"use strict";

const menuList = require("./common/menuList");
const headerNavbar = require("./common/headerNavbar");

const html = `
${menuList("dashboard")}
<div class="get-started-view flex-column">
  ${headerNavbar("dashbord")}
  <p class="desciption">
    This is a dashbord view
  </p>
</div>
`;

module.exports = html;
