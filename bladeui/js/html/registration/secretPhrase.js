"use strict";

const header = require("../common/header");

const html = `
<div class="secret-phrase-view flex-column">
  ${header(`Record your secret phrase.
  Make sure you put it somewhere safe and
  secure, as it is the only back up to
  restore your account if you forget your pin.`)}
  <div class="secret-phrase-container">
    <p class="label">Your Secret Phrase</p>
    <div class="phrase-wrapper">
      <p id="secret-phrase-text">

      </p>
      <p class="tooltip hidden" id="tooltip">Copied!</p>
      <div class="action-phrase-buttons">
        <button class="copy" id="copy-button">
          <i class="fa fa-copy"></i>
        </button>
        <button class="download" id="download-button">
          <i class="fa fa-download"></i>
        </button>
      </div>
    </div>
  </div>
  <button class="main-action-button" id="action-btn">CONTINUE</button>
</div>
`;

module.exports = html;
