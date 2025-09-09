import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import { Button, Col, Flex, Modal, Progress, Row, Spin } from "antd";

import { LAYOUT_ID, ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

const HomePageRouteComponent = lazy(() => import("./HomePage/HomePage.tsx"));
const HostPageRouteComponent = lazy(() => import("./HostPage/HostPage.tsx"));
const PlayerPageRouteComponent = lazy(
  () => import("./PlayerPage/PlayerPage.tsx"),
);
const AboutPageRouteComponent = lazy(() => import("./AboutPage/AboutPage.tsx"));

const NotFoundPageRouteComponent = lazy(
  () => import("./NotFoundPage/NotFoundPage.tsx"),
);

export const Pages = () => {
  const { t } = useTranslation();

  const {
    audio: {
      allowAudio,
      setAllowAudio,
      isAllAudioLoaded,
      loadedAudiosProgress,
    },
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

  if (allowAudio && !isAllAudioLoaded) {
    return (
      <Spin tip={t("audioModal.loadingSounds")} size={"large"}>
        <Row
          align={"bottom"}
          justify={"center"}
          gutter={[20, 20]}
          style={{ height: "300px", padding: "20px" }}
        >
          <Col span={22}>
            <Progress
              percent={loadedAudiosProgress}
              percentPosition={{ align: "center" }}
            />
          </Col>
        </Row>
      </Spin>
    );
  }

  const fallback = (
    <Spin size={"large"}>
      <Flex
        align={"end"}
        justify={"center"}
        style={{ height: "300px", textAlign: "center", padding: "20px" }}
      >
        {t("loadingContent")}
      </Flex>
    </Spin>
  );

  return (
    <>
      {isAudioModalOpen && (
        <Modal
          getContainer={() =>
            document.getElementById(LAYOUT_ID) || document.body
          }
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
      )}
      <Routes>
        <Route
          path={ROUTE_PATHS.home}
          element={
            <Suspense fallback={fallback}>
              <HomePageRouteComponent />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATHS.host}
          element={
            <Suspense fallback={fallback}>
              <HostPageRouteComponent />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATHS.player}
          element={
            <Suspense fallback={fallback}>
              <PlayerPageRouteComponent />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATHS.about}
          element={
            <Suspense fallback={fallback}>
              <AboutPageRouteComponent />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={fallback}>
              <NotFoundPageRouteComponent />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};
