import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  AlertOutlined,
  ArrowsAltOutlined,
  DesktopOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Collapse,
  Flex,
  Grid,
  Segmented,
  theme,
  Typography,
} from "antd";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

const { useBreakpoint } = Grid;
const { useToken } = theme;

export const ResolutionWarning = () => {
  const { room } = useGameState();
  const { userId } = useAppStorage();

  const zoomWasForceChangedRef = useRef(false);
  const [warningScreenWasClosed, setWarningScreenWasClosed] = useState(false);
  const { token } = useToken();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isHost = room?.hostId === userId;
  const requiredScreenMinSize = token.screenLG;
  const isScreenSizeAppropriate = !isHost || !!breakpoint.lg;

  const [resolution, setResolution] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const checkResolution = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setResolution({ width: newWidth, height: newHeight });
    };

    if (isHost) {
      checkResolution();
      window.addEventListener("resize", checkResolution);
    }

    return () => window.removeEventListener("resize", checkResolution);
  }, [isHost]);

  if (isScreenSizeAppropriate || warningScreenWasClosed) {
    return null;
  }

  return (
    <Alert
      closable
      type="warning"
      showIcon
      icon={<WarningOutlined />}
      onClose={() => {
        setWarningScreenWasClosed(true);
      }}
      message={
        <Typography.Title level={4} style={{ margin: 0 }}>
          {t("resolutionWarning.alertTitle")}
        </Typography.Title>
      }
      description={
        <Flex vertical>
          <Flex vertical>
            <Typography.Text>
              {t("resolutionWarning.minRequiredScreen", {
                size: requiredScreenMinSize,
              })}
            </Typography.Text>
            <Typography.Text type={"secondary"}>
              {t("resolutionWarning.currentScreen", {
                width: resolution.width,
                height: resolution.height,
              })}
            </Typography.Text>
          </Flex>
          <Typography.Title level={5}>
            {t("resolutionWarning.howToFix")}
          </Typography.Title>
          <Collapse
            bordered={false}
            expandIconPosition={"end"}
            items={[
              {
                key: "bigScreenDevice",
                label: (
                  <Flex gap={"small"}>
                    <DesktopOutlined />
                    {t("resolutionWarning.bigScreenDevice.title")}
                  </Flex>
                ),
                children: (
                  <Typography.Text type="secondary">
                    {t("resolutionWarning.bigScreenDevice.description")}
                  </Typography.Text>
                ),
              },
              {
                key: "changeZoom",
                label: (
                  <Flex gap={"small"}>
                    <ArrowsAltOutlined />
                    {t("resolutionWarning.changeZoom.title")}
                  </Flex>
                ),
                children: (
                  <Typography.Text type="secondary">
                    <Trans
                      i18nKey="resolutionWarning.changeZoom.description"
                      components={{
                        KeyboardText: <Typography.Text keyboard />,
                      }}
                    />
                  </Typography.Text>
                ),
              },
              {
                key: "systemSettings",
                label: (
                  <Flex gap={"small"}>
                    <SettingOutlined />
                    {t("resolutionWarning.systemSettings.title")}
                  </Flex>
                ),
                children: (
                  <Typography.Text type="secondary">
                    {t("resolutionWarning.systemSettings.description")}
                  </Typography.Text>
                ),
              },
              {
                key: "other",
                label: (
                  <Flex gap={"small"}>
                    <AlertOutlined />
                    <Typography.Text>
                      {t("resolutionWarning.other.title")}{" "}
                      <Typography.Text type="secondary">
                        {t("resolutionWarning.other.postTitle")}{" "}
                      </Typography.Text>
                    </Typography.Text>
                  </Flex>
                ),
                children: (
                  <Flex vertical gap={"small"}>
                    <Typography.Text type="secondary">
                      {t("resolutionWarning.other.description")}{" "}
                    </Typography.Text>
                    <Segmented
                      block
                      defaultValue={null}
                      options={[
                        { label: "50%", value: "0.5" },
                        { label: "75%", value: "0.75" },
                        { label: "90%", value: "0.9" },
                      ]}
                      onChange={(value) => {
                        document.body.style.zoom = value || "1";
                        zoomWasForceChangedRef.current = false;
                      }}
                    />
                  </Flex>
                ),
              },
            ]}
          />
        </Flex>
      }
    />
  );
};
