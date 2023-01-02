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
    `le ${query.toLocaleLowerCase()}` === word.word ||
    `la ${query.toLocaleLowerCase()}` === word.word ||
    `les ${query.toLocaleLowerCase()}` === word.word ||
    `le/la ${query.toLocaleLowerCase()}` === word.word ||
    `l’${query.toLocaleLowerCase()}` === word.word
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
  } else if (displayedWord.startsWith("l’")) {
    coloredWord = (
      <span>
        <span style={{ color: wordColor }}>l’</span>
        {displayedWord.replace("l’", "")}
      </span>
    );
  } else if (displayedWord.startsWith("le/la")) {
    coloredWord = (
      <span>
        <span style={{ color: "#1677ff" }}>le</span>
        <span>/</span>
        <span style={{ color: "#FF5CA2" }}>la</span>
        {displayedWord.replace("le/la", "")}
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
          tabIndex={-1}
          color="#000"
          disabled={!word.url}
          onClick={() => {
            new Audio(word.url).play();
            navigator.clipboard.writeText(displayedWord);
          }}
        >
          {coloredWord}
        </Button>
      </ConfigProvider>
    </div>
  );
};
