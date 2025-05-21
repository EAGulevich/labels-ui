import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import { Player as PlayerComp } from "@components/Player/Player.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { Player } from "@sharedTypes/types.ts";

import { Players, StyledTitle } from "./styles.ts";

type InputFactScreenProps = {
  players: Player[];
};

export const InputFactScreen = ({ players }: InputFactScreenProps) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledTitle level={1}>{t("inputFactScreen.inputFact")}</StyledTitle>
      <Players>
        {players.map((player) => {
          const isDode = player.factStatus === FACT_STATUS.NOT_GUESSED;
          return (
            <motion.div
              key={player.id}
              animate={isDode ? { scale: 0.8 } : { scale: 1 }}
              transition={{ duration: 1 }}
            >
              <PlayerComp
                key={player.id}
                player={player}
                status={
                  player.factStatus === FACT_STATUS.NOT_RECEIVED
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
