"use strict";

const header = require("./common/header");
const input = require("./common/input");

const html = `
<div class="create-password-view flex-column">
  ${header("Create a Blade Account.")}
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
  <button class="main-action-button" id="action-btn">CONTINUE</button>
</div>
`;

module.exports = html;
