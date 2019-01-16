"use strict";

const header = require("./common/header");

const html = `
<div class="terms-and-conditions flex-column">
  ${header("Terms & Conditions")}
  <div class="text">
    <p>
      1.0 blade terms of use <br /><br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
      pariatur.
    </p>
  </div>
  <button class="main-action-button" id="action-btn">BACK</button>
</div>
`
;

module.exports = html;
