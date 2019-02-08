"use strict";

const BaseClass = require("./baseClass");

class Referrals extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const linkBnt = document.getElementById("go-to-referal-form-send-btn");
    const optionsDropDown = document.getElementById("open-select-options");
    const chooseOption = document.getElementById("choose-option");
    this.emailListTarget = document.getElementById("referrals-list-content");
    this.renderReferralsList(10);

    linkBnt.addEventListener("click", this.handleLinkBnt.bind(this));
    optionsDropDown.addEventListener("click",
      this.handleOpenOptions.bind(this));
    chooseOption.addEventListener("click", this.handleSelectOption.bind(this));
  }

  handleLinkBnt()
  {
    super.handleChangeView("referralsFormView");
  }

  handleOpenPreviousView()
  {
    super.handleChangeView("refferalsMenuView");
  }

  handleOpenOptions()
  {
    const dropdown = document.getElementsByClassName("options-container")[0];
    const style = window.getComputedStyle(dropdown);
    if (style.display === "none")
    {
      dropdown.style.display = "block";
    }
    else
    {
      dropdown.style.display = "none";
    }
  }

  renderReferralsList(quantity)
  {
    // send some api request for list data according quantity
    const responce = [
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
        quantity: "10 ABD"}, {status: "follow",
          email: "kakakakakaka@www.com",
          date: "05-01-19",
          quantity: "10 ABD"}, {status: "follow",
            email: "kakakakakaka@www.com",
            date: "05-01-19",
            quantity: "10 ABD"}, {status: "follow",
              email: "kakakakakaka@www.com",
              date: "05-01-19",
              quantity: "10 ABD"}];
    const wirtualRowContainer = document.createElement("div");
    for (let i = 0; i < responce.length; i += 1)
    {
      const newRow = document.createElement("div");
      newRow.className = "referrals-list-row";
      const rewardInfo = responce[i].quantity.split(" ");
      const classNameUserStatus = responce[i].status === "follow" ?
        "icon-user-follow green" : "icon-user-unfollow red";
      /* eslint-disable max-len */
      newRow.innerHTML = `<i class="${classNameUserStatus}"></i><p class="email">${responce[i].email}</p><p class="date">${responce[i].date}</p><p class="quantity">${rewardInfo[0]}</p><p class="unit">${rewardInfo[1]}</p>`;
      wirtualRowContainer.appendChild(newRow);
    }
    this.emailListTarget.appendChild(wirtualRowContainer);
  }

  handleSelectOption(event)
  {
    const emailQuantity = event.target.dataset.quantity;
    const displayedEmailQuantity = document.getElementById("displayed-emails");
    displayedEmailQuantity.innerText = emailQuantity;
    this.handleOpenOptions();
    while (this.emailListTarget.firstChild)
    {
      this.emailListTarget.removeChild(this.emailListTarget.firstChild);
    }
    this.renderReferralsList(Number(emailQuantity));
  }
}

module.exports = Referrals;
