"use strict";

function loader(loading)
{
  return loading ?
    "<div class=\"loader\"></div>" : "<div class=\"check\"></div>";
}

module.exports = loader;
