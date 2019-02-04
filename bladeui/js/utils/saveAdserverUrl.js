"use strict";

const request = require("./request");

function getAdserverUrl()
{
  request({
    method: "get",
    url: "/api/config/adserver",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) =>
  {
    const adbankUrl = JSON.parse(response.response).adserver_url;

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
