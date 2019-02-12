"use strict";

/* eslint-disable max-len */

const headerNavbar = require("./common/headerNavbar");
const header = require("./common/header");
const menuList = require("./common/menuList");

const html = `
${menuList("transfers")}
<div class="manual-transfers-view flex-column">
  ${headerNavbar("transfers")}
  <div class="content">
    <p class="manual-transfer-form-description">
      <i class="fa fa-long-arrow-left" id="back-button"></i>
      Make a Manual Transfer
    </p>
  </div>
</div>
`;

module.exports = html;
