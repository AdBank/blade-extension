"use strict";

/* eslint-disable max-len */

function settingsTabGroup(active)
{
  return `
  <div class="settings-tab-group" id="settings-tabs">
    <ul>
      <li data-item="profile" class="${active === "profile" ? "active tab-item" : "tab-item"}">PROFILE</li>
      <li data-item="transfers" class="${active === "transfers" ? "active tab-item" : "tab-item"}">TRANSFERS</li>
      <li data-item="info" class="${active === "info" ? "active tab-item" : "tab-item"}">INFO</li>
    </ul>
  </div>
  `;
}

module.exports = settingsTabGroup;
