
"use strict";

/* eslint-disable max-len */

function referralsList(friendsList)
{
  return `
  <div class="referrals-list-container">
    <div class="referrals-list">
      <div class="select-container">
        <p>Last <span id="displayed-emails">10</span></p>
        <button class="button" id="open-select-options"></button>
        <div class="options-container" id="choose-option">
          <span data-quantity="5">5</span>
          <span data-quantity="10">10</span>
          <span data-quantity="25">25</span>
        </div>
      </div>
      <div id="referrals-list-content"></div>
    </div>
  </div>
  `;
}

module.exports = referralsList;
