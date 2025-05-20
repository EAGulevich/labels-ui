import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Flex, Spin } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  const { t } = useTranslation();

  const {
    audio: { allowAudio, setAllowAudio, isAllAudioLoaded },
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

  if (allowAudio && !isAllAudioLoaded) {
    return <Spin tip={t("audioModal.loadingSounds")} size="large" fullscreen />;
  }

  return (
    <>
      <MainAnimatedLogo />
      <AnimatedMenuList />
    </>
  );
};

export default HomePage;
