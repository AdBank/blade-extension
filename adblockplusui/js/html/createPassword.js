"use strict";

const header = require("./header");

const html = `
<div class="create-password-view">
  ${header("Create a Blade Account.")}
  <form>
    <div class="form-group">
      <label>Password</label>
      <div class="input">
        <input type="password" id="password" />
        <span id="password-eye">
          <i class="icon ion-md-eye-off"></i>
        </span>
        <p class="error" id="password-error"></p>
      </div>
    </div>
    <div class="form-group">
      <label>Confirm Password</label>
      <div class="input">
        <input type="password" id="confirm-password" />
        <span id="confirm-password-eye">
          <i class="icon ion-md-eye-off"></i>
        </span>
        <p class="error" id="confirm-password-error"></p>
      </div>
    </div>
  </form>
  <button class="main-action-button" id="action-btn">CONTINUE</button>
</div>
`;

module.exports = html;
