import { Button, ConfigProvider, List } from "antd";
import { ReactElement } from "react";

export const Phonetic = (): ReactElement => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <h1
        style={{
          fontSize: 35,
          textAlign: "center",
          paddingTop: 24,
        }}
      >
        <a
          href="https://www.masteryourfrench.com/french-pronunciation/phonetic-alphabet/#pronounce-french-vowels"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#000" }}
        >
          Phonétique
        </a>
      </h1>

      <List
        header={<div />}
        footer={<div />}
        dataSource={data}
        renderItem={(group) => (
          <List.Item
            style={{
              justifyContent: "center",
            }}
          >
            <List
              style={{
                width: "50%",
              }}
              grid={{ column: 4 }}
              dataSource={group}
              renderItem={(item) => (
                <List.Item style={{ textAlign: "center" }}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#0E8E89",
                      },
                    }}
                  >
                    <Button
                      tabIndex={-1}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          item.content.replaceAll("/", "")
                        );
                        new Audio(item.href).play();
                      }}
                      style={{
                        width: 80,
                        height: 45,
                        margin: 10,
                        fontFamily: "Georgia, Times, serif",
                        fontSize: 23,
                        fontWeight: "600",
                      }}
                    >
                      {item.content}
                    </Button>
                  </ConfigProvider>
                </List.Item>
              )}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const data = [
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/a-sound.m4a",
      content: "/a/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/i-sound.m4a",
      content: "/i/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/e-sound.m4a",
      content: "/e/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/È-sound.m4a",
      content: "/ɛ/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/u-sound.m4a",
      content: "/u/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/o-sound.m4a",
      content: "/o/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/o-open-sound.m4a",
      content: "/ɔ/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/y-sound.m4a",
      content: "/y/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/eu-sound.m4a",
      content: "/ø/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/oe-sound.m4a",
      content: "/œ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/e-muet-sound.m4a",
      content: "/ə/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/an-sound.m4a",
      content: "/ɑ̃/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/in-sound.m4a",
      content: "/ɛ̃/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/on-sound.m4a",
      content: "/ɔ̃/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/j-sound.m4a",
      content: "/j/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/ue-sound.m4a",
      content: "/ɥ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/w-sound.m4a",
      content: "/w/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/p-sound.m4a",
      content: "/p/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/b-sound.m4a",
      content: "/b/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/t-sound.m4a",
      content: "/t/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/d-sound.m4a",
      content: "/d/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/k-sound.m4a",
      content: "/k/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/g-sound.m4a",
      content: "/g/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/f-sound.m4a",
      content: "/f/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/v-sound.m4a",
      content: "/v/",
    },

    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/s-sound.m4a",
      content: "/s/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/z-sound.m4a",
      content: "/z/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/ch-sound.m4a",
      content: "/ʃ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/ge-sound.m4a",
      content: "/ʒ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/r-sound.m4a",
      content: "/ʀ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/l-sound.m4a",
      content: "/l/",
    },
  ],
  [
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/m-sound.m4a",
      content: "/m/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/n-sound.m4a",
      content: "/n/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/gm-sound.m4a",
      content: "/ɲ/",
    },
    {
      href: "https://www.masteryourfrench.com/wp-content/uploads/2020/04/ing-sound.m4a",
      content: "/ŋ/",
    },
  ],
];
