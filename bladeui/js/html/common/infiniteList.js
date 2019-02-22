/* eslint-disable max-len */

"use strict";

function infinitelist()
{
  return `
  <div class="infinite-list-container">
    <div class="infinite-list" id="infinite-list-scroll-container">
      <div class="select-container">
        <div class="select-control-items" id="open-select-options">
          <p>Last <span id="dropdown-active">10</span></p>
          <button class="button"></button>
        </div>
        <div class="options-container" id="choose-option">
          <span data-quantity="5">5</span>
          <span data-quantity="10">10</span>
          <span data-quantity="25">25</span>
        </div>
      </div>
      <div class="infinite-list-content" id="infinite-list-content">
      </div>
      <div id="infinite-scroll-trigger"></div>
    </div>
  </div>
  `;
}

module.exports = infinitelist;
