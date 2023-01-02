import { InputNumber } from "antd";
import { ReactElement, useState } from "react";
import { useTimer } from "use-timer";

// const mainNum = [
//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30,
//   40, 50, 60, 70, 80, 90, 100,
// ];

export const RandomNum = (): ReactElement => {
  const [num, setNum] = useState(0);
  const [interval, setInterval] = useState(5);

  useTimer({
    initialTime: 0,
    autostart: true,
    interval: interval * 1000,
    onTimeUpdate: () => {
      setNum(Math.round(Math.random() * 100));
    },
  });

  return (
    <div style={{ overflowX: "hidden" }}>
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
          marginTop: 24,
          fontSize: 200,
          display: "flex",
          fontFamily: "Helvetica, arial, sans-serif, PingFang SC",
          justifyContent: "center",
          color: "#1B9CD0",
        }}
      >
        {num}
      </div>
    </div>
  );
};
