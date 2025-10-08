import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Flex } from "antd";
import { motion, MotionProps } from "motion/react";
import styled from "styled-components";

import { ROUTE_PATHS } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";

const ANIMATION_DURATION_S = 0.2;

const motionProps: MotionProps = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: ANIMATION_DURATION_S },
  style: {
    listStyle: "none",
  },
};

const StyledLink = styled(Link)`
  font-size: 24px;
  line-height: 50px;
`;

export const AnimatedMenuList = () => {
  const {
    audio: { isAllAudioLoaded, allowAudio, getAudio },
  } = useAppSettings();
  const isReady = !allowAudio || isAllAudioLoaded;
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const { volume } = useAppStorage();

  const [items, setItems] = useState<JSX.Element[]>([]);
  const { t } = useTranslation();

  const playAudio = useCallback(() => {
    getAudio("itemHover").play({ userSettingsVolume: volume });
  }, [getAudio, volume]);

  const allItems = useMemo(
    () => [
      {
        key: "newGameButton",
        to: ROUTE_PATHS.host,
        label: t("home.menu.newGame"),
      },
      {
        key: "joinButton",
        to: ROUTE_PATHS.player,
        label: t("home.menu.join"),
      },
      {
        key: "aboutButton",
        to: ROUTE_PATHS.about,
        label: t("home.menu.about"),
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const items = allItems.map((item) => (
      <StyledLink key={item.key} to={item.to} onMouseEnter={playAudio}>
        {item.label}
      </StyledLink>
    ));

    items.forEach((item, index) => {
      const timer = setTimeout(
        () => {
          setItems((prev) => {
            if (prev.length >= items.length) {
              return items;
            } else {
              playAudio();
              return [...prev, item];
            }
          });
        },
        (index + 1) * ANIMATION_DURATION_S * 1000,
      );
      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [isReady, allItems, playAudio]);

  return (
    <nav>
      <Flex component="ul" vertical align="center">
        {items.map((item, index) => (
          <motion.li key={allItems[index].key} {...motionProps}>
            {item}
          </motion.li>
        ))}
      </Flex>
    </nav>
  );
};
