"use strict";

/* eslint-disable max-len */

const input = require("./input");

function walletCreationForm()
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
          placeholder: "Verify, transfers can’t be undone"
        }
      })}
      ${input({
        label: "Blade Password",
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
