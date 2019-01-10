/* eslint-disable max-len */

"use strict";

function input({label, wrapperId, input: {type, id, iconClass, iconId, errorId}})
{
  return `
  <div class="form-group" id=${wrapperId}>
    <label>${label}</label>
    <div class="input-wrapper">
      <input class="input-field" type=${type} id=${id} />
      <span id=${iconId}>
        <i class="${iconClass}"></i>
      </span>
      <p class="error" id=${errorId}></p>
    </div>
  </div>
  `;
}

module.exports = input;
