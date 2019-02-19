"use strict";

/* eslint-disable max-len */

const header = require("./common/header");
const input = require("./common/input");

const html = `
<div class="recover-password-view flex-column">
  ${header("Reset a Password.")}
  <p class="underheader">Enter your new password.</p>
  <form>
    ${input({
      label: "Password",
      input: {
        type: "password",
        id: "password",
        iconClass: "icon ion-md-eye-off",
        iconId: "password-eye",
        errorId: "password-error"
      }
    })}
    ${input({
      label: "Confirm Password",
      input: {
        type: "password",
        id: "confirm-password",
        iconClass: "icon ion-md-eye-off",
        iconId: "confirm-password-eye",
        errorId: "confirm-password-error"
      }
    })}
  </form>
  <button class="main-action-button" id="main-action-button">Finish</button>
</div>
`;

module.exports = html;
