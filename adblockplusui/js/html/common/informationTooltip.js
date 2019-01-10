"use strict";

function information(text)
{
  if (!text)
  {
    return "";
  }
  return `
  <div class="info-tooltip" id="info-tooltip">
    <i class="icon icon-info"></i>
    <div class="text" id="text">
      <p>${text}</p>
    </div>
  </div>
  `;
}

module.exports = information;
