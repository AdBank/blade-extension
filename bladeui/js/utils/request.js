"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";

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
        reject({
          status: this.status,
          statusText: xhr.statusText,
          error: JSON.parse(this.response).error
        });
      }
    };
    xhr.onerror = function()
    {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        error: JSON.parse(this.response).error
      });
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
