/* eslint-disable max-len */

"use strict";

const header = require("./common/header");

const html = `
<div class="confirm-secret-phrase-view flex-column">
  ${header("Verify you’ve recorded your secret phrase by selecting each word in the correct order.")}
  <div class="phrase-wrapper" id="phrase-of-words-wrapper">

  </div>
  <div class="phrase-block" id="phrase-block-input">
    <p class="placeholder" id="phrase-placeholder">
      Select the words from above in the correct order to complete your secret phrase.
    </p>
    <p id="secret-phrase" class="secret-phrase">
    
    </p>
    <div class="footer">
      <p class="error" id="error"></p>
      <p class="view-correct-button hidden" id="view-correct-button">View Correct</p>
    </div>
  </div>
  <button class="main-action-button" id="action-btn">CONTINUE</button>
</div>
`;

module.exports = html;
