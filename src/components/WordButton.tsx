import { Button } from "antd";
import { ReactElement } from "react";
import { Word } from "../interfaces";

export const WordButton = (props: {
  query: string;
  word: Word;
}): ReactElement => {
  const { query, word } = props;
  const fontWeight =
    query.toLocaleLowerCase() === word.word.toLocaleLowerCase() ||
    `le ${query}` === word.word ||
    `la ${query}` === word.word ||
    `l’${query}` === word.word
      ? "bold"
      : "normal";
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Button
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 15,
          paddingBottom: 15,
          fontWeight: fontWeight,
          letterSpacing: 1,
          fontFamily:
            "Zilla Slab, Serif, sans-serif, Verdana, Arial, Tahoma, Open Sans",
          margin: 10,
        }}
        onClick={() => {
          new Audio(word.url).play();
        }}
      >
        {word.word}
      </Button>
    </div>
  );
};
