import { useTranslation } from "react-i18next";
import { Flex, Switch, Typography } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const LngSwitcher = () => {
  const {
    language: { lng, changeLng },
  } = useAppSettings();
  const { t } = useTranslation();

  return (
    <Flex align={"center"} justify={"space-between"} gap={"small"}>
      <Typography.Text>{t("menu.lang")}</Typography.Text>
      <Switch
        onChange={(checked) => changeLng(checked ? "ru" : "en")}
        checkedChildren={"ru"}
        unCheckedChildren={"en"}
        checked={lng === "ru"}
        defaultChecked={lng === "ru"}
      />
    </Flex>
  );
};
