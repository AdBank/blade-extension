/* eslint-disable max-len */

"use strict";

function transfersList()
{
  return `
  <div class="transfers-list-container">
    <div class="transfers-list" id="transfers-list-scroll-container">
      <div class="select-container">
        <div class="select-control-items" id="open-select-options">
          <p>Last <span id="displayed-transfers">10</span></p>
          <button class="button"></button>
        </div>
        <div class="options-container" id="choose-option">
          <span data-quantity="5">5</span>
          <span data-quantity="10">10</span>
          <span data-quantity="25">25</span>
        </div>
      </div>
      <div class="transfers-list-content" id="transfers-list-content">
      </div>
      <div id="infinite-scroll-trigger"></div>
    </div>
  </div>
  `;
}

module.exports = transfersList;
