"use strict";

function header(description)
{
  return `<div class="logo">
    <img src="./skin/blade_assets/blade-logo.svg" alt="logo" />
  </div>
  <p class="underlogo-desc">${description}</p>`;
}

module.exports = header;
