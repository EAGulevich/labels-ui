import { useTranslation } from "react-i18next";
import { Col, List, Row, Typography } from "antd";

import { useGameState } from "@providers/GameStateProvider.tsx";

export const DiscussionScreen = () => {
  const { t } = useTranslation();
  const { room } = useGameState();
  const { facts = [] } = room || {};

  return (
    <Row gutter={[0, 20]} style={{ paddingBottom: 20 }} justify="center">
      <Col>
        <Typography.Title
          level={5}
          style={{ margin: 0, textAlign: "center" }}
          type={"secondary"}
        >
          {t("discussionScreen.title")}
        </Typography.Title>
      </Col>
      <Col>
        <List
          bordered
          dataSource={facts.filter((f) => !f.isCorrect).map((f) => f.text)}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
