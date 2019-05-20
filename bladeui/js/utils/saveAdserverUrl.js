"use strict";

const {makeRequest} = require("./request");

function getAdserverUrl()
{
  makeRequest({
    method: "get",
    url: "/api/config/adserver",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) =>
  {
    const adbankUrl = response.data.adserver_url;

    saveAdserverUrl(adbankUrl);
  })
  .catch((err) =>
  {
    console.error(err);
  });
}

function saveAdserverUrl(url)
{
  browser.storage.sync.set({
    bladeAdserverUrl: url
  });
}

module.exports = getAdserverUrl;
