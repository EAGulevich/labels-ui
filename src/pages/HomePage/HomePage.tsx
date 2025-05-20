import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Flex } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  const { t } = useTranslation();

  const {
    audio: { allowAudio, setAllowAudio },
  } = useAppSettings();
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(
    allowAudio === undefined,
  );

  useEffect(() => {
    socket.disconnect();
  }, []);

  const onAllowAudio = () => {
    setAllowAudio(true);
    setIsAudioModalOpen(false);
  };

  const onRefuse = () => {
    setAllowAudio(false);
    setIsAudioModalOpen(false);
  };

  useEffect(() => {
    if (allowAudio !== undefined) {
      setIsAudioModalOpen(false);
    }
  }, [allowAudio]);

  if (isAudioModalOpen) {
    return (
      <Alert
        message={t("audioModal.title")}
        description={t("audioModal.description")}
        type="info"
        showIcon
        action={
          <Flex vertical gap={"small"}>
            <Button type="primary" onClick={onAllowAudio}>
              {t("audioModal.buttons.allow")}
            </Button>
            <Button danger type={"dashed"} onClick={onRefuse}>
              {t("audioModal.buttons.refuse")}
            </Button>
          </Flex>
        }
      />
    );
  }

  return (
    <>
      <MainAnimatedLogo />
      <AnimatedMenuList />
    </>
  );
};

export default HomePage;
