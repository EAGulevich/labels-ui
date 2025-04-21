import { Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const LngSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const localStorageLng = localStorage.getItem("lng");
    if (localStorageLng !== i18n.language) {
      localStorage.setItem("lng", i18n.language);
    }
  }, [i18n.language]);

  return (
    <Switch
      onChange={(checked) => i18n.changeLanguage(checked ? "ru" : "en")}
      checkedChildren={"ru"}
      unCheckedChildren={"en"}
      checked={i18n.language === "ru"}
      defaultChecked={i18n.language === "ru"}
    />
  );
};
