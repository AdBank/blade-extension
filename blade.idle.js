"use strict";

/* eslint-disable max-len */
const Fingerprint = require("./fingerprint");

const EXCLUDED_WEBSITES = [
  "https://www.youtube.com",
  "https://www.facebook.com",
  "https://www.twitter.com",
  "https://www.instagram.com",
  "https://www.amazon.com",
  "https://www.pornhub.com", "https://www.xvideos.com", "https://xhamster.com", "https://www.xnxx.com", "https://www.youporn.com", "http://spankbang.com", "http://beeg.com", "https://www.tube8.com", "https://www.vporn.com", "https://www.youjizz.com", "https://www.nuvid.com", "http://www.drtuber.com", "https://www.porn.com", "http://www.pornhd.com", "http://www.spankwire.com", "https://www.porn300.com", "http://www.pornerbros.com", "http://www.sunporno.com", "https://bobs-tube.com", "https://www.sexvid.xxx", "http://www.largeporntube.com", "http://www.proporn.com", "https://zbporn.com", "https://tubsexer.com", "https://www.porndroids.com", "http://xxxbunker.com", "http://xbabe.com", "http://www.slutload.com", "http://www.fux.com", "https://www.pornid.xxx", "http://h2porn.com", "https://www.fakeporn.tv", "http://www.apetube.com", "http://www.mofosex.com", "https://www.tubev.sex", "https://www.pornrox.com", "http://www.pornwatchers.com", "http://www.dansmovies.com", "http://fapdu.com", "http://www.camhub.cc", "https://www.hdpornvideo.xxx", "http://www.metaporn.com", "https://befuck.com", "http://www.pornheed.com", "http://www.madthumbs.com", "https://24porn.com", "http://www.pornhost.com", "http://www.eroxia.com", "https://www.porn7.xxx", "http://xxvids.net", "https://www.hdmovz.com", "http://www.freudbox.com", "https://www.nu-bay.com", "http://topfreepornvideos.com", "http://www.longporn.com", "http://www.myxvids.com"
];

const INCLUDED_WEBSITES = [
  "https://www.google.com",
  "https://bing.com"
];

browser.runtime.sendMessage({
  type: "background.checkWhitelisted"
},
isWhitelisted =>
{
  const url = new URL(window.location.href);

  if (!isWhitelisted && !EXCLUDED_WEBSITES.includes(url.origin))
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
    let node = document.querySelector(selector);
    const url = new URL(window.location.href);

    if (node.getBoundingClientRect().width && !INCLUDED_WEBSITES.includes(url.origin)) {
      return;
    }

    const id = "blade-ext-" + Date.now();

    if (node)
    {
      let nodeWidth = node.clientWidth;
      while (nodeWidth === 0 && node)
      {
        node = node.parentNode;
        nodeWidth = node.clientWidth;
      }

      node.id = id;

      insertAdd(id, nodeWidth, data);
    }
  });
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
