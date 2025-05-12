import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider.tsx";

// TODO: review -

export const ThemeSwitcher = () => {
  const { themeName, changeTheme } = useAppSettings();

  return (
    <Switch
      onChange={(checked) => changeTheme(checked ? "dark" : "light")}
      checkedChildren={<MoonFilled />}
      unCheckedChildren={<SunFilled />}
      checked={themeName === "dark"}
      defaultChecked
    />
  );
};
