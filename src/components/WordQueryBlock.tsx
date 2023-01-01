import { Image, List, Tooltip } from "antd";
import { ReactElement } from "react";
import { ImageResult, Word, WordQuery } from "../interfaces";
import { WordButton } from "./WordButton";

export const WordQueryBlock = (props: { query: WordQuery }): ReactElement => {
  const { query } = props;

  const redirectUrlQuery = encodeURIComponent(query.query)
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
  } else if (info && info.includes("preposition")) {
    wordColor = "#FF6B3B";
  } else if (info && info.includes("verb")) {
    wordColor = "#76523B";
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
        <a
          href={`https://www.collinsdictionary.com/dictionary/french-english/${redirectUrlQuery}`}
          target="_blank"
          style={{
            fontSize: 25,
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
          rel="noreferrer"
        >
          <Tooltip placement="bottomRight" title={info} color={wordColor}>
            <span style={{ textAlign: "right" }}>
              <span style={{ textDecoration: "underline" }}>{query.query}</span>
              {query.pron && (
                <span
                  style={{ fontFamily: "Arial" }}
                >{` [${query.pron}]`}</span>
              )}
            </span>
          </Tooltip>
        </a>

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

        {query.image_results && (
          <List
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
            grid={{
              column: 3,
            }}
            dataSource={query.image_results.slice(0, 3)}
            renderItem={(item: ImageResult) => (
              <List.Item>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(item.link, "_blank");
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.thumbnailUrl}
                    width={100}
                    height={100}
                    preview={{
                      visible: false,
                      mask: (
                        <div
                          style={{
                            width: 100,
                            height: 100,
                          }}
                        />
                      ),
                    }}
                    style={{
                      objectFit: "scale-down",
                      overflow: "hidden",
                    }}
                  />
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};
