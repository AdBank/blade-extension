"use strict";

/* eslint-disable max-len */

function checkbox(checked)
{
  return `
  <label class="toggle-checkbox" for="checkbox">
    <input type="checkbox" id="checkbox" name="checkbox" ${checked ? "checked" : ""}>
    <div class="slide-toggle">
      <i class="checked fa fa-check"></i>
      <i class="unchecked fa fa-close"></i>
    </div>
  </label>
  `;
}

module.exports = checkbox;
