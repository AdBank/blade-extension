"use strict";

function backButtonWithTitle(title)
{
  return `
    <p class="page-description">
      <i class="fa fa-long-arrow-left" id="back-button"></i>
      ${title}
    </p>
  `;
}

module.exports = backButtonWithTitle;
