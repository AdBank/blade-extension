/* eslint-disable max-len */

"use strict";

function textarea({label, wrapperId, placeholder, maxlength, name, rows, errorId, required})
{
  return `
  <div class="form-group" id=${wrapperId}>
    <label>${label}</label>
    <div class="input-wrapper">
      <textarea maxlength=${maxlength} placeholder=${placeholder} name=${name} rows=${rows} required=${!!required}></textarea>
      <p class="error" id=${errorId}></p>
    </div>
  </div>
  `;
}

module.exports = textarea;
