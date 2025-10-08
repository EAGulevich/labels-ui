import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { getLayoutContainer } from "@utils/getLayoutContainer.ts";
import { Button, Tooltip } from "antd";
import styled from "styled-components";

const SFloatButton = styled(Button)`
  position: absolute;
  opacity: 0.5;
  bottom: 12px;
  right: 12px;

  &:hover {
    opacity: 1;
  }
`;

export const FullScreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fullscreenchange = () => {
      setIsFullscreen((prev) => !prev);
    };
    const preventEventF11 = (e: KeyboardEvent) => {
      if (e.key === "F11") e.preventDefault();
    };

    document.addEventListener("fullscreenchange", fullscreenchange);
    document.addEventListener("keydown", preventEventF11);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenchange);
      document.removeEventListener("keydown", preventEventF11);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error(err);
        });
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(err);
        });
      }
    }
  };

  if (!document.documentElement.requestFullscreen || !document.exitFullscreen) {
    return null;
  }

  return (
    <Tooltip
      placement="leftBottom"
      getPopupContainer={getLayoutContainer}
      title={
        isFullscreen
          ? t("fullScreenButton.tooltipFullExit")
          : t("fullScreenButton.tooltipFull")
      }
    >
      <SFloatButton
        type={"text"}
        icon={
          isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
        }
        onClick={toggleFullscreen}
      />
    </Tooltip>
  );
};
