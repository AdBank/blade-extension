/* eslint-disable max-len */

"use strict";

const headerNavbar = require("../common/headerNavbar");
const infiniteList = require("../common/infiniteList");
const infoTooltip = require("../common/informationTooltip");
const {TRANSFERS_OPTIONS, TRANSFERS_OPTIONS_INFO} = require("../../utils/constants");

const html = `
<div class="transfers-view flex-column">
  ${headerNavbar("transfers")}
    <div class="content">
      <div class="stats-representation" id="stats-representation">
        <div class="column">
          <p class="quantity" id="center-quantity">
            ${infoTooltip(`Balance can take from 3-30 days to be updated based on individual adbank campaign timelines.<button class="learn-more">Learn more</button>`)}
          </p>
        </div>
      </div>
      <div class="select-period-container">
        <div class="select-control-period-items" id="open-select-period-options">
          <p class="active-period" id="active-period">${TRANSFERS_OPTIONS_INFO["BALANCE"]}</p>
          <button class="button"></button>
        </div>
        <div class="options-period-container" id="choose-period-option">
          <span data-period="${TRANSFERS_OPTIONS[0]}">${TRANSFERS_OPTIONS_INFO["BALANCE"]}</span>
          <span data-period="${TRANSFERS_OPTIONS[1]}">${TRANSFERS_OPTIONS_INFO["WEEKLY"]}</span>
          <span data-period="${TRANSFERS_OPTIONS[2]}>${TRANSFERS_OPTIONS_INFO["MONTHLY"]}</span>
          <span data-period="${TRANSFERS_OPTIONS[3]}">${TRANSFERS_OPTIONS_INFO["YEARLY"]}</span>
          <span data-period="${TRANSFERS_OPTIONS[4]}>${TRANSFERS_OPTIONS_INFO["TOTAL"]}</span>
        </div>
      </div>
    ${infiniteList()}
  </div>
  <div class="control-transfer-action-area" id="control-transfer-action-area"></div>
</div>
`;

module.exports = html;
