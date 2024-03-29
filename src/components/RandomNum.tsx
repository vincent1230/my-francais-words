import { Button, Input, InputNumber } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { getRandomInt } from "./utils";

// const mainNum = [
//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30,
//   40, 50, 60, 70, 80, 90, 100,
// ];

export const RandomNum = (): ReactElement => {
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
        Nombre (1-100)
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
      {isLire ? <LireRandomNum /> : <EcoutezRandomNum />}
    </div>
  );
};

export const LireRandomNum = (): ReactElement => {
  const [num, setNum] = useState(0);
  const [interval, setInterval] = useState(5);

  useTimer({
    initialTime: 0,
    autostart: true,
    interval: interval * 1000,
    onTimeUpdate: () => {
      setNum(getRandomInt(0, 100));
    },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        new Audio(
          `https://frenchtogether.com/wp-content/uploads/2018/03/${num}.mp3`
        ).play();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [num]);

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
        {num}
      </div>
    </div>
  );
};

export const EcoutezRandomNum = (): ReactElement => {
  const [num, setNum] = useState<number | undefined>(undefined);
  // const [interval, setInterval] = useState(10);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [inputNum, setInputNum] = useState<number | undefined>(undefined);
  const [correctNum, setCorrectNum] = useState<number | undefined>(undefined);

  let color;
  if (status === undefined) {
    color = "#5E5E5E";
  } else if (status === "right") {
    color = "#16a37e";
  } else if (status === "wrong") {
    color = "#FF4500";
  }

  // const { time, start, pause, reset } = useTimer({
  //   initialTime: 0,
  //   autostart: true,
  //   interval: interval * 1000,
  //   onTimeUpdate: () => {

  //   },
  // });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(e);
      if (e.code === "Enter") {
        e.preventDefault();
        if (inputNum === num) {
          setStatus("right");
        } else {
          setStatus("wrong");
        }

        setCorrectNum(num);

        const changed = getRandomInt(0, 100);
        setNum(changed);
        console.log(changed);
        new Audio(
          `https://frenchtogether.com/wp-content/uploads/2018/03/${changed}.mp3`
        ).play();
      } else if (e.code === "Escape") {
        setStatus(undefined);
        setCorrectNum(undefined);
        setInputNum(undefined);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inputNum, num]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {/* <InputNumber
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
        /> */}
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
          value={inputNum}
          onChange={(e) => {
            setStatus(undefined);
            setCorrectNum(undefined);
            const value = parseInt(e.target.value.trim());
            if (value) {
              setInputNum(value);
            } else {
              setInputNum(undefined);
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
        {correctNum}
      </div>
    </div>
  );
};
