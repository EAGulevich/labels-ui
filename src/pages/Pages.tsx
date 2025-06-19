import { lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import { Button, Flex, Modal, Spin } from "antd";

import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

const HomePageRouteComponent = lazy(() => import("./HomePage/HomePage.tsx"));
const HostPageRouteComponent = lazy(() => import("./HostPage/HostPage.tsx"));
const PlayerPageRouteComponent = lazy(
  () => import("./PlayerPage/PlayerPage.tsx"),
);

const NotFoundPageRouteComponent = lazy(
  () => import("./NotFoundPage/NotFoundPage.tsx"),
);

export const Pages = () => {
  const { t } = useTranslation();

  const {
    audio: { allowAudio, setAllowAudio, isAllAudioLoaded },
  } = useAppSettings();
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(
    allowAudio === undefined,
  );

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
      <Modal
        open={isAudioModalOpen}
        title={t("audioModal.title")}
        onCancel={onRefuse}
        footer={
          <Flex justify={"end"} gap={"large"}>
            <Button danger type={"dashed"} onClick={onRefuse}>
              {t("audioModal.buttons.refuse")}
            </Button>
            <Button type="primary" onClick={onAllowAudio}>
              {t("audioModal.buttons.allow")}
            </Button>
          </Flex>
        }
      >
        {t("audioModal.description")}
      </Modal>
    );
  }

  if (allowAudio && !isAllAudioLoaded) {
    return <Spin tip={t("audioModal.loadingSounds")} size="large" fullscreen />;
  }

  return (
    <Routes>
      <Route path={ROUTE_PATHS.home} element={<HomePageRouteComponent />} />
      <Route path={ROUTE_PATHS.host} element={<HostPageRouteComponent />} />
      <Route path={ROUTE_PATHS.player} element={<PlayerPageRouteComponent />} />
      <Route path="*" element={<NotFoundPageRouteComponent />} />
    </Routes>
  );
};
