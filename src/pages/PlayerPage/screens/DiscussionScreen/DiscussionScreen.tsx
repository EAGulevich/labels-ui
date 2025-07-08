import { useTranslation } from "react-i18next";
import { List, Typography } from "antd";

import { useGameState } from "@providers/GameStateProvider.tsx";

export const DiscussionScreen = () => {
  const { t } = useTranslation();
  const { room } = useGameState();
  const { facts = [] } = room || {};

  return (
    <List
      header={
        <Typography.Title level={3}>
          {t("discussionScreen.title")}
        </Typography.Title>
      }
      bordered
      dataSource={facts.filter((f) => !f.isCorrect).map((f) => f.text)}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text>{item}</Typography.Text>
        </List.Item>
      )}
    />
  );
};
