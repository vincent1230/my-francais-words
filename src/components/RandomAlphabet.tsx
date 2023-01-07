import { Button, Input, InputNumber } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { getRandomInt } from "./utils";

const alphabet = [
  "A a",
  "B b",
  "C c",
  "D d",
  "E e",
  "F f",
  "G g",
  "H h",
  "I i",
  "J j",
  "K k",
  "L l",
  "M m",
  "N n",
  "O o",
  "P p",
  "Q q",
  "R r",
  "S s",
  "T t",
  "U u",
  "V v",
  "W w",
  "X x",
  "Y y",
  "Z z",
];

export const RandomAlphabet = (): ReactElement => {
  const [isLire, setIsLire] = useState(false);

  return (
    <div>
      <h1
        style={{
          fontSize: 35,
          textAlign: "center",
          color: "#303030",
        }}
      >
        L’alphabet
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 30,
          paddingBottom: 30,
        }}
      >
        <Button
          onClick={() => {
            setIsLire(true);
          }}
        >
          Lire
        </Button>
        <Button
          style={{
            marginLeft: 20,
          }}
          onClick={() => {
            setIsLire(false);
          }}
        >
          Ecoutez
        </Button>
      </div>
      {isLire ? <LireRandomAlphabet /> : <EcoutezRandomAlphabet />}
    </div>
  );
};

export const LireRandomAlphabet = (): ReactElement => {
  const [abc, setAbc] = useState("");
  const [interval, setInterval] = useState(3);

  useTimer({
    initialTime: 0,
    autostart: true,
    interval: interval * 1000,
    onTimeUpdate: () => {
      setAbc(alphabet[getRandomInt(0, 25)]);
    },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        new Audio(sounds[abc.slice(-1).toUpperCase() as AlphabetType]).play();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [abc]);

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
          defaultValue={5}
          min={1}
          max={6}
          onChange={(value) => {
            setInterval(value || 5);
          }}
        />
      </div>

      <div
        style={{
          marginTop: 68,
          fontSize: 200,
          display: "flex",
          fontFamily: "PingFang SC",
          justifyContent: "center",
          color: "#1B9CD0",
        }}
      >
        {abc}
      </div>
    </div>
  );
};

export const EcoutezRandomAlphabet = (): ReactElement => {
  const [abc, setAbc] = useState<string | undefined>(undefined);
  const [interval, setInterval] = useState(5);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [inputAbc, setInputAbc] = useState<string | undefined>(undefined);
  const [correctAbc, setCorrectAbc] = useState<string | undefined>(undefined);

  let color;
  if (status === undefined) {
    color = "#5E5E5E";
  } else if (status === "right") {
    color = "#16a37e";
  } else if (status === "wrong") {
    color = "#FF4500";
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        if (
          inputAbc?.toLocaleLowerCase() === abc?.slice(-1).toLocaleLowerCase()
        ) {
          setStatus("right");
        } else {
          setStatus("wrong");
        }
        setCorrectAbc(abc);
      } else if (e.code === "Escape") {
        setStatus(undefined);
        setCorrectAbc(undefined);
        setInputAbc(undefined);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inputAbc, abc]);

  useTimer({
    initialTime: 0,
    autostart: true,
    interval: interval * 1000,
    onTimeUpdate: () => {
      const changed = alphabet[getRandomInt(0, 25)];
      setAbc(changed);
      new Audio(sounds[changed.slice(-1).toUpperCase() as AlphabetType]).play();
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
          defaultValue={5}
          min={1}
          max={6}
          onChange={(value) => {
            setInterval(value || 5);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 24,
          marginTop: 68,
        }}
      >
        <Input
          style={{
            width: 500,
            height: 200,
            fontSize: 100,
            borderWidth: 5,
            borderColor: color,
            fontFamily: "PingFang SC",
            justifyContent: "center",
            textAlign: "center",
            color: color,
          }}
          value={inputAbc}
          onChange={(e) => {
            setStatus(undefined);
            setCorrectAbc(undefined);
            const value = e.target.value.trim();
            if (value) {
              setInputAbc(value);
            } else {
              setInputAbc(undefined);
            }
          }}
        />
      </div>
      <div
        style={{
          height: 200,
          fontSize: 100,
          marginTop: 68,
          borderWidth: 5,
          borderColor: color,
          fontFamily: "PingFang SC",
          justifyContent: "center",
          textAlign: "center",
          color: "#16a37e",
        }}
      >
        {correctAbc}
      </div>
    </div>
  );
};

type AlphabetType =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
const sounds = {
  A: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_a.mp3",
  B: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_b.mp3",
  C: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_c.mp3",
  D: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_d.mp3",
  E: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_e.mp3",
  F: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_f.mp3",
  G: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_g.mp3",
  H: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_h.mp3",
  I: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_i.mp3",
  J: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_git.mp3",
  K: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_cas.mp3",
  L: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_aile.mp3",
  M: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_m.mp3",
  N: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_aine.mp3",
  O: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_au.mp3",
  P: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_p.mp3",
  Q: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_cul.mp3",
  R: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_air.mp3",
  S: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_ace.mp3",
  T: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_t.mp3",
  U: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_eu.mp3",
  V: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_v.mp3",
  W: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_w.mp3",
  X: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_x.mp3",
  Y: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_y.mp3",
  Z: "https://www.collinsdictionary.com/sounds/hwd_sounds/fr_z.mp3",
};
