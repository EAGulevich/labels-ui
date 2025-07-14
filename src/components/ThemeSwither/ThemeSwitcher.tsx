import { useTranslation } from "react-i18next";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Flex, Switch, Typography } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const ThemeSwitcher = () => {
  const {
    theme: { themeName, changeTheme },
  } = useAppSettings();
  const { t } = useTranslation();

  return (
    <Flex align={"center"} justify={"space-between"} gap={"small"}>
      <Typography.Text>{t("menu.theme")}</Typography.Text>
      <Switch
        onChange={(checked) => changeTheme(checked ? "dark" : "light")}
        checkedChildren={<MoonFilled />}
        unCheckedChildren={<SunFilled />}
        checked={themeName === "dark"}
        defaultChecked
      />
    </Flex>
  );
};
