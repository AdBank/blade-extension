"use strict";

/* eslint-disable max-len */

function settingsTabGroup(active)
{
  return `
  <div class="settings-tab-group" id="settings-tabs">
    <ul>
      <li data-item="profile" class="${active === "profile" ? "active menu-item" : "menu-item"}">PROFILE</li>
      <li data-item="transfers" class="${active === "transfers" ? "active menu-item" : "menu-item"}">TRANSFERS</li>
      <li data-item="info" class="${active === "info" ? "active menu-item" : "menu-item"}">INFO</li>
    </ul>
  </div>
  `;
}

module.exports = settingsTabGroup;
