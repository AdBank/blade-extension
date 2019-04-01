"use strict";

const header = require("../common/header");

const html = `
<div class="recover-completed-view">
  ${header(`New password successfully saved,
  you can continue earning ADB tokens as you browse the web!`)}
  <i class="fa fa-check"></i>
  <button class="skip" id="skip-button">Go to Profile</button>
</div>
`;

module.exports = html;
