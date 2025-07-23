import { useCallback, useLayoutEffect, useState } from "react";
import { AutoTextSize } from "auto-text-size";
import { motion } from "motion/react";

import { MAX_PLAYERS } from "@shared/constants/validations.ts";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { FactBlock, GridFacts, PlayerWithFact } from "./styles.ts";

const MAX_HEIGHT = 330;
const MIN_HEIGHT = 30;

const getRowHeight = (rowCount: number, element: HTMLElement) => {
  return (element.clientHeight - 20 * 2 - 24 * 4) / Math.ceil(rowCount / 2) - 1;
};

export const FactsGrid = () => {
  const { room } = useGameState();

  const [rowHeight, setRowHeight] = useState(1);

  const setupRowHeight = useCallback(() => {
    const gridContainer = document.querySelector("main");

    if (gridContainer) {
      const newRowHeight = getRowHeight(MAX_PLAYERS, gridContainer);

      if (+newRowHeight > MAX_HEIGHT) {
        setRowHeight(MAX_HEIGHT);
      } else if (+newRowHeight < MIN_HEIGHT) {
        setRowHeight(MIN_HEIGHT);
      } else {
        setRowHeight(+newRowHeight);
      }
    }
  }, []);

  useLayoutEffect(() => {
    setupRowHeight();

    window.addEventListener("resize", setupRowHeight);

    return () => {
      window.removeEventListener("resize", setupRowHeight);
    };
  }, [setupRowHeight]);

  return (
    <GridFacts>
      {room?.facts.map((item, index) => (
        <motion.div
          key={index}
          initial={{
            scale: 0.7,
            opacity: 0,
            x: index % 2 === 0 ? -150 : 150,
          }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            damping: 6,
            stiffness: 20,
            delay: (index + 1) * 0.5,
          }}
        >
          <PlayerWithFact
            $index={index}
            $height={rowHeight + "px"}
            $guessStatus={
              room.currentRound === 1
                ? undefined
                : !item.selectedPlayer?.id
                  ? "nobody"
                  : item.isCorrect
                    ? "guessed"
                    : "not_guessed"
            }
          >
            <PlayerAvatar token={item.selectedPlayer?.avatar.token} />
            <FactBlock>
              <AutoTextSize mode={"box"} maxFontSizePx={60} minFontSizePx={1}>
                {item.text}
              </AutoTextSize>
            </FactBlock>
          </PlayerWithFact>
        </motion.div>
      ))}
    </GridFacts>
  );
};
