"use strict";

/* eslint-disable */

const Fingerprint = require("./fingerprint");

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
    type: "background.getAdReplacementInfo"
  },
  response =>
  {
    findBlockedSelectors(response, allSelectors);
  });
}

function findBlockedSelectors(data, allSelectors)
{
  const objWithSelectors = {};

  for (let i = 0; i < allSelectors.length; i++)
  {
    objWithSelectors[allSelectors[i]] = 1;
  }


  for (let j = 0; j < data.selectors.length; j++)
  {
    if (objWithSelectors[data.selectors[j]])
    {
      objWithSelectors[data.selectors[j]] = objWithSelectors[data.selectors[j]] += 1;
    }
  }

  const arrOfAdSelectors = Object.keys(objWithSelectors).filter((item) =>
  {
    return objWithSelectors[item] > 1;
  });

  getSelectorsWidth(arrOfAdSelectors, data);
}

function getSelectorsWidth(selectors, data)
{
  selectors.forEach(selector =>
  {
    let selectorToInsert = data.selector;
    let node = document.querySelector(selector);
    const id = "blade-ext-" + Date.now();
    //node.id = id;
    if (node)
    {
      let nodeWidth = node.clientWidth;
      let isNodeHidden = !isHidden(node);
      if (selectorToInsert)
      while (nodeWidth === 0 && node && !isNodeHidden)
      {
        console.log("node=", node);
        if (isHidden(node))
        {
          node.setAttribute('style', 'display: block !important;');
        }

        node = node.parentNode;
        nodeWidth = node.clientWidth;
      }

      /* eslint-disable */
      console.log(nodeWidth);
      insertAdd(id, nodeWidth, data);
    }
  });
}

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return (style.display === 'none')
}

function insertAdd(selectorId, selectorWidth, data)
{
  const fp = new Fingerprint().get();
  const charset = document.charset ? "charset=" + document.charset : (document.characterSet ? "charset=" + document.characterSet : "");
  const src = `${data.reviveUrl}/www/delivery/blade_controller.php?sel=${selectorId}&blade_id=${data.bladeUserId}&width=${selectorWidth}&finger_print=` + fp + "&loc=" + escape(window.location) + "&" + charset;
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}
