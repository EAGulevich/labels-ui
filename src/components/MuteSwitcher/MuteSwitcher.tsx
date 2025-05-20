import { MutedFilled, SoundFilled } from "@ant-design/icons";
import { Switch } from "antd";

import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

export const MuteSwitcher = () => {
  const {
    audio: { allowAudio, setAllowAudio },
  } = useAppSettings();

  return (
    <Switch
      onChange={(checked) => setAllowAudio(checked)}
      checkedChildren={<SoundFilled />}
      unCheckedChildren={<MutedFilled />}
      checked={allowAudio}
    />
  );
};
