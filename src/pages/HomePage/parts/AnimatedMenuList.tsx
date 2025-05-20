import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button, Flex } from "antd";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";

const ANIMATION_DURATION_S = 0.2;

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: ANIMATION_DURATION_S },
};

export const AnimatedMenuList = () => {
  const {
    audio: { isAllAudioLoaded, allowAudio, audios },
  } = useAppSettings();
  const isReady = !allowAudio || isAllAudioLoaded;
  const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [items, setItems] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const playAudio = useCallback(() => {
    const clonedAudio =
      audios.itemAppearanceAudio.element.cloneNode() as typeof audios.itemAppearanceAudio.element;
    clonedAudio.volume = 0.1;
    clonedAudio.play();
  }, [audios]);

  const allItems = useMemo(
    () => [
      <Button
        key={"newGameButton"}
        onMouseEnter={playAudio}
        size={"large"}
        type={"link"}
        onClick={() => navigate(ROUTE_PATHS.host)}
      >
        {t("home.menu.newGame")}
      </Button>,

      <Button
        key={"joinButton"}
        onMouseEnter={playAudio}
        type={"link"}
        size={"large"}
        onClick={() => navigate(ROUTE_PATHS.player)}
      >
        {t("home.menu.join")}
      </Button>,
    ],
    [navigate, playAudio, t],
  );

  useEffect(() => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = undefined;
    setItems([]);
  }, [allItems]);

  useEffect(() => {
    const addItems = () => {
      setItems((prevItems) => {
        if (prevItems.length >= allItems.length) {
          clearInterval(timerIdRef.current);
          return prevItems;
        }

        return [...prevItems, allItems[prevItems.length]];
      });
    };

    if (isReady && !timerIdRef.current) {
      timerIdRef.current = setInterval(addItems, ANIMATION_DURATION_S * 1000);
    }

    return () => {
      clearInterval(timerIdRef.current);
      timerIdRef.current = undefined;
    };
  }, [
    allItems,
    allowAudio,
    audios,
    isAllAudioLoaded,
    isReady,
    items.length,
    playAudio,
  ]);

  useEffect(() => {
    if (items.length) {
      playAudio();
    }
  }, [items.length, playAudio]);

  return (
    <Flex vertical align={"center"}>
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div key={index} {...motionProps}>
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  );
};
