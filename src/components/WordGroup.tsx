import { Button, ConfigProvider, Divider, List } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WordQuery } from "../interfaces";
import { WordQueryBlock } from "./WordQueryBlock";

export const WordGroup = (props: { words: WordQuery[] }): ReactElement => {
  const { words } = props;
  const location = useLocation();

  const path = location.pathname.replace("/", "");
  const header = path.charAt(0).toUpperCase() + path.slice(1);
  const h = decodeURIComponent(header);

  const [showAnswer, setShowAnswer] = useState(false);
  const [randomItem, setRandomItem] = useState<WordQuery | undefined>(
    undefined
  );

  const switchItem = () => {
    setRandomItem(words[Math.floor(Math.random() * words.length)]);
    setShowAnswer(false);
  };

  const switchAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (showAnswer) {
    new Audio(randomItem?.result[0].url).play();
  }

  const handler = (e: KeyboardEvent) => {
    if (e.code === "ArrowLeft") {
      e.preventDefault();
      switchItem();
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      switchItem();
    } else if (e.code === "Enter") {
      e.preventDefault();
      switchAnswer();
    } else if (e.code === "Space") {
      e.preventDefault();
      switchItem();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handler, false);
    return () => window.removeEventListener("keydown", handler, false);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <h1 style={{ fontSize: 50, textAlign: "center" }}>{h}</h1>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
          },
        }}
      >
        <Divider style={{ marginBottom: 20 }}>Quiz</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: 30,
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
        >
          <div>
            <Button
              color="#000"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                switchItem();
              }}
            >
              Switch
            </Button>
            <Button
              color="#000"
              style={{ marginLeft: 20, fontWeight: "bold" }}
              onClick={() => {
                switchAnswer();
              }}
            >
              Answer
            </Button>
          </div>
          {randomItem && (
            <div
              style={{
                fontSize: 35,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              {randomItem.query}
            </div>
          )}
          {showAnswer && randomItem && (
            <div>{<WordQueryBlock query={randomItem} />}</div>
          )}
        </div>
      </ConfigProvider>

      <Divider style={{ marginTop: 20 }}>Words List</Divider>

      <List
        dataSource={words}
        renderItem={(item: WordQuery) => (
          <List.Item>
            <WordQueryBlock query={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
