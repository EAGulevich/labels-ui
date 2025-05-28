import { useCallback, useLayoutEffect, useState } from "react";
import { AutoTextSize } from "auto-text-size";
import { motion } from "motion/react";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { Fact } from "@sharedTypes/types.ts";

import { FactBlock, GridFacts, PlayerWithFact } from "./styles.ts";

type FactsGridProps = {
  facts: Fact[];
};

const MAX_HEIGHT = 110;

const getRowHeight = (rowCount: number) => {
  const gridContainer = document.querySelector("main")?.firstElementChild;
  if (gridContainer) {
    const gridStyles = window.getComputedStyle(gridContainer);

    const newRowHeight = Number.parseInt(
      (
        (Number.parseInt(gridStyles.height) -
          Number.parseInt(gridStyles.padding) * 2 -
          Number.parseInt(gridStyles.gap) * 4) /
          Math.ceil(rowCount / 2) -
        1
      ).toString(),
    );

    return +newRowHeight < MAX_HEIGHT ? +newRowHeight : MAX_HEIGHT;
  } else {
    return MAX_HEIGHT;
  }
};

export const FactsGrid = ({ facts }: FactsGridProps) => {
  const [rowHeight, setRowHeight] = useState(1);

  const setupRowHeight = useCallback(() => {
    const newRowHeight = getRowHeight(facts.length);

    if (+newRowHeight < MAX_HEIGHT) {
      setRowHeight(+newRowHeight);
    } else {
      setRowHeight(MAX_HEIGHT);
    }
  }, [facts.length]);

  useLayoutEffect(() => {
    setupRowHeight();

    window.addEventListener("resize", setupRowHeight);

    return () => {
      window.removeEventListener("resize", setupRowHeight);
    };
  }, [setupRowHeight]);

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
            $height={rowHeight + "px"}
            isGuessed={!item.supposedPlayer ? undefined : item.isGuessed}
          >
            <PlayerCard
              height={rowHeight + "px"}
              player={
                item.supposedPlayer || {
                  name: "- - -",
                  isVip: false,
                  isActive: true,
                  factStatus: FACT_STATUS.NOT_RECEIVED,
                }
              }
            />

            <FactBlock>
              <AutoTextSize mode={"box"}>{item.text}</AutoTextSize>
            </FactBlock>
          </PlayerWithFact>
        </motion.div>
      ))}
    </GridFacts>
  );
};
