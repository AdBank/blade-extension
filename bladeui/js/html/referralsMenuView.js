"use strict";

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");
const statsRepresentation = require("./common/statsRepresentation");
const referralsList = require("./common/referralsList");
// eslint-disable-next-line max-len
const TOOLTIP_TEXT = "Get rewarded for referrals!<br>Earn reward that equal 5% your friend reward per watched Campaign.";

const html = `
${menuList("referrals")}
<div class="referrals-view flex-column">
  ${headerNavbar("referrals", false, TOOLTIP_TEXT)}
  <div class="content">
    ${statsRepresentation()}
    ${referralsList()}
    </div>
  <button class="main-action-button" id="go-to-referal-form-send-btn">
    SEND A REFERRAL
  </button>
</div>
`;

module.exports = html;
