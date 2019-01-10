"use strict";

function information(text)
{
  return !text ? "" : `
  <div class="info-tooltip" id="info-tooltip">
    <i class="icon icon-info"></i>
    <div class="text" id="text">
      <p>${text}</p>
    </div>
  </div>
  `;
}

module.exports = information;
