import { List } from "antd";
import { ReactElement } from "react";
import { Word, WordQuery } from "../interfaces";
import { WordButton } from "./WordButton";

export const WordQueryBlock = (props: { query: WordQuery }): ReactElement => {
  const { query } = props;

  const redirectUrlQuery = encodeURIComponent(query.query)
    .toString()
    .toLocaleLowerCase();

  let time = 0;
  const list = query.result.filter((word) => {
    if (word.word === query.query) {
      time += 1;
      return time <= 1;
    }
    return true;
  });

  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          paddingLeft: 34,
        }}
      >
        <a
          href={`https://www.collinsdictionary.com/dictionary/french-english/${redirectUrlQuery}`}
          target="_blank"
          style={{
            fontSize: 25,
            fontWeight: "bold",
            fontFamily: "arial",
            marginTop: 2,
            marginBottom: 2,
          }}
          rel="noreferrer"
        >
          {`${query.query} [${query.pron}]`}
        </a>
      </div>

      <List
        style={{
          width: "100vw",
        }}
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 6,
          xxl: 6,
        }}
        dataSource={list}
        renderItem={(item: Word) => (
          <List.Item>
            <WordButton query={query.query} word={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
