import { useTranslation } from "react-i18next";

import { Player as PlayerComp } from "@components/Player/Player.tsx";
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
        {players.map((player) => (
          <PlayerComp key={player.id} player={player} status={"waiting"} />
        ))}
        <PlayerComp
          player={{
            isActive: true,
            isVip: false,
            name: t("bot"),
            avatarToken: "ROBOT_BOT",
          }}
          status={"success"}
        />
      </Players>
    </>
  );
};
