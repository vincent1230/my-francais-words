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
    url: `https://www.collinsdictionary.com/dictionary/french-english/${encodeURIComponent(
      queryWord.toLowerCase().trim().replaceAll(" ", "-")
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
    console.error(`pron error: [${queryWord}] ${error}`);
  }

  const a = root.getElementsByTagName("a");
  const result = new Array();
  const pos = root.getElementsByTagName("span").filter((span) => {
    return span.classNames.includes("pos");
  });

  const dictlink = root.getElementsByTagName("div").filter((d) => {
    return d.classNames.includes("dictlink");
  });
  const transDiv = dictlink[0].getElementsByTagName("div").filter((d) => {
    return d.classNames.includes("type-translation") && d.classNames.includes("sense");
  });
  const transSpan = dictlink[0].getElementsByTagName("span").filter((d) => {
    return (
      d.classNames.includes("type-translation") &&
      d.parentNode.classNames.includes("sense")
    );
  });
  let transGroup;
  if (transDiv.length == 0) {
    transGroup = transSpan;
  } else {
    transGroup = transDiv.concat(transSpan);
  }
  let translation = new Array();
  const transNode = transGroup.flatMap((e) => {
    return e.childNodes;
  });
  transNode.forEach((e) => {
    if (e instanceof HTMLParser.HTMLElement) {
      const title = e.getAttribute("title");
      if (e.text && title) {
        translation.push(e.text);
      }
    }
  });

  a.forEach((element) => {
    const title = element.getAttribute("title");
    const mp3Url = element.getAttribute("data-src-mp3");
    let quote;
    let extra;
    if (mp3Url && title && !title.includes(" in ")) {
      let word = title.replace("Pronunciation for", "").trim();
      if (word == "") {
        const parent = element?.parentNode?.parentNode?.parentNode?.parentNode;
        if (parent) {
          const orth = parent.getElementsByTagName("span").filter((span) => {
            return span.classNames && span.classNames == "orth";
          });
          const quoteTag = parent.getElementsByTagName("span").filter((span) => {
            return span.classNames && span.classNames == "quote";
          });
          if (orth && orth.length > 0) {
            word = orth[0].text;
          } else {
            word = queryWord;
          }

          if (quoteTag && quoteTag.length > 0) {
            quote = quoteTag[0].text.trim();
          }
        }
      }

      if (mp3Url.includes("fr_exa_")) {
        extra = mp3Url
          .replace("https://www.collinsdictionary.com/sounds/hwd_sounds/", "")
          .replace(".mp3", "")
          .replace("fr_exa_", "")
          .replaceAll("_", " ");
      }

      let rightLength = true;
      if (extra) {
        if (word === extra || !quote) {
          rightLength = word.length <= 18;
        } else {
          rightLength = quote.length <= 18;
        }
      } else {
        rightLength = word.length <= 18;
      }

      const posParent = element.parentNode.parentNode.parentNode.parentNode.parentNode;
      const posMap = posParent
        .getElementsByTagName("span")
        .filter((span) => {
          return span.classNames.includes("pos");
        })
        .map((p) => {
          return p.textContent.replace("[ '", "").replace("' ]", "").toLocaleLowerCase();
        });

      if (result.length < 2 || rightLength) {
        result.push({
          url: mp3Url,
          word,
          quote,
          pos: posMap.length > 0 ? posMap[0] : null,
          extra,
        });
      }
    }
  });
  return { query: queryWord, result, pron, translation };
}

async function conjugationSearch(result) {
  if (result.result == null) {
    return result;
  }
  let containsVerb = false;
  for (let index = 0; index < result.result.length; index++) {
    const element = result.result[index];
    if (
      element.pos &&
      (element.pos == "verb" || element.pos.includes("transitive verb"))
    ) {
      containsVerb = true;
      break;
    }
  }
  if (containsVerb) {
    return require("./fetch_verbs.js")
      .requestConjugationApi(result.query.replaceAll("’", "-"))
      .then((values) => {
        if (values.wordGroup) {
          result.verbGroup = values.wordGroup;
        }
        return result;
      })
      .catch((e) => {
        return result;
      });
  } else {
    return result;
  }
}

async function imageSearch(result, title) {
  let cacheResult;
  try {
    cacheResult = require(`../src/data/${title}.json`);
  } catch (e) {
    // console.log(e);
  }

  if (cacheResult) {
    const filterResult = cacheResult.filter((e) => {
      return e.query == result.query;
    });
    if (filterResult && filterResult.length > 0 && filterResult[0].image_results) {
      result.image_results = filterResult[0].image_results;
      // console.log(`image cache: ${result.query}`);
      return result;
    }
  }

  console.log(`image search: ${result.query}`);
  let queryWord = result.query;

  if (title === "nationalite" && result.result[0].pos.includes("noun")) {
    queryWord = `${result.query} drapeau`;
  }

  let data = JSON.stringify({
    q: queryWord,
    gl: "fr",
    hl: "fr",
    autocorrect: true,
  });

  let config = {
    method: "post",
    url: "https://google.serper.dev/images",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then((response) => {
      result.image_results = response.data.images;
      return result;
    })
    .catch((error) => {
      console.log(error);
      return result;
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
    if (
      filterResult &&
      filterResult.length > 0 &&
      filterResult[0].result &&
      filterResult[0].result.length > 0
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
    // console.log(`Collins oldReuslt: ${queryWord}`);
    return imageSearch(oldResult, title);
  } else {
    return getCloudscraper(queryWord)
      .then((e) => {
        return handleResult(queryWord, e);
      })
      .catch((e) => {
        if (e && !e.toString().includes("403")) {
          console.log(e);
        }

        const root = HTMLParser.parse(e);
        const action = root.getElementsByTagName("form")[0].getAttribute("action");
        const newPath = action.replaceAll('\\"', "").split("?")[0];
        const newUrl = `https://www.collinsdictionary.com${newPath}`;
        if (newPath === "/spellcheck/french-english") {
          return { query: queryWord, result: null };
        }
        return getCloudscraperByUrl(newUrl).then((e) => {
          return handleResult(queryWord, e);
        });
      })
      .then((result) => imageSearch(result, title))
      .then((result) => conjugationSearch(result));
  }
}

