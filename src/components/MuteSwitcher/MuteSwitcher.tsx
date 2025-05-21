import { MutedFilled, SoundFilled } from "@ant-design/icons";
import { Flex, Slider, SliderSingleProps, Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";

const marks: SliderSingleProps["marks"] = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

export const MuteSwitcher = () => {
  const {
    audio: { allowAudio, setAllowAudio },
  } = useAppSettings();

  const { volume, changeVolume } = useAppStorage();

  return (
    <Flex align={"top"} justify={"space-between"} gap={"large"}>
      <Switch
        onChange={(checked) => setAllowAudio(checked)}
        checkedChildren={<SoundFilled />}
        unCheckedChildren={<MutedFilled />}
        checked={allowAudio}
      />
      <div style={{ width: "160px" }}>
        <Slider
          marks={marks}
          min={1}
          max={5}
          value={volume}
          onChange={(val) => changeVolume(val)}
        />
      </div>
    </Flex>
  );
};
