"use strict";

function checkbox(checked)
{
  return `
  <label class="toggle-checkbox" for="checkbox">
    <input type="checkbox" id="checkbox" name="checkbox" ${checked || null}>
    <div class="slide-toggle"></div>
  </label>
  `;
}

module.exports = checkbox;
