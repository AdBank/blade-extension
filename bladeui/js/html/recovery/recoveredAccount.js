"use strict";

const header = require("../common/header");

const html = `
<div class="recover-completed-view">
  ${header(`You’ve successfully recovered your blade account,
  you can continue earning ADB tokens as you browse the web!`)}
  <i class="fa fa-check"></i>
  <button class="skip" id="skip-button">Skip</button>
</div>
`;

module.exports = html;
