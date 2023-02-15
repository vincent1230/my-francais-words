import { Button, InputNumber } from "antd";
import { ReactElement, useState } from "react";
import { useTimer } from "use-timer";
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

const frontArr = ["je", "tu", "il", "nous", "vous", "ils"];

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
      <RandomVerb />
    </div>
  );
};

export const RandomVerb = (): ReactElement => {
  const [verb, setVerb] = useState<Verb>();
  const [front, setFront] = useState<string>();
  const [interval, setInterval] = useState(20);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState<string>();

  useTimer({
    initialTime: 0,
    autostart: true,
    interval: interval * 1000,
    onTimeUpdate: () => {
      let verb = verbs[getRandomInt(0, verbs.length - 1)];
      let front = frontArr[getRandomInt(0, 5)];
      setShowAnswer(false);
      setVerb(verb);
      setFront(front);
      let index = verb.present.front.indexOf(front);
      if (index === -1 && front === "je") {
        index = verb.present.front.indexOf("j'");
      }

      if (index === -1) {
        setAnswer("error!");
      } else {
        if (verb.present.front[index] === "j'") {
          setAnswer("j'" + verb.present.back[index]);
        } else {
          setAnswer(verb.present.front[index] + " " + verb.present.back[index]);
        }
      }
    },
  });

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <InputNumber
          style={{
            width: 160,
          }}
          addonBefore="interval"
          defaultValue={20}
          min={1}
          max={6}
          onChange={(value) => {
            setInterval(value || 20);
          }}
        />
      </div>

      <div
        style={{
          marginTop: 12,
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
          marginTop: 36,
          marginBottom: 36,
        }}
      >
        <Button
          style={{
            width: "240px",
            height: "70px",
            paddingTop: 15,
            paddingBottom: 15,
            alignSelf: "center",
            fontWeight: "bold",
            letterSpacing: 0.1,
            fontSize: "1.6em",
          }}
          type="primary"
          tabIndex={-1}
          color="#000"
          onClick={() => {
            setShowAnswer(true);
          }}
        >
          Show Answer
        </Button>
      </div>

      {showAnswer && (
        <div
          style={{
            fontSize: "3em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
};
