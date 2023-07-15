"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

var cloudscraper = require("cloudscraper");
const fs = require("fs").promises;
var HTMLParser = require("node-html-parser");
const axios = require("axios");
const { resourceLimits } = require("worker_threads");
require("dotenv").config();

function getCloudscraper(queryWord) {
  return cloudscraper({
    method: "GET",
    url: `https://www.lalanguefrancaise.com/conjugaison/${encodeURIComponent(
      queryWord
        .toLowerCase()
        .trim()
        .replaceAll(" ", "-")
        .replaceAll("’", "-")
        .replaceAll("'", "-")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    )}`,
  });
}

function handleResult(queryWord, e) {
  const root = HTMLParser.parse(e);
  const conjugaisonContainer = root.getElementById("conjugaison-container");

  let wordGroup = null;
  const groupParent = root
    .getElementById("main-container")
    .getElementsByTagName("p")
    .filter((e) => {
      return e.text.includes("est un verbe du");
    });
  if (groupParent && groupParent.length > 0) {
    const groupNode = groupParent[0].text;
    if (groupNode.includes("premier groupe")) {
      wordGroup = 1;
    } else if (groupNode.includes("deuxième groupe")) {
      wordGroup = 2;
    } else if (groupNode.includes("troisième groupe")) {
      wordGroup = 3;
    }
  }

  const present = getArray(conjugaisonContainer, "indicatif", "Présent");
  const passeCompose = getArray(conjugaisonContainer, "indicatif", "Passé composé");
  const imparfait = getArray(conjugaisonContainer, "indicatif", "Imparfait");
  const futurSimple = getArray(conjugaisonContainer, "indicatif", "Futur simple");

  return { query: queryWord, present, passeCompose, imparfait, futurSimple, wordGroup };
}

function getArray(container, section, h3) {
  const indicatif = container.getElementById(section);
  const initialArray = indicatif
    .getElementsByTagName("h3")
    .filter((d) => {
      return d.text.trim() == h3;
    })[0]
    .parentNode.childNodes.filter((c) => {
      return c && c.classNames && c.classNames.includes("conjugaison-items-bloc");
    });

  return initialArray[0].childNodes
    .filter((c) => {
      return c && c.text && c.text.trim();
    })
    .map((e) => {
      // style: '<li>je v<em>ois</em></li>',
      // return e.toString().replaceAll("<li>").replaceAll("</li>");
      return e.text;
    });
}

function alreadyExistedResult(queryWord, title) {
  let cacheResult;
  try {
    cacheResult = require(`../src/data/${title}.json`);
  } catch (e) {
    // console.log(e);
  }

  if (cacheResult) {
    const filterResult = cacheResult.filter((e) => {
      return e.query == queryWord;
    });
    if (filterResult && filterResult.length > 0) {
      return filterResult[0];
    }
  }

  return undefined;
}

async function getApi(queryWord, title, refetch) {
  const oldResult = alreadyExistedResult(queryWord, title);
  // const oldResult = null;
  if (oldResult && !refetch) {
    // console.log(`Conjugation oldReuslt: ${queryWord}`);
    return oldResult;
  } else {
    console.log(`fetch conjugation: ${queryWord}`);
    return getCloudscraper(queryWord).then((e) => {
      return handleResult(queryWord, e);
    });
  }
}

async function requestConjugationApi(queryWord) {
  return getCloudscraper(queryWord).then((e) => {
    return handleResult(queryWord, e);
  });
}

const fetchWords = function (word, title, refetch) {
  Promise.all(word.map((w) => getApi(w, title, refetch)))
    .then((values) => {
      const result = new Array();
      values.forEach((e) => {
        result.push(e);
      });
      return result;
    })
    .then((result) => {
      const json = JSON.stringify(result);
      fs.writeFile(`./src/data/${title}.json`, json);
    })
    .then((e) => {
      if (title) {
        console.log(`${title} list done.`);
      }
    });
};

fetchWords(require("./wordslist.js").verbs_practice, "verbs_practice", false);

exports.requestConjugationApi = requestConjugationApi;
