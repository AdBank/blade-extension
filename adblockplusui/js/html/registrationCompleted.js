"use strict";

const header = require("./common/header");

const html = `
<div class="registration-completed-view">
  ${header(`You’ve successfully created a 
  blade account, you can begin earning ADB tokens as you browse the web!`)}
  <i class="fa fa-check"></i>
  <button class="skip">Skip</button>
</div>
`;

module.exports = html;
