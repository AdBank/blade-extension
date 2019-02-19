/* eslint-disable max-len */

"use strict";

const input = require("../common/input");

function walletCreationForm(wallet)
{
  return `
    <form class="create-wallet-form">
      ${input({
        label: "Public Wallet Address",
        input: {
          type: "text",
          id: "public-wallet-address",
          iconClass: "icon icon-wallet",
          iconId: "",
          errorId: "public-wallet-error",
          required: true,
          placeholder: "Verify, transfers can’t be undone",
          value: wallet
        }
      })}
      ${input({
        label: "Password",
        wrapperId: "password",
        input: {
          type: "password",
          id: "start-password",
          iconClass: "icon ion-md-eye-off",
          iconId: "password-eye",
          errorId: "password-error",
          required: true,
          placeholder: "Used for verification"
        }
      })}
    </form>
  `;
}

module.exports = walletCreationForm;
