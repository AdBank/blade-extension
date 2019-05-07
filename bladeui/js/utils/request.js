/* eslint-disable no-console */
/* eslint-disable max-len */

"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";
const {GENERAL_ERROR} = require("./constants");

async function refreshToken()
{
  const token = await new Promise((resolve) =>
  {
    browser.storage.sync.get(null, (data) =>
    {
      resolve(data && data.bladeUserData ? data.bladeUserData.token : null);
    });
  });

  return new Promise((resolve, reject) =>
  {
    const xhr = new XMLHttpRequest();
    xhr.open("get", URL + "/jwt/user/token/refresh");
    xhr.onload = async function()
    {
      if (this.status === 200)
      {
        const newToken = this.getResponseHeader("token");
        browser.storage.sync.get(null, (data) =>
        {
          const bladeData = data.bladeUserData;
          const newObj = Object.assign({}, bladeData, {token: newToken});
          browser.storage.sync.set({bladeUserData: newObj});
        });
        resolve("success");
      }
      else if (this.status === 401)
      {
        // TOKEN CAN NOT BE REFRESHED
        browser.storage.sync.clear();
        resolve("fail");
      }
      else
      {
        resolve("fail");
      }
    };
    xhr.onerror = function()
    {
      console.error("Error while refreshing token");
      resolve("fail");
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.send();
  });
}

async function makeRequest(opts)
{
  return new Promise(((resolve, reject) =>
  {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, URL + opts.url);
    xhr.onload = async function()
    {
      console.log("onload status=", this.status);
      if (this.status >= 200 && this.status < 300)
      {
        resolve(this);
      }
      else if (this.status === 401)
      {
        const refreshStatus = await refreshToken();

        if (refreshStatus === "success")
        {
          makeRequest(opts);
        }
        else
        {
          reject({
            error: GENERAL_ERROR
          });
        }
      }
      else
      {
        try
        {
          const parsedJSON = JSON.parse(this.response);
          reject({
            status: this.status,
            statusText: xhr.statusText,
            error: parsedJSON.error
          });
        }
        catch (error)
        {
          reject({
            error: GENERAL_ERROR
          });
        }
      }
    };
    xhr.onerror = function()
    {
      if (this.response)
      {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          error: JSON.parse(this.response).error
        });
      }
      else
      {
        reject({
          error: GENERAL_ERROR
        });
      }
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    if (opts.headers)
    {
      Object.keys(opts.headers).forEach((key) =>
      {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }

    xhr.send(JSON.stringify(opts.data));
  }));
}

module.exports = {URL, makeRequest};
