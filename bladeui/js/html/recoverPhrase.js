"use strict";

/* eslint-disable max-len */

const header = require("./common/header");

const html = `
<div class="recover-password-view flex-column">
  ${header("<i class=\"fa fa-long-arrow-left\" id=\"back-button\"></i> Recover a Blade Account.")}
  <p class="underheader">Start by entering your secret phrase.</p>
  <div class="content-wrapper">
    <p class="label">Your Secret Phrase</p>
    <textarea id="phrase-textarea">
    split camp ethics loop piece auto equal order bargain useless ripple clump
    </textarea>
  </div>
  <button class="main-action-button" id="main-action-button">Continue</button>
</div>
`;

module.exports = html;
