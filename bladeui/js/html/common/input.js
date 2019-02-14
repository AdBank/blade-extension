/* eslint-disable max-len */

"use strict";

const tooltip = require("./informationTooltip");

function input({label, wrapperId, input: {type, id, iconClass, iconId, errorId, required, withTooltip}})
{
  return `
  <div class="form-group" id=${wrapperId}>
    <label>${label} ${tooltip(withTooltip)}</label>
    <div class="input-wrapper">
      <input class="input-field" type=${type} id=${id} required=${required}/>
      <span id=${iconId}>
        <i class="${iconClass}"></i>
      </span>
      <p class="error" id=${errorId}></p>
    </div>
  </div>
  `;
}

module.exports = input;
