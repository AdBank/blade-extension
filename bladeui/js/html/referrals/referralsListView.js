/* eslint-disable max-len */

"use strict";

const headerNavbar = require("../common/headerNavbar");
const statsRepresentation = require("../common/statsRepresentation");
const infiniteList = require("../common/infiniteList");
const TOOLTIP_TEXT = "Get rewarded for referrals!<br>Earn 5 ADB for every invited friend that joins blade.";

const html = `
<div class="referrals-view flex-column">
  ${headerNavbar("referrals", false, TOOLTIP_TEXT)}
  <div class="content">
    ${statsRepresentation()}
    ${infiniteList()}
    </div>
  <button class="main-action-button" id="go-to-referal-form-send-btn">
    SEND A REFERRAL
  </button>
</div>
`;

module.exports = html;
