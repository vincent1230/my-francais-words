import { Button, ConfigProvider } from "antd";
import { ReactElement } from "react";
import { Word } from "../interfaces";

export const WordButton = (props: {
  query: string;
  word: Word;
  wordColor: string;
}): ReactElement => {
  const { query, word, wordColor } = props;
  const extraEqual =
    !word.extra &&
    word.word.toLocaleLowerCase().replaceAll("’", " ") === word.extra;

  const fontWeight =
    extraEqual || query.toLocaleLowerCase() === word.word.toLocaleLowerCase()
      ? // `le ${query}` === word.word ||
        // `la ${query}` === word.word ||
        // `l’${query}` === word.word
        "900"
      : "400";

  const displayedWord =
    word.extra && word.quote && !extraEqual ? word.quote : word.word;

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: wordColor,
          },
        }}
      >
        <Button
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 15,
            paddingBottom: 15,
            fontWeight: fontWeight,
            letterSpacing: 0.1,
            margin: 10,
          }}
          color="#000"
          disabled={!word.url}
          onClick={() => {
            new Audio(word.url).play();
          }}
        >
          {displayedWord}
        </Button>
      </ConfigProvider>
    </div>
  );
};
