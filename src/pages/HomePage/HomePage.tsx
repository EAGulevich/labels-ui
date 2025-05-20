import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  const { t } = useTranslation();

  const { allowAudio, setAllowAudio } = useAppSettings();
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

  if (isAudioModalOpen) {
    return (
      <Modal
        title={t("audioModal.title")}
        open={isAudioModalOpen}
        onOk={onAllowAudio}
        onCancel={onRefuse}
        footer={[
          <Button key="refuse" onClick={onRefuse}>
            {t("audioModal.buttons.refuse")}
          </Button>,
          <Button key="allow" type="primary" onClick={onAllowAudio}>
            {t("audioModal.buttons.allow")}
          </Button>,
        ]}
      >
        {t("audioModal.description")}
      </Modal>
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
