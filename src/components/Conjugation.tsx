import { Button, ConfigProvider } from "antd";
import { encode } from "js-base64";
import { ReactElement, useEffect, useState } from "react";
import verbs from "../data/verbs_practice.json";
import { getRandomInt } from "./utils";

type Present = {
  back: string[];
  front: string[];
};

type Verb = {
  present: Present;
  query: string;
};

const frontArr = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"];

export const Conjugation = (): ReactElement => {
  return (
    <div>
      <h1
        style={{
          fontSize: 35,
          textAlign: "center",
          color: "#303030",
        }}
      >
        Conjugation
      </h1>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#65789B",
            boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)",
          },
        }}
      >
        <RandomVerb />
      </ConfigProvider>
    </div>
  );
};

export const RandomVerb = (): ReactElement => {
  const [verb, setVerb] = useState<Verb>();
  const [front, setFront] = useState<string>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState<string>();

  const updateVerb = () => {
    let verb = verbs[getRandomInt(0, verbs.length - 1)];
    let front = frontArr[getRandomInt(0, frontArr.length - 1)];
    setShowAnswer(false);
    setVerb(verb);
    setFront(front);
    let index = verb.present.front.indexOf(front);
    if (index === -1 && front === "je") {
      index = verb.present.front.indexOf("j'");
    } else if (index === -1 && front === "elle") {
      index = verb.present.front.indexOf("il");
    } else if (index === -1 && front === "elles") {
      index = verb.present.front.indexOf("ils");
    }

    if (index === -1) {
      setAnswer("error!");
    } else {
      if (verb.present.front[index] === "j'") {
        setAnswer("j'" + verb.present.back[index]);
      } else {
        setAnswer(front + " " + verb.present.back[index]);
      }
    }
  };

  useEffect(() => {
    updateVerb();
  }, []);

  useEffect(() => {
    playAnswer(answer, true);
  }, [answer]);

  const playAnswer = (answer: string | undefined, mute = false) => {
    if (answer) {
      const tail = encode(answer);
      const baseUrl =
        "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Bruno22k?inputText=";
      const audio = new Audio(baseUrl + tail);
      if (mute) {
        audio.volume = 0;
        audio.muted = true;
      }
      audio.play();
    }
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        fontFamily: "PingFang SC",
        fontWeight: "bold",
        letterSpacing: 0.1,
      }}
    >
      <div
        style={{
          marginTop: 20,
          fontSize: "3em",
          display: "flex",
          opacity: 0.5,
          justifyContent: "center",
        }}
      >
        {front} + {verb?.query || " "}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Button
          style={{
            width: "240px",
            height: "70px",
            // paddingTop: 15,
            // paddingBottom: 15,
            alignSelf: "center",
            fontWeight: "bold",
            letterSpacing: 0.1,
            fontSize: "1.6em",
            boxShadow: "0 0px",
          }}
          type="primary"
          tabIndex={-1}
          color="#000"
          onClick={() => {
            setShowAnswer(true);
            playAnswer(answer);
          }}
        >
          Show Answer
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 50,
          marginTop: 15,
        }}
      >
        👇
      </div>
      {showAnswer && (
        <div
          style={{
            fontSize: "3em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {answer}

          <Button
            style={{
              width: "240px",
              height: "70px",
              marginTop: 20,
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: "1.6rem",
              boxShadow: "0 0px",
            }}
            type="primary"
            tabIndex={-1}
            color="#000"
            onClick={() => {
              updateVerb();
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
