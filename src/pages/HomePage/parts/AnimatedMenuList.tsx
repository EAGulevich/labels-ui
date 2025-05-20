import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button, Flex } from "antd";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

import audioSrcAppearance from "@assets/sounds/itemAppearance.mp3";
import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider.tsx";

const ANIMATION_DURATION_S = 0.2;
const AUDIO_DELAY_S = ANIMATION_DURATION_S / 4;

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: ANIMATION_DURATION_S },
};

export const AnimatedMenuList = () => {
  const [isReady, setIsReady] = useState(false);
  const { allowAudio } = useAppSettings();
  const audioHover = useRef(allowAudio ? new Audio(audioSrcAppearance) : null);

  const [items, setItems] = useState<JSX.Element[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const playAudio = useCallback(() => {
    const clonedAudio = audioHover.current
      ? (audioHover.current.cloneNode() as (typeof audioHover)["current"])
      : null;
    if (clonedAudio) {
      clonedAudio.volume = 0.1;
      clonedAudio.play();
    }
  }, []);

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
    setItems([]);
  }, [allItems]);

  useEffect(() => {
    let myTimer: NodeJS.Timeout | undefined = undefined;
    if (isReady) {
      const audioRef = audioHover.current;

      const addItems = () => {
        setItems((prevItems) => {
          if (prevItems.length >= allItems.length) {
            clearInterval(myTimer);
            return prevItems;
          }

          if (audioRef) {
            setTimeout(() => {
              const clonedAudio = audioHover.current
                ? (audioHover.current.cloneNode() as (typeof audioHover)["current"])
                : null;
              if (clonedAudio) {
                clonedAudio.volume = 0.1;
                clonedAudio.play();
              }
            }, AUDIO_DELAY_S * 1000);
          }

          return [...prevItems, allItems[prevItems.length]];
        });
      };

      myTimer = setInterval(addItems, ANIMATION_DURATION_S * 1000);

      return () => {
        if (myTimer) {
          clearInterval(myTimer);
        }
      };
    }
  }, [allItems, isReady]);

  useEffect(() => {
    const audioRef = audioHover.current;

    const startAnimationAppearanceMenu = () => {
      setIsReady(true);
    };

    if (audioRef) {
      audioRef.addEventListener("canplaythrough", startAnimationAppearanceMenu);
    } else {
      startAnimationAppearanceMenu();
    }

    return () => {
      if (audioRef) {
        audioRef.removeEventListener(
          "canplaythrough",
          startAnimationAppearanceMenu,
        );
      }
    };
  }, [allItems]);

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
