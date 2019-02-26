"use strict";

const headerNavbar = require("../common/headerNavbar");
const statsRepresentation = require("../common/statsRepresentation");
const infiniteList = require("../common/infiniteList");

const html = `
<div class="feed-view flex-column">
  ${headerNavbar("feed")}
  <div class="content">
    ${statsRepresentation()}
    ${infiniteList()}
    </div>
</div>
`;

module.exports = html;
