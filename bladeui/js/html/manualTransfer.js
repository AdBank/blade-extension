"use strict";

/* eslint-disable max-len */

const headerNavbar = require("./common/headerNavbar");
const menuList = require("./common/menuList");
const backButtonWithTitle = require("./common/backButtonWithTitle");
const input = require("./common/input");

const html = `
${menuList("transfers")}
<div class="manual-transfers-view flex-column">
  ${headerNavbar("transfers")}
  <div class="content">
    ${backButtonWithTitle("Make a Manual Transfer")}
    <form>
      ${input({
        label: "Public Wallet Address",
        input: {
          type: "text",
          id: "wallet-address",
          iconClass: "icon icon-wallet",
          iconId: "",
          errorId: "wallet-error",
          required: true
        }
      })}
      ${input({
        label: "Password",
        input: {
          type: "password",
          id: "password",
          iconClass: "icon ion-md-eye-off",
          iconId: "password-eye",
          errorId: "password-error",
          required: true
        }
      })}
    </form>
  </div>
  <button class="main-action-button" id="send-button">SEND</button>
</div>
`;
// ${input({
//   label: "Confirm Public Wallet Address",
//   input: {
//     type: "text",
//     id: "confirm-wallet-address",
//     iconClass: "icon icon-wallet",
//     iconId: "",
//     errorId: "confirm-wallet-error",
//     required: true
//   }
// })}
module.exports = html;
