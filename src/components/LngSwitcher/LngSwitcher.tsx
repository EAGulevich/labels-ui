import { Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider.tsx";

export const LngSwitcher = () => {
  const { lng, changeLng } = useAppSettings();

  return (
    <Switch
      onChange={(checked) => changeLng(checked ? "ru" : "en")}
      checkedChildren={"ru"}
      unCheckedChildren={"en"}
      checked={lng === "ru"}
      defaultChecked={lng === "ru"}
    />
  );
};
