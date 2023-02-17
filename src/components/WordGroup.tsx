import { Button, ConfigProvider, Divider, List } from "antd";
import {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { WordQuery } from "../interfaces";
import { ImageList } from "./ImageList";
import { getRandomInt } from "./utils";
import { WordQueryBlock } from "./WordQueryBlock";

function playWord(item: WordQuery | undefined | null) {
  if (item?.result && item?.result.length > 0 && item?.result[0].url) {
    new Audio(item?.result[0].url).play();
  }
}

export const WordGroup = (props: { words: WordQuery[] }): ReactElement => {
  const { words } = props;
  const location = useLocation();

  const path = location.pathname.replace("/", "");
  const header = path.charAt(0).toUpperCase() + path.slice(1);
  const h = decodeURIComponent(header);

  const [pressingKey, setPressingKey] = useState<string | undefined>(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [randomItem, setRandomItem] = useState<WordQuery | undefined>(
    undefined
  );
  const [count, updateCount] = useReducer((x) => x + 1, 0);

  const switchItem = useCallback(() => {
    setRandomItem(words[getRandomInt(0, words.length - 1)]);
    setShowAnswer(false);
  }, [words]);

  const switchAnswer = useCallback(() => {
    if (!showAnswer) {
      playWord(randomItem);
    }
    setShowAnswer(!showAnswer);
  }, [showAnswer, randomItem]);

  const autoSwitch = useCallback(() => {
    if (count % 2 === 0) {
      switchItem();
    } else {
      switchAnswer();
    }
    updateCount();
  }, [count, switchItem, switchAnswer]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        switchAnswer();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        autoSwitch();
      } else if (e.code === "Enter") {
        e.preventDefault();
        switchAnswer();
      } else if (e.code === "Space") {
        e.preventDefault();
        playWord(randomItem);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showAnswer, randomItem, words, switchItem, switchAnswer, autoSwitch]);

  useEffect(() => {
    // const handlerUp = (e: KeyboardEvent) => {
    //   console.log("handlerUp");
    //   setPressingKey(undefined);
    // };

    const handlerDown = (e: KeyboardEvent) => {
      console.log(e);
      setPressingKey(e.key);
    };

    window.addEventListener("keydown", handlerDown);
    // window.addEventListener("keyup", handlerUp);
    return () => {
      window.removeEventListener("keydown", handlerDown);
      // window.removeEventListener("keyup", handlerUp);
    };
  }, [pressingKey]);

  const [hrefPath, setHrefPath] = useState(
    `https://www.collinsdictionary.com/dictionary/french-english/`
  );

  useEffect(() => {
    if (pressingKey === "z") {
      setHrefPath(`https://www.frdic.com/dicts/fr/`);
    } else if (pressingKey === "x") {
      setHrefPath(
        `https://www.collinsdictionary.com/dictionary/french-english/`
      );
    } else if (pressingKey === "c") {
      setHrefPath(`https://www.collinsdictionary.com/conjugation/french/`);
      // setHrefPath(`https://www.larousse.fr/dictionnaires/francais-chinois/`);
    } else {
      setHrefPath(
        `https://www.collinsdictionary.com/dictionary/french-english/`
      );
    }
  }, [pressingKey]);

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
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          }}
        >
          <div>
            <Button
              tabIndex={-1}
              color="#000"
              style={{ fontWeight: "bold" }}
              onClick={() => {
                switchItem();
              }}
            >
              Switch
            </Button>
            <Button
              tabIndex={-1}
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
              <ImageList query={randomItem} />
            </div>
          )}
          {showAnswer && randomItem && (
            <div style={{ marginTop: 30 }}>
              {<WordQueryBlock query={randomItem} hrefPath={hrefPath} />}
            </div>
          )}
        </div>
      </ConfigProvider>

      <Divider style={{ marginTop: 20 }}>Words List</Divider>

      <List
        dataSource={words}
        renderItem={(item: WordQuery) => (
          <List.Item>
            <WordQueryBlock query={item} hrefPath={hrefPath} />
          </List.Item>
        )}
      />
    </div>
  );
};
