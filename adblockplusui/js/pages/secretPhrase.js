"use strict";

/* eslint-disable max-len */

const BaseClass = require("./baseClass");

class SecretPhrase extends BaseClass
{
  constructor(props)
  {
    super(props);
  }

  initListeners()
  {
    const btn = document.getElementById("action-btn");
    const copyButton = document.getElementById("copy-button");
    const downloadButton = document.getElementById("download-button");
    btn.addEventListener("click", this.handleSubmit.bind(this));
    copyButton.addEventListener("click", this.handleCopyButton.bind(this));
    downloadButton.addEventListener("click", this.handleDownloadButton.bind(this));
  }

  handleCopyButton(e)
  {
    // getSecretPhrase
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("hidden");
    tooltip.classList.add("visible");
    setTimeout(() =>
    {
      tooltip.classList.add("hidden");
      tooltip.classList.remove("visible");
    }, 3000);
    this.copyToClipboard(`split camp ethics loop piece auto 
    equal order bargain useless ripple clump`);
  }

  handleDownloadButton(e)
  {
    this.download("secret-phrase.txt", `split camp ethics loop piece auto 
    equal order bargain useless ripple clump`);
  }

  copyToClipboard(str)
  {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) :
        false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected)
    {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  download(filename, text)
  {
    const element = document.createElement("a");
    element.setAttribute(
      "href", "data:text/plain;charset=utf-8," +
      encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  handleSubmit(e)
  {
    super.handleChangeView("secretPhrase", "termsAndConditions");
  }
}

module.exports = SecretPhrase;
