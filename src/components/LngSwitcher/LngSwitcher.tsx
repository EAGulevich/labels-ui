import { Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const LngSwitcher = () => {
  const {
    language: { lng, changeLng },
  } = useAppSettings();

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
