"use strict";

function generateKycButton(status)
{
  if (status === "VERIFIED")
  {
    return `<button class="kyc-button kyc-accepted">
    <i class="icon-user-follow"></i><span>VERIFIED</span>
    </button>`;
  }
  else if (status === "PENDING")
  {
    return `<button class="kyc-button kyc-pending">
      <i class="icon-clock"></i><span>VERIFICATION IN PROGRESS</span>
    </button>`;
  }
  else if (status === "FAILED")
  {
    return `<button class="kyc-button kyc-failed">
      <i class="fa fa-exclamation"></i><span>VERIFICATION FAILED</span>
    </button>`;
  }
  return `<button class="kyc-button kyc-default">
    <i class="icon-user-unfollow"></i><span>VERIFY YOUR IDENTIY NOW</span>
  </button>`;
}

module.exports = generateKycButton;
