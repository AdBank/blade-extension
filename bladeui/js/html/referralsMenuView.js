"use strict";

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");
const statsRepresentation = require("./common/statsRepresentation");
const referralsList = require("./common/referralsList");
// eslint-disable-next-line max-len
const TOOLTIP_TEXT = require("../constants/referralTooltip");

const html = `
${menuList("referrals")}
<div class="referrals-view">
  ${headerNavbar("referrals", false, TOOLTIP_TEXT)}
  <div class="content">
    ${statsRepresentation()}
    ${referralsList()}
    <button class="main-action-button" id="go-to-referal-form-send-btn">
      SEND A REFERRAL
    </button>
  </div>
</div>
`;

module.exports = html;
