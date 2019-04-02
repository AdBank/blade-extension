"use strict";

function tooltip(text)
{
  return !text ? "" : `
  <div class="info-tooltip-red" id="info-tooltip-red">
    <div class="notification-icon"><i class="fa fa-exclamation"></i></div>
    <div class="text" id="text">
      <p>${text}</p>
    </div>
  </div>
  `;
}

module.exports = tooltip;
