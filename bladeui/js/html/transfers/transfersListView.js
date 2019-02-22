/* eslint-disable max-len */

"use strict";

const headerNavbar = require("../common/headerNavbar");
const statsRepresentation = require("../common/statsRepresentation");
const infiniteList = require("../common/infiniteList");

const html = `
<div class="transfers-view flex-column">
  ${headerNavbar("transfers")}
  <div class="content">
    ${statsRepresentation()}
    ${infiniteList()}
  </div>
  <div class="control-transfer-action-area" id="control-transfer-action-area"></div>
</div>
`;

module.exports = html;
