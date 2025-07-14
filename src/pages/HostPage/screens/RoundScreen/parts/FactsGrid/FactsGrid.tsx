import { useCallback, useLayoutEffect, useState } from "react";
import { AutoTextSize } from "auto-text-size";
import { motion } from "motion/react";

import { MAX_PLAYERS } from "@shared/constants/validations.ts";
import { FACT_STATUSES, FactClient } from "@shared/types";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";

import { FactBlock, GridFacts, PlayerWithFact } from "./styles.ts";

type FactsGridProps = {
  facts: FactClient[];
  isVoting?: boolean;
};

const MAX_HEIGHT = 330;
const MIN_HEIGHT = 110;

const getRowHeight = (rowCount: number, element: HTMLElement) => {
  return (element.clientHeight - 20 * 2 - 20 * 4) / Math.ceil(rowCount / 2) - 1;
};

export const FactsGrid = ({ facts, isVoting }: FactsGridProps) => {
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
  }, [facts.length, setupRowHeight]);

  return (
    <GridFacts>
      {facts.map((item, index) => (
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
              isVoting
                ? undefined
                : !item.selectedPlayer?.id
                  ? "nobody"
                  : item.isCorrect
                    ? "guessed"
                    : "not_guessed"
            }
          >
            <PlayerCard
              height={rowHeight + "px"}
              player={
                item.selectedPlayer?.id
                  ? {
                      ...item.selectedPlayer,
                      factStatus: FACT_STATUSES.NOT_GUESSED,
                    }
                  : {
                      name: "- - -",
                      factStatus: FACT_STATUSES.NOT_RECEIVED,
                      avatar: null,
                    }
              }
            />

            <FactBlock>
              <AutoTextSize mode={"box"} maxFontSizePx={60}>
                {item.text}
              </AutoTextSize>
            </FactBlock>
          </PlayerWithFact>
        </motion.div>
      ))}
    </GridFacts>
  );
};
