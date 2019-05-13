/* eslint-disable no-console */

"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";
const {GENERAL_ERROR} = require("./constants");
const axios = require("./axios");

function getToken()
{
  return new Promise((resolve) =>
  {
    browser.storage.sync.get(null, (data) =>
    {
      resolve(data && data.bladeUserData ? data.bladeUserData.token : null);
    });
  });
}

const makeRequest = axios.create({baseURL: URL});

let refreshRequest = null;

// If token exists, adds it to each request
makeRequest.interceptors.request.use(async config =>
{
  const token = await getToken();

  if (token == null)
  {
    return config;
  }

  const newConfig = Object.assign({}, config, {headers: {}});

  console.log("REQUEST WITH TOKEN=", token);

  newConfig.headers.Authorization = `Bearer ${token}`;

  return newConfig;
});

// If token is expired, try to refresh it
makeRequest.interceptors.response.use(
value => value,
async error =>
{
  if (error.response.status === 401 && refreshRequest)
  {
    browser.storage.sync.clear();
    throw error;
  }
  if (error.response.status !== 401)
  {
    if (error.response && error.response.data)
    {
      throw error.response.data;
    }
    else
    {
      throw {error: GENERAL_ERROR};
    }
  }

  if (refreshRequest == null)
  {
    refreshRequest = makeRequest.get("/jwt/user/token/refresh");
  }

  const res = await refreshRequest;

  await setNewToken(res.headers.token);

  const newRequest = Object.assign({}, error.config, {retry: true});

  refreshRequest = null;

  return makeRequest(newRequest);
});

function setNewToken(newToken)
{
  return new Promise(resolve =>
  {
    browser.storage.sync.get(null, (data) =>
    {
      const bladeData = data.bladeUserData;
      const newObj = Object.assign({}, bladeData, {token: newToken});
      browser.storage.sync.set({bladeUserData: newObj}, () =>
      {
        console.log("SET BLADE USER DATA WITH NEW TOKEN", newToken);
        resolve("success");
      });
    });
  });
}

module.exports = {URL, makeRequest};
