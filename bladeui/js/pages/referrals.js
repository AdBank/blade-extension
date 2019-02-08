"use strict";

const BaseClass = require("./baseClass");
const REFERRAL_ROW_COUNT = 10;
const RESPONCE = [
  {status: "follow",
    email: "email@www.com",
    date: "08-12-18",
    quantity: "0 ABD"},
  {status: "unfollow",
    email: "lalalalalala@www.com",
    date: "10-12-18",
    quantity: "0 ABD"},
  {status: "follow",
    email: "kakakakakaka@www.com",
    date: "05-01-19",
    quantity: "10 ABD"},
  {status: "follow",
    email: "kakakakakaka@www.com",
    date: "05-01-19",
    quantity: "10 ABD"},
  {status: "follow",
    email: "kakakakakaka@www.com",
    date: "05-01-19",
    quantity: "10 ABD"},
  {status: "follow",
    email: "kakakakakaka@www.com",
    date: "05-01-19",
    quantity: "10 ABD"}];

class Referrals extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const linkBnt = document.getElementById("go-to-referal-form-send-btn");
    this.displayedEmailQuantity = document.getElementById("displayed-emails");
    const optionsDropDown = document.getElementById("open-select-options");
    this.dropdown = document.getElementById("choose-option");
    this.emailListTarget = document.getElementById("referrals-list-content");
    super.renderRewardStats("some-api-address-for-request");
    this.renderReferralsList(REFERRAL_ROW_COUNT);

    linkBnt.addEventListener("click", this.handleLinkBnt.bind(this));
    optionsDropDown.addEventListener("click",
      this.handleOpenOptions.bind(this));
    this.dropdown.addEventListener("click", this.handleSelectOption.bind(this));
  }

  handleLinkBnt()
  {
    super.handleChangeView("referralsFormView");
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("referralsMenuView");
  }

  handleOpenOptions()
  {
    if (this.dropdown.style.display === "none")
    {
      this.dropdown.style.display = "block";
    }
    else
    {
      this.dropdown.style.display = "none";
    }
  }

  renderReferralsList(quantity)
  {
    // send some api request for list data according quantity
    const virtualRowContainer = document.createElement("div");
    for (let i = 0; i < RESPONCE.length; i += 1)
    {
      const newRow = document.createElement("div");
      newRow.className = "referrals-list-row";
      const rewardInfo = RESPONCE[i].quantity.split(" ");
      const classNameUserStatus = RESPONCE[i].status === "follow" ?
        "icon-user-follow green" : "icon-user-unfollow red";
      /* eslint-disable max-len */
      newRow.innerHTML = `<i class="${classNameUserStatus}"></i><p class="email">${RESPONCE[i].email}</p><p class="date">${RESPONCE[i].date}</p><p class="quantity">${rewardInfo[0]}</p><p class="unit">${rewardInfo[1]}</p>`;
      virtualRowContainer.appendChild(newRow);
    }
    this.emailListTarget.appendChild(virtualRowContainer);
  }

  handleSelectOption(event)
  {
    const emailQuantity = event.target.dataset.quantity;
    this.displayedEmailQuantity.innerText = emailQuantity;
    this.handleOpenOptions();
    while (this.emailListTarget.firstChild)
    {
      this.emailListTarget.removeChild(this.emailListTarget.firstChild);
    }
    this.renderReferralsList(Number(emailQuantity));
  }
}

module.exports = Referrals;
