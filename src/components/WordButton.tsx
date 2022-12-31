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
    extraEqual ||
    query.toLocaleLowerCase() === word.word.toLocaleLowerCase() ||
    `le ${query}` === word.word ||
    `la ${query}` === word.word ||
    `les ${query}` === word.word ||
    `l’${query}` === word.word
      ? "900"
      : "400";

  const displayedWord =
    word.extra && word.quote && !extraEqual ? word.quote : word.word;

  let coloredWord;
  if (displayedWord.startsWith("le ")) {
    coloredWord = (
      <span>
        <span style={{ color: "#1677ff" }}>le </span>
        {displayedWord.replace("le ", "")}
      </span>
    );
  } else if (displayedWord.startsWith("la ")) {
    coloredWord = (
      <span>
        <span style={{ color: "#FF5CA2" }}>la </span>
        {displayedWord.replace("la ", "")}
      </span>
    );
  } else {
    coloredWord = <span>{displayedWord}</span>;
  }

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
            navigator.clipboard.writeText(query);
          }}
        >
          {coloredWord}
        </Button>
      </ConfigProvider>
    </div>
  );
};
