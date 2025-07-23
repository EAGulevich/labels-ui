import { useTranslation } from "react-i18next";
import { Button, Flex, Typography } from "antd";

export const GameOverScreen = ({
  onShowResult,
}: {
  onShowResult?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Flex vertical justify="center" align="center">
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        {t("gameOverScreen.title")}
      </Typography.Title>

      {onShowResult && (
        <Flex>
          <Button onClick={onShowResult}>
            {t("gameOverScreen.showPoints")}
          </Button>
        </Flex>
      )}
      {!onShowResult && (
        <Typography.Text type={"secondary"} style={{ textAlign: "center" }}>
          {t("gameOverScreen.vipCanShowPoints")}
        </Typography.Text>
      )}
    </Flex>
  );
};
