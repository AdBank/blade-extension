"use strict";

const allSelectors = getAllSelectors();

function getAllSelectors()
{
  const allElements = document.querySelectorAll("*");

  for (let i = 0; i < allElements.length; i++)
  {
    const classes = allElements[i].className.toString().split(/\s+/);
    const id = allElements[i].id.toString();
    for (let j = 0; j < classes.length; j++)
    {
      const cls = classes[j];
      if (cls && allSelectors.indexOf(cls) === -1)
        allSelectors.push("." + cls);
    }
    if (id)
      allSelectors.push("#" + id);
  }
}

browser.runtime.sendMessage({
  type: "background.getSelectorsForPage"
},
response =>
{
  findBlockedSelectors(response, allSelectors);
});

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

  // console.log(arrOfAdSelectors);
}
