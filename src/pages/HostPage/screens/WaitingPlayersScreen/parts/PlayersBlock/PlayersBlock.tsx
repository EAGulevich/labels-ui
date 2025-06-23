import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";
import { useTheme } from "styled-components";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import {
  ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S,
  MAX_PLAYERS,
  MIN_PLAYERS,
} from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { Room } from "@sharedTypes/types.ts";

import {
  CountDownItem,
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
  showCountDown: boolean;
};

export const PlayersBlock: FC<PlayersBlockProps> = ({
  players,
  showCountDown,
}) => {
  const { token } = useTheme();
  const { t } = useTranslation();
  const {
    audio: { getAudio },
  } = useAppSettings();
  const { volume } = useAppStorage();

  const [countDownVal, setCountDownVal] = useState<[number, number] | []>([]);

  useEffect(() => {
    if (showCountDown) {
      setTimeout(() => {
        setCountDownVal([4, 3]);
        getAudio("itemHover").play({ userSettingsVolume: volume });
      }, ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S * 1000);
      setTimeout(
        () => {
          setCountDownVal([0, 2]);
          getAudio("itemHover").play({ userSettingsVolume: volume });
        },
        ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S * 2 * 1000,
      );
      setTimeout(
        () => {
          setCountDownVal([5, 1]);
          getAudio("itemHover").play({ userSettingsVolume: volume });
        },
        ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S * 3 * 1000,
      );
    }
  }, [getAudio, showCountDown, volume]);

  return (
    <>
      <Flex>
        <PlayersCounter
          valueStyle={{
            color: players.length >= MIN_PLAYERS ? "inherit" : token.colorError,
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
            >
              <CountDownItem visible={countDownVal[0] === index}>
                {countDownVal[1] || ""}
              </CountDownItem>
            </StyledCard>
          ))}
      </PlayersGrid>
    </>
  );
};
