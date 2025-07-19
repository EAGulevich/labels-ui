import { useTranslation } from "react-i18next";
import { AimOutlined, CloseOutlined } from "@ant-design/icons";
import { Flex, Tag, TimelineItemProps, Tooltip, Typography } from "antd";
import maxBy from "lodash.maxby";
import { useTheme } from "styled-components";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import {
  getPlayerPoints,
  getPointsByRound,
} from "../../../HostPage/screens/GameResultScreen/parts/pointsHelper.ts";

export const useGameResult = () => {
  const { room } = useGameState();
  const { userId } = useAppStorage();
  const { t } = useTranslation();
  const { token } = useTheme();

  const player = room?.players.find((p) => p.id === userId);

  const statistic = {
    totalPoints: 0,
    rightVotesCount: 0,
    wrongVotesCount: 0,
    guessedRound: 0,
  };

  // todo повторяется
  const total = room?.facts.map((f) => {
    let points = 0;
    const pId = f.selectedPlayer?.id;
    const player = room.players.find((p) => p.id === pId);

    Object.entries(room.results || {}).forEach(([r, info]) => {
      info.forEach((i) => {
        if (i.isGuessed && pId === i.fact.author.id) {
          points += getPointsByRound({ round: +r });
        }

        i.playersWhoGuessedCorrectly.forEach((gp, index) => {
          if (gp.id === pId) {
            points += getPlayerPoints({
              playersLength: room.players.length,
              index: index,
            });
          }
        });
      });
    });
    return {
      points,
      player,
    };
  });

  const maxPoints = maxBy(total, (el) => el.points)?.points;

  const timeLineItems = Object.values(room?.results || {}).reduce<
    TimelineItemProps[]
  >((acc, roundInfo, roundIndex) => {
    acc.push({
      children: (
        <Typography.Text
          strong
          style={{ fontSize: 22, position: "relative", bottom: "6px" }}
        >
          {t("resultsScreen.round")} {roundIndex + 1}
        </Typography.Text>
      ),
    });

    roundInfo.forEach((fact) => {
      if (fact.fact.author.id === player?.id && fact.isGuessed) {
        statistic.guessedRound = roundIndex + 1;
        statistic.totalPoints += getPointsByRound({
          round: roundIndex + 1,
        });
      }

      const playerIndex = fact.playersWhoGuessedCorrectly.findIndex(
        (rightGuessedPlayer) => player?.id === rightGuessedPlayer.id,
      );
      if (playerIndex >= 0) {
        statistic.rightVotesCount++;
        statistic.totalPoints += getPlayerPoints({
          playersLength: room?.players.length || 0,
          index: playerIndex,
        });
      } else {
        statistic.wrongVotesCount++;
      }

      acc.push({
        dot:
          playerIndex >= 0 ? (
            <AimOutlined style={{ color: token["colorWarning"] }} />
          ) : (
            <CloseOutlined />
          ),
        color: token["colorTextSecondary"],
        children: (
          <Flex vertical>
            <Typography.Text type={fact.isGuessed ? undefined : "secondary"}>
              {fact.fact.author.name}
            </Typography.Text>
            <Typography.Text
              style={{ fontSize: 12, color: token.colorPrimary }}
            >
              {fact.fact.author.id === player?.id && fact.isGuessed
                ? t("resultsScreen.youGuessed")
                : ""}
            </Typography.Text>
          </Flex>
        ),
        label: (
          <Flex vertical gap={"small"}>
            {playerIndex >= 0 ? (
              <Typography.Text>
                <Tooltip
                  placement="top"
                  title={t("resultsScreen.youVoted_interval", {
                    count: playerIndex + 1,
                    postProcess: "interval",
                  })}
                >
                  <Tag color="gold">
                    +
                    {getPlayerPoints({
                      playersLength: room?.players.length || 0,
                      index: playerIndex,
                    })}
                  </Tag>
                </Tooltip>
                <Typography.Text type={"secondary"} style={{ fontSize: 12 }}>
                  {" "}
                  {t("resultsScreen.points", {
                    count: getPlayerPoints({
                      playersLength: room?.players.length || 0,
                      index: playerIndex,
                    }),
                  })}
                </Typography.Text>
              </Typography.Text>
            ) : (
              ""
            )}
            {fact.isGuessed && (
              <Flex vertical>
                {fact.fact.author.id === player?.id && (
                  <Typography.Text>
                    <Tag color={"purple"}>
                      +
                      {getPointsByRound({
                        round: statistic.guessedRound || 0,
                      })}
                    </Tag>
                    <Typography.Text
                      type={"secondary"}
                      style={{ fontSize: 12 }}
                    >
                      {t("resultsScreen.points", {
                        count: getPointsByRound({
                          round: statistic.guessedRound || 0,
                        }),
                      })}
                    </Typography.Text>
                  </Typography.Text>
                )}
              </Flex>
            )}
          </Flex>
        ),
      });
    });

    return acc;
  }, []);

  return {
    statistic,
    timeLineItems,
    isWinner: statistic.totalPoints === maxPoints,
  };
};
