import { Image, List } from "antd";
import { ReactElement } from "react";
import { ImageResult, WordQuery } from "../interfaces";

export const ImageList = (props: { query: WordQuery }): ReactElement => {
  const { query } = props;
  if (!query.image_results) {
    return <></>;
  }

  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      grid={{
        column: 3,
      }}
      dataSource={query.image_results.slice(0, 3)}
      renderItem={(item: ImageResult) => (
        <List.Item>
          <div
            style={{
              width: 150,
              height: 150,
              overflow: "hidden",
            }}
          >
            <Image
              src={item.thumbnailUrl}
              width={150}
              height={150}
              preview={{
                src: item.imageUrl,
                mask: (
                  <div
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                ),
              }}
              style={{
                objectFit: "scale-down",
                overflow: "hidden",
              }}
            />
          </div>
        </List.Item>
      )}
    />
  );
};
