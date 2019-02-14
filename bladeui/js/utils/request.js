"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";
const {GENERAL_ERROR} = require("./constants");

function makeRequest(opts)
{
  return new Promise(((resolve, reject) =>
  {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, URL + opts.url);
    xhr.onload = function()
    {
      if (this.status >= 200 && this.status < 300)
      {
        resolve(this);
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

module.exports = makeRequest;
