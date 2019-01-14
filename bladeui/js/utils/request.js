"use strict";

const URL = "http://ec2-3-81-128-247.compute-1.amazonaws.com:8088";

const request = {
  post: (url, data) => post(data, url),
  get: (url) => get(url)
};

function post(data = {}, url)
{
  return fetch(URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json());
}

function get(url)
{
  return fetch(URL + url).then(response => response.json());
}

module.exports = request;
