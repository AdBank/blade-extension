/* eslint-disable max-len */

"use strict";

const header = require("../common/header");

const html = `
<div class="recover-phrase-view flex-column">
  ${header("<i class=\"fa fa-long-arrow-left\" id=\"back-button\"></i> Recover a Blade Account.")}
  <p class="underheader">Start by entering your secret phrase.</p>
  <div class="content-wrapper">
    <p class="label">Your Secret Phrase</p>
    <textarea id="phrase-textarea"></textarea>
    <p class="error" id="error"></p>
  </div>
  <button class="main-action-button" id="main-action-button">Continue</button>
</div>
`;

module.exports = html;
