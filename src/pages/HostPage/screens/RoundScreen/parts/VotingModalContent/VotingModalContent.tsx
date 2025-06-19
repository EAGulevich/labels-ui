import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Flex, StepsProps, Typography } from "antd";
import maxBy from "lodash.maxby";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { Candidate } from "@sharedTypes/types.ts";

import { StyledSteps, VoteBlock, VotePoint } from "./styles.ts";

// TODO: на весь экран, чтобы не было видно промежуточных результатов или в отдельную экран
export const VotingModalContent = () => {
  const { t } = useTranslation();
  const { room } = useGameState();
  if (!room) {
    return <ErrorFallback />;
  }

  const voteKey: keyof Candidate = "voteCount";
  const playerIdWithMaxVotes = maxBy(room.votingFact?.candidates, voteKey);

  const isOnlyMax =
    room.votingFact?.candidates.filter(
      (c) => c.voteCount === playerIdWithMaxVotes?.voteCount,
    ).length === 1;

  const votedFacts = room.story[room.round]?.length || 0;
  const isAllPlayersVotedForFact =
    room.votingFact?.candidates.reduce((prev, cur) => {
      return prev + cur.voteCount;
    }, 0) ===
    room.players.length - 1;

  // TODO: вынести
  const items: StepsProps["items"] = room.facts
    .filter((f) => !f.isGuessed)
    .map((_f, i) =>
      votedFacts === i
        ? {
            status: "process",
            icon: <LoadingOutlined />,
          }
        : i > votedFacts - 1
          ? {
              status: "wait",
              icon: <UserOutlined />,
            }
          : {
              status:
                room.story[room.round][i] === "NOBODY" ? "error" : "finish",
              icon:
                room.story[room.round][i] === "NOBODY" ? (
                  <CloseOutlined />
                ) : (
                  // TODO: style
                  <CheckCircleOutlined style={{ color: "green" }} />
                ),
            },
    );

  return (
    <Drawer
      title={
        <Flex justify={"center"} align={"center"} vertical>
          <Typography.Title level={3} type={"secondary"}>
            {t("roundScreen.modalVote").toUpperCase()}
          </Typography.Title>
          <StyledSteps direction={"horizontal"} items={items} />
        </Flex>
      }
      placement="bottom"
      size={"large"}
      closable={false}
      open={true}
    >
      <Flex vertical align={"center"}>
        <Typography.Title level={1}>{room.votingFact?.text}</Typography.Title>
      </Flex>
      <Flex justify={"center"} gap={"small"} wrap>
        {room.votingFact?.candidates.map((c) => (
          <Flex
            vertical
            key={c.id}
            // TODO: вынести в стили
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
              player={c}
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
