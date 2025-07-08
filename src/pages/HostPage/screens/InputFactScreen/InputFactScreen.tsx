import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import { FACT_STATUSES } from "@shared/types";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { Players, StyledTitle } from "./styles.ts";

export const InputFactScreen = () => {
  const { t } = useTranslation();

  const { room } = useGameState();

  if (!room) {
    return <ErrorFallback />;
  }

  return (
    <>
      <StyledTitle level={1}>{t("inputFactScreen.inputFact")}</StyledTitle>
      <Players>
        {room.players.map((player) => {
          const isDone = player.factStatus === FACT_STATUSES.NOT_GUESSED;
          return (
            <motion.div
              key={player.id}
              animate={isDone ? { scale: 0.8 } : { scale: 1 }}
              transition={{ duration: 1 }}
            >
              <PlayerCard
                key={player.id}
                player={player}
                status={
                  player.factStatus === FACT_STATUSES.NOT_RECEIVED
                    ? "waiting"
                    : "success"
                }
              />
            </motion.div>
          );
        })}
      </Players>
    </>
  );
};
