/* eslint-disable max-len */

"use strict";

function textarea(props)
{
  return `
  <div class="form-group" id=${props.wrapperId}>
    <label>${props.label}</label>
    <div class="input-wrapper">
      <textarea id=${props.id} maxlength=${props.maxlength}
      placeholder="${props.placeholder || " "}" name=${props.name} rows=${props.rows} required=${props.required}>${props.value || ""}</textarea>
    </div>
  </div>
  `;
}

module.exports = textarea;
