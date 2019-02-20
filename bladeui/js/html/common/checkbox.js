"use strict";

/* eslint-disable max-len */

function checkbox(checked)
{
  return `
  <label class="toggle-checkbox" for="checkbox">
    <input type="checkbox" id="checkbox" name="checkbox" ${checked ? "checked" : ""}>
    <div class="slide-toggle"></div>
  </label>
  `;
}

module.exports = checkbox;
