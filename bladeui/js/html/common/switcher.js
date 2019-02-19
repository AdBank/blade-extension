/* eslint-disable max-len */

"use strict";

function switcher(checked)
{
  return `
  <label class="toggle-checkbox" for="switcher">
    <input type="checkbox" id="switcher" name="checkbox" ${checked || null}>
    <div class="slide-toggle"></div>
  </label>
  `;
}

module.exports = switcher;
