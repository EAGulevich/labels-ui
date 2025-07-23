import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge, Col, Flex, Row } from "antd";
import { useTheme } from "styled-components";

import { MAX_PLAYERS, MIN_PLAYERS } from "@shared/constants/validations.ts";
import { RoomClient } from "@shared/types";

import { AVATARS } from "@components/PlayerAvatar/constants.tsx";
import { ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";

import { StyledTitle } from "../InviteBlock/styles.ts";
import {
  CountDownItem,
  DECORATIVE_PLACE_CLASS,
  DECORATIVE_PLACES_COUNT,
  EMPTY_PLACE_CLASS,
  PlayerCard,
  PlayerName,
  PlayersCounter,
  PlayersGrid,
  StyledCard,
  StyledSkeleton,
} from "./styles.ts";

type PlayersBlockProps = {
  players: RoomClient["players"];
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
    <Row justify={"center"}>
      <Col span={24}>
        <Flex vertical gap={"small"} align={"center"} justify={"center"}>
          <PlayersCounter
            valueStyle={{
              margin: 0,
              color:
                players.length >= MIN_PLAYERS ? "inherit" : token.colorError,
            }}
            title={
              <StyledTitle level={2} type={"secondary"}>
                {t("waitingPlayersScreen.players")}
              </StyledTitle>
            }
            value={players.length}
            suffix={`/ ${MAX_PLAYERS}`}
          />

          <PlayersGrid>
            {players.map((player) => (
              <Badge.Ribbon
                key={player.id}
                text={player.isVip && "VIP"}
                placement={"start"}
                color={"gold"}
                style={!player.isVip ? { overflow: "hidden" } : undefined}
              >
                <StyledCard>
                  <PlayerCard
                    background={AVATARS[player.avatar.token].background}
                  >
                    {AVATARS[player.avatar.token].icon}
                    <PlayerName>
                      <StyledTitle level={5}>{player.name}</StyledTitle>
                    </PlayerName>
                  </PlayerCard>
                </StyledCard>
              </Badge.Ribbon>
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
                  <CountDownItem $visible={countDownVal[0] === index}>
                    {countDownVal[1] || ""}
                  </CountDownItem>
                </StyledCard>
              ))}
          </PlayersGrid>
        </Flex>
      </Col>
    </Row>
  );
};
