"use strict";

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");
const statsRepresentation = require("./common/statsRepresentation");
const referralsList = require("./common/referralsList");
// eslint-disable-next-line max-len
const tooltipText = "Get rewarded for referrals! Earn 5 ADB for every invited friend that joins blade.";
const leftColumn = {nbr: 1000, txt: "friends refered"};
const rightColumn = {nbr: 100, txt: "rewards earned"};
const friendsList = [{
  icon: "",
  email: "lala@wow.com",
  date: "08-01-10",
  adQuantity: 0,
  units: "ADB"}];

const html = `
${menuList("refferals")}
<div class="referrals-view">
  ${headerNavbar("referrals", false, tooltipText)}
  <div class="content">
    ${statsRepresentation(leftColumn, rightColumn, true, "adb")}
    ${referralsList(friendsList)}
    <button class="main-action-button" id="go-to-referal-form-send-btn">
      SEND A REFERRAL
    </button>
  </div>
</div>
`;

module.exports = html;
