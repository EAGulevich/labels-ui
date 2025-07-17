import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

export const FullScreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fullscreenchange = () => {
      setIsFullscreen((prev) => !prev);
    };

    document.addEventListener("fullscreenchange", fullscreenchange);
    document.addEventListener("keydown", fullscreenchange);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenchange);
      document.removeEventListener("keydown", fullscreenchange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!document.documentElement.requestFullscreen || !document.exitFullscreen) {
    return null;
  }

  return (
    <FloatButton
      tooltip={{
        placement: "left",
        title: isFullscreen
          ? t("fullScreenButton.tooltipFullExit")
          : t("fullScreenButton.tooltipFull"),
      }}
      shape={"square"}
      icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      onClick={toggleFullscreen}
    />
  );
};
