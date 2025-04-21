import { Switch } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useApp } from "../../AppProvider.tsx";

export const ThemeSwitcher = () => {
  const { themeName, changeTheme } = useApp();

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
