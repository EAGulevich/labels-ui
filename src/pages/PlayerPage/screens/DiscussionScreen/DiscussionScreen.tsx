import { useTranslation } from "react-i18next";
import { List, Typography } from "antd";

import { Room } from "@sharedTypes/types.ts";

type DiscussionScreenProps = {
  facts: Room["facts"];
};

export const DiscussionScreen = ({ facts }: DiscussionScreenProps) => {
  const { t } = useTranslation();
  return (
    <List
      header={
        <Typography.Title level={3}>
          {t("discussionScreen.title")}
        </Typography.Title>
      }
      bordered
      dataSource={facts.filter((f) => !f.isGuessed).map((f) => f.text)}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text>{item}</Typography.Text>
        </List.Item>
      )}
    />
  );
};
