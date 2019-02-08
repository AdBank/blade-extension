
"use strict";

/* eslint-disable max-len */

function referralsList()
{
  return `
  <div class="referrals-list-container">
    <div class="referrals-list">
      <div class="select-container">
        <div class="select-control-items" id="open-select-options">
          <p>Last <span id="displayed-emails">10</span></p>
          <button class="button"></button>
        </div>
        <div class="options-container" id="choose-option">
          <span data-quantity="5">5</span>
          <span data-quantity="10">10</span>
          <span data-quantity="25">25</span>
        </div>
      </div>
      <div class="referrals-list-content" id="referrals-list-content"></div>
    </div>
  </div>
  `;
}

module.exports = referralsList;
