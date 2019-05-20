"use strict";

const headerNavbar = require("../common/headerNavbar");
const settingsTabGroup = require("../common/settingsTabGroup");

const html = `
<div class="about-view">
  ${headerNavbar("settings")}
  ${settingsTabGroup("info")}
  <div class="content">
    <img src="./skin/blade_assets/blade-powered-adbank-logo.svg" class="logo" />
    <p class="title">Version</p>
    <p class="version-number">1.1.1</p>
    <p class="title">Links</p>
    <ul>
      <li class="link-item">
        <a href="http://www.blade.software" id="url-link">www.blade.software</a>
      </li>
      <li class="link-item" id="terms-and-conditions">Terms & Conditions</li>
    </ul>
  </div>
</div>
`;

module.exports = html;
