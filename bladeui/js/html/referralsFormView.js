/* eslint-disable max-len*/

"use strict";

const headerNavbar = require("./common/headerNavbar");
const backButtonWithTitle = require("./common/backButtonWithTitle");
const input = require("./common/input");
const textarea = require("./common/textarea");

const html = `
<div class="referrals-view flex-column">
  ${headerNavbar("referrals")}
  <div class="content">
    ${backButtonWithTitle("Send a Referral")}
    <form id="referral-form">
      ${input({
        label: "Friends Email Address",
        input: {
          type: "email",
          id: "email",
          iconClass: "icon fa fa-envelope",
          iconId: "fa-envelope",
          errorId: "email-error",
          required: true
        }
      })}
      ${textarea({
        label: "Your Message",
        value: "I’ve been using this chrome extension to earn ADB tokens as I browse the web! Download it and check it out!",
        maxlength: 255,
        name: "message",
        rows: 3,
        errorId: "message-error",
        required: true,
        id: "message"
      })}
    </form>
  </div>
  <button form="referral-form"
    type="submit" class="main-action-button" id="send-referral-btn">
    SEND
  </button>
</div>
`;

module.exports = html;
