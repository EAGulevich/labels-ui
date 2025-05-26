import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { useTheme } from "styled-components";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { MAX_PLAYERS, MIN_PLAYERS } from "@constants";
import { Room } from "@sharedTypes/types.ts";

import {
  DECORATIVE_PLACE_CLASS,
  DECORATIVE_PLACES_COUNT,
  EMPTY_PLACE_CLASS,
  PLAYERS_COUNTER_TITLE_CLASS,
  PlayersCounter,
  PlayersGrid,
  StyledCard,
  StyledSkeleton,
} from "./styles.ts";

type PlayersBlockProps = {
  players: Room["players"];
};

export const PlayersBlock: FC<PlayersBlockProps> = ({ players }) => {
  const { token } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Flex>
        <PlayersCounter
          valueStyle={{
            color: players.length > MIN_PLAYERS ? "inherit" : token.colorError,
          }}
          title={
            <Typography.Title
              className={PLAYERS_COUNTER_TITLE_CLASS}
              level={4}
              type={"secondary"}
            >
              {t("waitingPlayersScreen.players")}
            </Typography.Title>
          }
          value={players.length}
          suffix={`/ ${MAX_PLAYERS}`}
        />
      </Flex>
      <PlayersGrid>
        {players.map((player) => (
          <StyledCard key={player.id}>
            <PlayerCard player={player} />
          </StyledCard>
        ))}
        {Array(MAX_PLAYERS - players.length)
          .fill(EMPTY_PLACE_CLASS)
          .map((cn, index) => (
            <StyledSkeleton
              key={"skeleton" + index}
              className={cn}
              active={true}
            />
          ))}
        {Array(DECORATIVE_PLACES_COUNT)
          .fill(DECORATIVE_PLACE_CLASS)
          .map((cn, index) => (
            <StyledCard
              key={"decorate" + index}
              className={`${cn} ${cn + "_" + (index + 1)}`}
            />
          ))}
      </PlayersGrid>
    </>
  );
};
