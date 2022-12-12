import { Divider, List } from "antd";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { WordQuery } from "../interfaces";
import { WordQueryBlock } from "./WordQueryBlock";

export const WordGroup = (props: { words: WordQuery[] }): ReactElement => {
  const { words } = props;
  const location = useLocation();
  console.log(location);

  const path = location.pathname.replace("/", "");
  const header = path.charAt(0).toUpperCase() + path.slice(1);
  const h = decodeURIComponent(header);
  return (
    <div>
      <h1 style={{ paddingLeft: 58, fontSize: 50 }}>{h}</h1>
      <Divider />
      <div>
        <List
          dataSource={words}
          renderItem={(item: WordQuery) => (
            <List.Item>
              <WordQueryBlock query={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
