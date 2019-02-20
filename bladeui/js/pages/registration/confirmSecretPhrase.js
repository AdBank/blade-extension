/* eslint-disable */

"use strict";

const BaseClass = require("../common/baseClass");

class ConfirmSecretPhrase extends BaseClass
{
  constructor(props)
  {
    super(props);

    this.wordsSelected = 0;
  }

  initListeners()
  {
    this.error = document.getElementById("error");
    this.actionButton = document.getElementById("action-btn");
    this.phraseBlockWrapper = document.getElementById("phrase-block-input");
    this.phrasePlaceholder = document.getElementById("phrase-placeholder");
    this.secretPhrase = document.getElementById("secret-phrase");
    this.viewCorrectButton = document.getElementById("view-correct-button");

    this.actionButton.addEventListener("click", this.handleSubmit.bind(this));
    this.viewCorrectButton.addEventListener("click", this.handleViewCorrectClick.bind(this));

    browser.storage.sync.get("bladeUserData", (data) => {
      this.originalSecretPhrase = data.bladeUserData.secretPhrase;
      this.setupPhrase();
    });
  }

  setupPhrase()
  {
    const wrapper = document.getElementById("phrase-of-words-wrapper");
    const arr = this.originalSecretPhrase.split(" ").sort();

    const div = document.createElement("div");
    div.addEventListener("click", this.handlePhraseWrapperClick.bind(this));
    arr.forEach((word) =>
    {
      const p = document.createElement("p");
      p.innerHTML = word;
      p.classList.add("word-block");
      div.append(p);
    });

    wrapper.append(div);
  }

  manageWord(wordBlock)
  {
    if (wordBlock.classList.contains("selected"))
    {
      this.wordsSelected -= 1;
      wordBlock.classList.remove("selected");

      const wordToRemove = wordBlock.innerHTML;
      this.secretPhrase.innerHTML = this.secretPhrase.innerHTML.replace(wordToRemove + " ", "");
    }
    else
    {
      this.wordsSelected += 1;
      wordBlock.classList.add("selected");

      this.secretPhrase.append(wordBlock.innerHTML + " ");
    }
  }

  managePlaceholder()
  {
    if (this.wordsSelected === 0)
    {
      this.phrasePlaceholder.classList.remove("wrapper-hidden");
    }
    else
    {
      this.phrasePlaceholder.classList.add("wrapper-hidden");
    }
  }

  handlePhraseWrapperClick(e)
  {
    if (!e.target.classList.contains("word-block"))
    {
      e.preventDefault();
      return;
    }

    this.manageWord(e.target);
    this.managePlaceholder();
  }

  addErrorOnSubmit(error)
  {
    this.error.innerHTML = error;
    this.phraseBlockWrapper.classList.add("input-invalid");
    this.viewCorrectButton.classList.remove("hidden");
  }

  handleSubmit(e)
  {
    const userInput = this.secretPhrase.innerHTML.trim();
    this.error.innerHTML = "";
    this.phraseBlockWrapper.classList.remove("input-invalid");
    this.viewCorrectButton.classList.add("hidden");

    if (userInput.length !== this.originalSecretPhrase.length)
    {
      this.addErrorOnSubmit("Incomplete Secret Phrase");
      return;
    }
    if (userInput === this.originalSecretPhrase)
    {
      super.handleChangeView("referralCode");
    }
    else
    {
      this.addErrorOnSubmit("Wrong Secret Phrase");
    }
  }

  handleViewCorrectClick()
  {
    super.handleChangeView("secretPhrase");
  }
}

module.exports = ConfirmSecretPhrase;
