import { useTranslation } from "react-i18next";
import { MutedFilled, SoundFilled } from "@ant-design/icons";
import { Flex, Slider, SliderSingleProps, Switch, Typography } from "antd";

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
  const { t } = useTranslation();

  return (
    <Flex vertical gap={"small"}>
      <Flex align={"center"} justify={"space-between"} gap={"small"}>
        <Typography.Text>{t("menu.sound")}</Typography.Text>
        <Switch
          onChange={(checked) => setAllowAudio(checked)}
          checkedChildren={<SoundFilled />}
          unCheckedChildren={<MutedFilled />}
          checked={allowAudio}
        />
      </Flex>
      {allowAudio && (
        <>
          <Flex vertical>
            <Flex justify={"center"}>
              <Typography.Text type={"secondary"}>
                {t("menu.volume")}
              </Typography.Text>
            </Flex>
            <Slider
              marks={marks}
              min={1}
              max={5}
              value={volume}
              onChange={(val) => changeVolume(val)}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
