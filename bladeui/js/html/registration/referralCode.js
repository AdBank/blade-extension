"use strict";

const header = require("../common/header");
const input = require("../common/input");

const html = `
<div class="insert-referral-code-view flex-column">
  ${header("If you have a referral code, please insert it now.")}
  <form>
    ${input({
      label: "Referral Code",
      input: {
        type: "text",
        id: "referral-code",
        errorId: "referral-code-error"
      }
    })}
  </form>
  <button class="main-action-button" id="action-btn">SKIP</button>
</div>
`;

module.exports = html;
