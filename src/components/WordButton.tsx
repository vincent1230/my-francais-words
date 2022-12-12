import { Button } from "antd";
import { ReactElement } from "react";
import { Word } from "../interfaces";

export const WordButton = (props: {
  query: string;
  word: Word;
}): ReactElement => {
  const { query, word } = props;
  const fontWeight = query === word.word ? "bold" : "normal";
  return (
    <div>
      <Button
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 15,
          paddingBottom: 15,
          fontWeight: fontWeight,
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
