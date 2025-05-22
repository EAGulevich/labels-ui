import { Flex } from "antd";
import { AutoTextSize } from "auto-text-size";
import { motion } from "motion/react";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { Fact } from "@sharedTypes/types.ts";

import { FactBlock, GridFacts } from "./styles.ts";

type FactsGridProps = {
  facts: Fact[];
};

export const FactsGrid = ({ facts }: FactsGridProps) => {
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
          <Flex gap={2}>
            <PlayerCard
              player={{
                name: "- - -",
                isVip: false,
                isActive: true,
                factStatus: FACT_STATUS.NOT_RECEIVED,
              }}
            />

            <FactBlock>
              <AutoTextSize mode={"box"}>{item.text}</AutoTextSize>
            </FactBlock>
          </Flex>
        </motion.div>
      ))}
    </GridFacts>
  );
};
