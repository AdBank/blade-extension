"use strict";

/* eslint-disable max-len */

function generateButtonTemplate(classname, text, iconClassname)
{
  return `<button class="kyc-button ${classname}">
    <i class="${iconClassname}"></i><span>${text}</span>
    </button>`;
}

function generateKycButton(status)
{
  if (status === "VERIFIED")
  {
    return generateButtonTemplate("kyc-accepted", "VERIFIED", "icon-user-follow");
  }
  else if (status === "PENDING")
  {
    return generateButtonTemplate("kyc-pending", "VERIFICATION IN PROGRESS", "icon-clock");
  }
  else if (status === "FAILED")
  {
    return generateButtonTemplate("kyc-failed", "VERIFICATION FAILED", "fa fa-exclamation");
  }

  return generateButtonTemplate("kyc-default", "VERIFY YOUR IDENTIY NOW", "icon-user-unfollow");
}

module.exports = generateKycButton;
