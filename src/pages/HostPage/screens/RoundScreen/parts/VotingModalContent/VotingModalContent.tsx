import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Flex, Typography } from "antd";
import maxBy from "lodash.maxby";
import { useTheme } from "styled-components";

import { FACT_STATUSES } from "@shared/types";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { getStepsOfVoting } from "./parts/getStepsOfVoting.tsx";
import { FactTitle, StyledSteps, VoteBlock, VotePoint } from "./styles.ts";

export const VotingModalContent = () => {
  const [drawerHeight, setDrawerHeight] = useState<string>("0px");
  const { token } = useTheme();
  const { t } = useTranslation();
  const { room } = useGameState();

  useLayoutEffect(() => {
    setDrawerHeight(
      document.getElementsByTagName("main")[0].clientHeight + "px",
    );
  }, []);

  if (!room) {
    return <ErrorFallback />;
  }

  const playerIdWithMaxVotes = maxBy(
    room.votingData?.candidates || [],
    (c) => c.votesCount,
  );

  const isOnlyMax =
    room.votingData?.candidates.filter(
      (c) => c.votesCount === playerIdWithMaxVotes?.votesCount,
    ).length === 1;

  const isAllPlayersVotedForFact =
    room.votingData?.candidates.reduce((prev, cur) => {
      return prev + cur.votesCount;
    }, 0) ===
    room.players.length - 1;

  return (
    <Drawer
      styles={{
        content: {
          backgroundColor: token.colorBgContainer + "20",
          backdropFilter: "blur(12px)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: `inset 0px 4px 20px 0px ${token.colorText}`,
        },
        wrapper: {
          minHeight: drawerHeight,
          maxHeight: drawerHeight,
        },
      }}
      title={
        <Flex justify={"center"} align={"center"} vertical>
          <Typography.Title level={3} type={"secondary"}>
            {t("roundScreen.modalVote").toUpperCase()}
          </Typography.Title>
          {room.votingData && (
            <StyledSteps
              size={"small"}
              labelPlacement={"vertical"}
              direction={"horizontal"}
              items={getStepsOfVoting({
                room: { ...room, votingData: room.votingData },
                token,
              })}
            />
          )}
        </Flex>
      }
      placement="bottom"
      size={"large"}
      closable={false}
      open={!!room.votingData}
    >
      {room.votingData && (
        <>
          <FactTitle>
            <Typography.Title level={1}>
              {room.votingData.currentVotingFact.text}
            </Typography.Title>
          </FactTitle>
          <Flex justify={"center"} gap={"small"} wrap>
            {room.votingData.candidates.map((c) => (
              <Flex
                vertical
                key={c.candidate.id}
                style={{
                  transition: "opacity 1s",
                  opacity:
                    isAllPlayersVotedForFact &&
                    isOnlyMax &&
                    c.candidate.id !== playerIdWithMaxVotes?.candidate.id
                      ? "0"
                      : "1",
                }}
              >
                <PlayerCard
                  player={{
                    ...c.candidate,
                    factStatus: FACT_STATUSES.NOT_GUESSED,
                  }}
                  mark={
                    isOnlyMax &&
                    c.candidate.id === playerIdWithMaxVotes?.candidate.id
                  }
                />
                <VoteBlock>
                  {Array(c.votesCount || 0)
                    .fill(<VotePoint />)
                    .map((i) => i)}
                </VoteBlock>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Drawer>
  );
};
