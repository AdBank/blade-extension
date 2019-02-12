"use strict";

function formatDate(strToFormat)
{
  const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric"
  };
  const date = new Date(strToFormat).toLocaleDateString("en-GB", options).replace(/\//g, "-");
  return date;
}

module.exports = formatDate;
