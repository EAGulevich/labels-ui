import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Flex, Typography } from "antd";
import maxBy from "lodash.maxby";
import { useTheme } from "styled-components";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { Candidate } from "@sharedTypes/types.ts";

import { getStepsOfVoting } from "./parts/getStepsOfVoting.tsx";
import { FactTitle, StyledSteps, VoteBlock, VotePoint } from "./styles.ts";

export const VotingModalContent = () => {
  const [drawerHeight, setDrawerHeight] = useState<string>("0px");
  const { token } = useTheme();
  const { t } = useTranslation();
  const { room } = useGameState();

  useLayoutEffect(() => {
    const drawerTopMargin =
      document.getElementsByTagName("footer")[0].clientHeight +
      document.getElementsByTagName("header")[0].clientHeight +
      10 +
      "px";

    setDrawerHeight(`calc(100vh - ${drawerTopMargin})`);
  }, []);

  if (!room) {
    return <ErrorFallback />;
  }

  const voteKey: keyof Candidate = "voteCount";
  const playerIdWithMaxVotes = maxBy(room.votingFact?.candidates, voteKey);

  const isOnlyMax =
    room.votingFact?.candidates.filter(
      (c) => c.voteCount === playerIdWithMaxVotes?.voteCount,
    ).length === 1;

  const isAllPlayersVotedForFact =
    room.votingFact?.candidates.reduce((prev, cur) => {
      return prev + cur.voteCount;
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
          <StyledSteps
            size={"small"}
            labelPlacement={"vertical"}
            direction={"horizontal"}
            items={getStepsOfVoting({ room, token })}
          />
        </Flex>
      }
      placement="bottom"
      size={"large"}
      closable={false}
      open={true}
    >
      <FactTitle>
        <Typography.Title level={1}>{room.votingFact?.text}</Typography.Title>
      </FactTitle>
      <Flex justify={"center"} gap={"small"} wrap>
        {room.votingFact?.candidates.map((c) => (
          <Flex
            vertical
            key={c.id}
            style={{
              transition: "opacity 1s",
              opacity:
                isAllPlayersVotedForFact &&
                isOnlyMax &&
                c.id !== playerIdWithMaxVotes?.id
                  ? "0"
                  : "1",
            }}
          >
            <PlayerCard
              player={{ ...c, isVip: false, isActive: true }}
              mark={isOnlyMax && c.id === playerIdWithMaxVotes?.id}
            />
            <VoteBlock>
              {Array(c.voteCount || 0)
                .fill(<VotePoint />)
                .map((i) => i)}
            </VoteBlock>
          </Flex>
        ))}
      </Flex>
    </Drawer>
  );
};
