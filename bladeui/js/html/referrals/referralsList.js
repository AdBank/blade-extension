
/* eslint-disable max-len */

"use strict";

function referralsList()
{
  return `
  <div class="referrals-list-container">
    <div class="referrals-list" id="referral-list-scroll-container">
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
      <div class="referrals-list-content" id="referrals-list-content">
      </div>
      <div id="infinite-scroll-trigger"></div>
    </div>
  </div>
  `;
}

module.exports = referralsList;
