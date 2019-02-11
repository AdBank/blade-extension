"use strict";

const headerNavbar = require("./common/headerNavbar");
const header = require("./common/header");
const menuList = require("./common/menuList");
const input = require("./common/input");
const textarea = require("./common/textarea");

const html = `
${menuList("refferalsMenuView")}
<div class="referrals-view">
  ${headerNavbar("referrals")}
  <div class="content">
    <p class="referrals-form-description">
      <i class="fa fa-long-arrow-left" id="back-button"></i>
      Send a Referral
    </p>
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
        placeholder: "Type your message",
        maxlength: 255,
        name: "message",
        rows: 3,
        errorId: "message-error",
        required: true,
        id: "message"
      })}
      <button form="referral-form"
        type="submit" class="main-action-button" id="send-referral-btn">
        SEND
      </button>
    </form>
  </div>
</div>
`;

module.exports = html;
