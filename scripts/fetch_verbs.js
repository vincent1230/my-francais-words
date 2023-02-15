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
    url: `https://www.frenchconjugation.com/${encodeURIComponent(
      queryWord.toLowerCase().trim().replaceAll(" ", "-")
    )}.html`,
  });
}

function getCloudscraperByUrl(url) {
  return cloudscraper({
    method: "GET",
    url: url,
  });
}

function handleResult(queryWord, e) {
  const root = HTMLParser.parse(e);

  const presentNodes = root
    .getElementsByTagName("div")
    .filter((d) => {
      return d.classNames.includes("conjugaison");
    })
    .filter((d) => {
      return d.getElementsByTagName("h3")[0].text.trim() == "Present";
    });

  let presentArr = new Array(6);
  let brCount = 0;
  const needAddSpaceFront = ["je", "tu", "il", "nous", "vous", "ils"];
  presentNodes[0].childNodes.forEach((node) => {
    let text = node.text
      .replaceAll("&nbsp;", "")
      .replaceAll("\t", "")
      .replaceAll("\n", "")
      .trim();

    if (node.rawTagName == "br") {
      brCount++;
    } else if (text != undefined && text != "") {
      let t = presentArr[brCount] ? presentArr[brCount] : "";
      if (needAddSpaceFront.includes(text)) {
        presentArr[brCount] = t + text + " ";
      } else {
        presentArr[brCount] = t + text;
      }
      // console.log(text);
    }
  });

  presentArr = presentArr.filter((a) => {
    return a != "Present";
  });

  let front = [];
  let back = [];
  presentArr.forEach((p) => {
    if (p.includes("j'")) {
      front.push("j'");
      back.push(p.replaceAll("j'", ""));
    } else {
      let result = p.split(" ");
      front.push(result[0]);
      back.push(result[1]);
    }
  });
  const present = { front, back };

  // console.log(queryWord);
  // console.log(presentArr);
  // console.log(present);

  let wordNode = root.getElementsByTagName("div").filter((d) => {
    return d.classNames.includes("panel-body") && d.text.includes("belong to");
  });

  let wordExplain = null;
  let wordGroup = null;
  if (wordNode && wordNode.length == 1) {
    wordExplain = wordNode[0].rawText.replaceAll("\t", "").trim();
    if (wordExplain.includes("1st group")) {
      wordGroup = 1;
    } else if (wordExplain.includes("2nd group")) {
      wordGroup = 2;
    } else if (wordExplain.includes("3rd group")) {
      wordGroup = 3;
    }
  }

  return { query: queryWord, present, wordGroup, wordExplain };
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
    if (
      filterResult &&
      filterResult.length > 0 &&
      filterResult[0].present &&
      filterResult[0].present.front &&
      filterResult[0].present.back
    ) {
      return filterResult[0];
    }
  }

  return undefined;
}

async function getApi(queryWord, title, refetch) {
  const oldResult = alreadyExistedResult(queryWord, title);
  // const oldResult = null;
  if (oldResult && !refetch) {
    console.log(`Conjugation oldReuslt: ${queryWord}`);
    return oldResult;
  } else {
    console.log(`fetch conjugation: ${queryWord}`);
    return getCloudscraper(queryWord).then((e) => {
      return handleResult(queryWord, e);
    });
  }
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

fetchWords(require("./wordslist.js").verbs, "verbs_explain", false);
fetchWords(require("./wordslist.js").verbs_practice, "verbs_practice", false);
