
"use strict";

/* eslint-disable max-len */

function statsRepresentation(leftColumn, rightColumn, isAddSpan, spanText)
{
  return `
  <div class="stats-representation">
      <div class="column">
        <p class="quantity">
          ${leftColumn.nbr}
        </p>
        <p class="description">
          ${leftColumn.txt}
        </p>
      </div>
      <div class="column">
        <p class="quantity">
          ${rightColumn.nbr} ${isAddSpan ? `<span>${spanText}</span>` : null}
        </p>
        <p class="description">
          ${rightColumn.txt}
        </p>
      </div>
    </div>
  `;
}

module.exports = statsRepresentation;
