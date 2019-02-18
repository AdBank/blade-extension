"use strict";

/* eslint-disable max-len */

function walletInfo(address)
{
  return `
    <div class="wallet-info">
      <p class="wallet-info-title">
        Public Wallet Address
      </p>
      <div class="wallet-info-address-holder">
        <p>
          ${address}
        </p>
        <i class="icon icon-wallet"></i>
      </div>
    </div>
  `;
}

module.exports = walletInfo;
