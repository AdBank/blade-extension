"use strict";

function settingsTabGroup(active)
{
  return `
  <div class="settings-tab-group">
    <ul>
      <li class="${active === "profile" && "active"}">PROFILE</li>
      <li class="${active === "transfers" && "active"}">TRANSFERS</li>
      <li class="${active === "info" && "active"}">INFO</li>
    </ul>
  </div>
  `;
}

module.exports = settingsTabGroup;
