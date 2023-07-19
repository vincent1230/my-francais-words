import { Button, ConfigProvider, List } from "antd";
import { encode } from "js-base64";
import { ReactElement, useEffect, useState } from "react";
import verbs from "../data/verbs_practice.json";
import { getRandomInt } from "./utils";

type Verb = {
  present: string[];
  passeCompose: string[];
  imparfait: string[];
  futurSimple: string[];
  subjonctifPresent: string[];
  query: string;
};

const sujetArr = ["je ", "tu ", "il ", "elle ", "nous ", "vous ", "ils ", "elles "];

export const Conjugation = (): ReactElement => {
  return (
    <div>
      <h1
        style={{
          fontSize: 25,
          textAlign: "center",
          color: "#303030",
        }}
      >
        Conjugaison
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

export const playAnswer = (answer: string | undefined, mute = false) => {
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

export const RandomVerb = (): ReactElement => {
  const [verb, setVerb] = useState<Verb>();
  const [sujet, setSujet] = useState<string>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState<string>();

  const updateVerb = () => {
    let verb = verbs[getRandomInt(0, verbs.length - 1)];
    let sujet = sujetArr[getRandomInt(0, sujetArr.length - 1)];
    setShowAnswer(false);
    setVerb(verb);
    setSujet(sujet);

    const result = verb.present.filter((v) => {
      if (sujet === "je ") {
        return v.includes(sujet) || v.includes("j'");
      } else if (sujet === "elle ") {
        return v.includes("il ");
      } else if (sujet === "elles ") {
        return v.includes("ils ");
      } else if (sujet) {
        return v.includes(sujet);
      }
      return null;
    });

    if (result && result.length === 1) {
      let ans = result[0];
      if (sujet === "elle ") {
        ans = ans.replace("il", "elle");
      } else if (sujet === "elles ") {
        ans = ans.replace("ils", "elles");
      }
      setAnswer(ans);
    } else {
      setAnswer("error!");
    }
  };

  useEffect(() => {
    updateVerb();
  }, []);

  useEffect(() => {
    playAnswer(answer, true);
  }, [answer]);

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
          fontSize: "2em",
          display: "flex",
          opacity: 0.5,
          justifyContent: "center",
        }}
      >
        {sujet} + {verb?.query || " "}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <Button
          style={{
            width: "150px",
            height: "50px",
            alignSelf: "center",
            fontWeight: "bold",
            letterSpacing: 0.1,
            fontSize: "1.3em",
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
          Corriger
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 20,
          marginTop: 10,
        }}
      >
        👇
      </div>
      {showAnswer && (
        <>
          <div
            style={{
              fontSize: "2em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {answer}
            <Button
              style={{
                width: "150px",
                height: "50px",
                marginTop: 15,
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
                boxShadow: "0 0px",
              }}
              type="primary"
              tabIndex={-1}
              color="#000"
              onClick={() => {
                updateVerb();
              }}
            >
              Continuer
            </Button>
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: "2em",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {verb && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <ConjugationList
                    data={verb.present}
                    title={"Présent"}
                    color={"#cf1322"}
                  />
                  <ConjugationList
                    data={verb.passeCompose}
                    title={"Passé composé"}
                    color={"#1677ff"}
                  />

                  <ConjugationList
                    data={verb.futurSimple}
                    title={"Futur simple"}
                    color={"#722ed1"}
                  />
                </div>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <ConjugationList
                    data={verb.imparfait}
                    title={"Imparfait"}
                    color={"#237804"}
                  />
                  <ConjugationList
                    data={verb.subjonctifPresent}
                    title={"Subjonctif"}
                    color={"#d48806"}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const ConjugationList = (props: {
  data: string[];
  title: string;
  color: string;
}): ReactElement => {
  const { data, title, color } = props;

  if (!data) {
    return <div />;
  }

  return (
    <div>
      <div
        style={{
          fontSize: 20,
          textAlign: "center",
          marginBottom: 10,
          color,
          fontWeight: "bold",
        }}
      >
        {title}
      </div>

      <List
        style={{ marginLeft: 15, marginRight: 15 }}
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ color }}>
            <div
              style={{ cursor: "pointer", fontSize: 20 }}
              onClick={() => {
                playAnswer(item, false);
              }}
            >
              {item}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
