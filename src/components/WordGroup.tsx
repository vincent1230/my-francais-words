import { Button, ConfigProvider, Divider, List } from "antd";
import { ReactElement, useState } from "react";
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
                setRandomItem(words[Math.floor(Math.random() * words.length)]);
                setShowAnswer(false);
              }}
            >
              Switch
            </Button>
            <Button
              color="#000"
              style={{ marginLeft: 20, fontWeight: "bold" }}
              onClick={() => {
                setShowAnswer(!showAnswer);
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