const fetchWords = function (word, title, refetch) {
  return Promise.all(word.map((w) => getApi(w, title, refetch)))
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

// fetchWords(require("./wordslist.js").verbs, "verbs", false);
// fetchWords(require("./wordslist.js").nationalite, "nationalite", false);
// fetchWords(require("./wordslist.js").semaine, "semaine", false);
// fetchWords(require("./wordslist.js").professions, "professions", false);
// fetchWords(require("./wordslist.js").tourbillon, "tourbillon", false);
// fetchWords(require("./wordslist.js").couleur, "couleur", false);
// fetchWords(
//   require("./wordslist.js").possessive_adjectives,
//   "possessive_adjectives",
//   false
// );
// fetchWords(require("./wordslist.js").biaodian, "biaodian", false);
// fetchWords(require("./wordslist.js").a1dossier0, "a1dossier0", false);
// fetchWords(require("./wordslist.js").a1dossier1lecon1, "a1dossier1lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier1lecon2, "a1dossier1lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier1lecon3, "a1dossier1lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier2lecon1, "a1dossier2lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier2lecon2, "a1dossier2lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier2lecon3, "a1dossier2lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier3lecon1, "a1dossier3lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier3lecon2, "a1dossier3lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier3lecon3, "a1dossier3lecon3", false);
// fetchWords(require("./wordslist.js").verbs_participe_passe_practice, "verbs_participe_passe_practice", false);
// fetchWords(require("./wordslist.js").corps, "corps", false);
// fetchWords(require("./wordslist.js").a1dossier4lecon1, "a1dossier4lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier4lecon2, "a1dossier4lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier4lecon3, "a1dossier4lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier5lecon1, "a1dossier5lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier5lecon2, "a1dossier5lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier5lecon3, "a1dossier5lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier6lecon1, "a1dossier6lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier6lecon2, "a1dossier6lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier6lecon3, "a1dossier6lecon3", false);
// fetchWords(require("./wordslist.js").vetements, "vetements", false);
// fetchWords(require("./wordslist.js").adj, "adj", false);
// fetchWords(require("./wordslist.js").couleur, "couleur", false);
// fetchWords(require("./wordslist.js").a1dossier7lecon1, "a1dossier7lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier7lecon2, "a1dossier7lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier7lecon3, "a1dossier7lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier8lecon1, "a1dossier8lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier8lecon2, "a1dossier8lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier8lecon3, "a1dossier8lecon3", false);
// fetchWords(require("./wordslist.js").a1dossier9lecon1, "a1dossier9lecon1", false);
// fetchWords(require("./wordslist.js").a1dossier9lecon2, "a1dossier9lecon2", false);
// fetchWords(require("./wordslist.js").a1dossier9lecon3, "a1dossier9lecon3", false);
// fetchWords(require("./wordslist.js").a2dossier1lecon1, "a2dossier1lecon1", false);
// fetchWords(require("./wordslist.js").a2dossier1lecon2, "a2dossier1lecon2", false);
// fetchWords(require("./wordslist.js").a2dossier1lecon3, "a2dossier1lecon3", false);
fetchWords(require("./wordslist.js").buchong, "buchong", false);
