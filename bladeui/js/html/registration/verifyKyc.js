/* eslint-disable max-len */

"use strict";

const header = require("../common/header");

const html = `
<div class="verify-kyc-view flex-column">
  ${header(`Due to legal resrictions, you will
  need to verify your identity before we are able to
  transfer your ADB rewards to your external wallet.
  Please note that you can still earn the ADB rewards
  until the verification is complete.`)}
  <button class="main-action-button verify-kyc-button" id="kyc-button">
    <i class="icon-user-unfollow"></i>
    VERIFY YOUR IDENTIY NOW
  </button>
  <button class="main-action-button" id="action-btn">SKIP</button>
</div>
`
;

module.exports = html;
