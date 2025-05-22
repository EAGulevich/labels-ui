import { Flex, Slider } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const DiscussionTimeSlider = () => {
  const {
    discussion: { discussionTime, changeDiscussionTime },
  } = useAppSettings();

  return (
    <Flex
      align={"top"}
      justify={"space-between"}
      vertical
      style={{ width: "100%" }}
    >
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
