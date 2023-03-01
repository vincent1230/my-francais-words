import { List, Tooltip } from "antd";
import { encode } from "js-base64";
import { ReactElement } from "react";
import verbsExplain from "../data/verbs_explain.json";
import headphone from "../img/headphones-solid.svg";
import { Word, WordQuery } from "../interfaces";
import { hex2Filter } from "./Color";
import extraExplain from "./extra_explain.json";
import { ImageList } from "./ImageList";
import { WordButton } from "./WordButton";

export const WordQueryBlock = (props: {
  query: WordQuery;
  hrefPath: string;
}): ReactElement => {
  const { query, hrefPath } = props;

  const redirectUrlQuery = encodeURIComponent(
    query.query.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  )
    .toString()
    .toLocaleLowerCase();

  let info: string | null | undefined = "";
  if (query.result) {
    const infoArr = query.result.filter((w) => {
      const word = w.word.toLocaleLowerCase();
      const q = query.query.toLocaleLowerCase();
      if (
        word === `le ${q}` ||
        word === `la ${q}` ||
        word === `les ${q}` ||
        word === `le/la ${q}` ||
        word === `l’${q}`
      ) {
        return true;
      }
      return false;
    });

    if (infoArr && infoArr.length > 0) {
      info = infoArr[0].pos;
    } else {
      const unique = query.result
        .map((w) => {
          return w.pos;
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      if (unique && unique.length > 0) {
        info = unique[0];
      }
    }
  }

  let time = 0;
  let list = query.result.filter((word) => {
    if (word.word.toLocaleLowerCase() === query.query.toLocaleLowerCase()) {
      time += 1;
      return time <= 1;
    }
    // 暂不扩展词汇
    if (word.extra) {
      return false;
    }
    if (!info?.includes("masculine/feminine")) {
      if (word.word.startsWith("le") && info?.includes("feminine noun")) {
        return false;
      } else if (
        word.word.startsWith("la") &&
        info?.includes("masculine noun")
      ) {
        return false;
      }
    }
    return true;
  });
  if (list.length > 6) {
    list = list.slice(0, 6);
  }

  list = list.filter((word, index) => {
    if (index !== 0 && word.word === list[index - 1].word) {
      return false;
    }
    return true;
  });

  // https://antv.vision/zh/docs/specification/language/palette
  let wordColor = "#000";
  if (info && info.includes("masculine/feminine")) {
    wordColor = "#8D00A1";
  } else if (info && info.includes("masculine")) {
    wordColor = "#1677ff";
  } else if (info && info.includes("feminine")) {
    wordColor = "#FF5CA2";
  } else if (info && info === "preposition") {
    wordColor = "#FF6B3B";
  } else if (info && info === "verb") {
    wordColor = "#000";
  } else if (info && info === "adverb") {
    wordColor = "#B40F0F";
  } else if (info && info === "adjective") {
    wordColor = "#006F45";
  } else {
    wordColor = "#4C6080";
  }

  const extra = extraExplain[query.query as keyof typeof extraExplain];
  const verbExplain = verbsExplain.filter((d) => {
    return d.query === query.query;
  });
  let verbGroup = null;
  if (verbExplain && verbExplain.length === 1) {
    if (verbExplain[0].wordGroup) {
      switch (verbExplain[0].wordGroup) {
        case 1:
          verbGroup = "1st group";
          break;
        case 2:
          verbGroup = "2nd group";
          break;
        case 3:
          verbGroup = "3rd group";
          break;
      }
    }
  }

  return (
    <div style={{ width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginTop: 2,
            marginBottom: 2,
            letterSpacing: 0.1,
            color: wordColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 24,
            width: 300,
          }}
        >
          <Tooltip
            placement="bottom"
            title={
              <>
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  {info}
                </div>
                <div
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >{`( ${query.translation?.join(", ")} )`}</div>
              </>
            }
            color={wordColor}
          >
            <span style={{ textAlign: "right" }}>
              <div>
                <a
                  href={`${hrefPath}${redirectUrlQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    letterSpacing: 0.1,
                    color: wordColor,
                  }}
                >
                  <span style={{ textDecoration: "underline" }}>
                    {query.query}
                  </span>
                  {query.pron && (
                    <span
                      style={{ fontFamily: "Arial", fontSize: 20 }}
                    >{` [${query.pron}]`}</span>
                  )}
                </a>
                <img
                  src={headphone}
                  alt={"headphone"}
                  style={{
                    width: 22,
                    height: 22,
                    padding: 3,
                    cursor: "pointer",
                    marginLeft: 2,
                    marginTop: 6,
                    verticalAlign: "middle",
                    filter: `${hex2Filter(wordColor)}`,
                  }}
                  onClick={() => {
                    const tail = encode(query.query);
                    const baseUrl =
                      "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Bruno22k?inputText=";
                    const audio = new Audio(baseUrl + tail);
                    audio.play();
                  }}
                />
              </div>
              {extra && (
                <div style={{ opacity: 0.7, marginTop: 8, fontSize: 20 }}>
                  ({extra})
                </div>
              )}

              {verbGroup && (
                <div style={{ opacity: 0.7, marginTop: 8, fontSize: 20 }}>
                  ({verbGroup})
                </div>
              )}
            </span>
          </Tooltip>
        </div>

        <List
          style={{
            width: 600,
            height: "fit-content",
          }}
          grid={{
            column: 2,
          }}
          dataSource={list}
          renderItem={(item: Word) => (
            <List.Item>
              <WordButton
                query={query.query}
                word={item}
                wordColor={wordColor}
              />
            </List.Item>
          )}
        />

        {query.image_results && <ImageList query={query} />}
      </div>
    </div>
  );
};
