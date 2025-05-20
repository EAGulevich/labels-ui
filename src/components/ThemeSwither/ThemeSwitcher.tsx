import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const ThemeSwitcher = () => {
  const {
    theme: { themeName, changeTheme },
  } = useAppSettings();

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
