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
      <Typography.Title level={2}>{t("gameOverScreen.title")}</Typography.Title>
      {/*TODO: Вывести итоговые баллы и коронку у победителя*/}

      {onShowResult && (
        <Flex>
          <Button onClick={onShowResult}>Показать историю</Button>
        </Flex>
      )}
    </Flex>
  );
};
