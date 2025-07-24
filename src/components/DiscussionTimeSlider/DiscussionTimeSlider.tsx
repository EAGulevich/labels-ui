import { useTranslation } from "react-i18next";
import { Flex, Slider, Tooltip, Typography } from "antd";

import { InfoIcon } from "@components/DiscussionTimeSlider/styles.ts";
import { LAYOUT_ID } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const DiscussionTimeSlider = () => {
  const {
    discussion: { discussionTime, changeDiscussionTime },
  } = useAppSettings();
  const { t } = useTranslation();

  return (
    <Flex align={"top"} justify={"space-between"} vertical>
      <Flex justify={"space-between"}>
        <Typography.Text>{t("menu.timer")}</Typography.Text>
        <Tooltip
          getPopupContainer={() =>
            document.getElementById(LAYOUT_ID) || document.body
          }
          title={t("menu.timerHint")}
          placement="leftTop"
        >
          <InfoIcon />
        </Tooltip>
      </Flex>
      <Slider
        marks={{
          10: "10",
          30: "30",
          60: "60",
          120: "120",
        }}
        min={10}
        max={120}
        defaultValue={discussionTime}
        onChangeComplete={(val) => changeDiscussionTime(val)}
      />
    </Flex>
  );
};
