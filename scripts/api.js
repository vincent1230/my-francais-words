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

function getCloudscraper(queryWord) {
  return cloudscraper({
    method: "GET",
    url: `https://www.collinsdictionary.com/dictionary/french-english/${encodeURIComponent(
      queryWord.toLowerCase().trim()
    )}`,
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

  let pron = null;
  try {
    pron = root
      .getElementsByTagName("span")
      .filter((span) => {
        return span.classNames === "pron" && span.childNodes.length >= 2;
      })[0]
      .childNodes.filter((child) => {
        return child.toString().length < 50;
      })
      .join(" ")
      .trim();
  } catch (error) {
    console.error(`pron error: ${error}`);
  }

  const a = root.getElementsByTagName("a");
  const result = new Array();
  a.forEach((element) => {
    const title = element.getAttribute("title");
    const mp3Url = element.getAttribute("data-src-mp3");
    if (mp3Url && title && !title.includes(" in ")) {
      let t = title.replace("Pronunciation for", "").trim();
      if (t == "") {
        const parent = element?.parentNode?.parentNode?.parentNode?.parentNode;
        if (parent) {
          const orth = parent.getElementsByTagName("span").filter((span) => {
            return span.classNames && span.classNames == "orth";
          });
          if (orth && orth.length > 0) {
            t = orth[0].text;
          } else {
            t = queryWord;
          }
        }
      }
      result.push({
        url: mp3Url,
        word: t,
      });
    }
  });
  return { query: queryWord, result, pron };
}

async function getApi(queryWord) {
  return getCloudscraper(queryWord)
    .then((e) => {
      return handleResult(queryWord, e);
    })
    .catch((e) => {
      const root = HTMLParser.parse(e);
      const action = root
        .getElementsByTagName("form")[0]
        .getAttribute("action");
      const newPath = action.replaceAll('\\"', "").split("?")[0];
      const newUrl = `https://www.collinsdictionary.com${newPath}`;
      if (newPath === "/spellcheck/french-english") {
        return { query: queryWord, result: null };
      }
      return getCloudscraperByUrl(newUrl).then((e) => {
        return handleResult(queryWord, e);
      });
    });
}

const fetchWords = function (word, name) {
  Promise.all(word.map((w) => getApi(w)))
    .then((values) => {
      const result = new Array();
      values.forEach((e) => {
        result.push(e);
      });
      return result;
    })
    .then((result) => {
      const json = JSON.stringify(result);
      fs.writeFile(`./src/data/${name}.json`, json);
    })
    .then((e) => {
      console.log("done");
    });
};

fetchWords(require("./wordslist.js").nationalite, "nationalite");
fetchWords(require("./wordslist.js").semaine, "semaine");
fetchWords(require("./wordslist.js").unit1, "unit1");
