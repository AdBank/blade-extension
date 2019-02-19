"use strict";

const header = require("../common/header");
const input = require("../common/input");
const informationTooltip = require("../common/informationTooltip");
const checkbox = require("../common/checkbox");

const html = `
<div class="set-external-wallet-view flex-column">
  ${header(`If you know the external wallet
  address that you will want to send your
  earned ADB tokens to, you can enter it now.`)}
  <div class="checkbox-wrapper">
    <p class="label">Enable Automatic Transfers</p>
    ${informationTooltip(`When your ADB reward reaches the transfer
    threshold, 1000 ADB, it will automatically transfer to
    a wallet address of your choosing. If automatic transfers
     are disabled, you will be notified of the threshold and
     asked to make a transfer.`)}
    ${checkbox(true)}
  </div>
  ${input({
    label: "Public Wallet Address",
    wrapperId: "form-group",
    input: {
      type: "text",
      id: "public-wallet-address",
      iconClass: "icon icon-wallet",
      iconId: "test",
      errorId: "error"
    }
  })}
  <button class="main-action-button" id="action-btn">FINISH</button>
</div>
`
;

module.exports = html;
