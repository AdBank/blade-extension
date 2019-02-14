"use strict";

/* eslint-disable max-len */

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");
const statsRepresentation = require("./common/statsRepresentation");
const transfersList = require("./common/transfersList");

const html = `
${menuList("transfers")}
<div class="transfers-view flex-column">
  ${headerNavbar("transfers")}
  <div class="content">
    ${statsRepresentation()}
    ${transfersList()}
  </div>
  <div class="control-transfer-action-area" id="control-transfer-action-area"></div>
</div>
`;

module.exports = html;
