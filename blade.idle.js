"use strict";

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
    type: "background.getSelectorsForPage"
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

    getAddForSelector(selector, nodeWidth);
    console.log("node=", node);
    console.log("width=", nodeWidth);
  });
}

function getAddForSelector(selector, selectorWidth)
{

}
