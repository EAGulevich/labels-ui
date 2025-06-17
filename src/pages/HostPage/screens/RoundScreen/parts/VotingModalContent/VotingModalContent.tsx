import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Flex, StepsProps, Typography } from "antd";
import maxBy from "lodash.maxby";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { Candidate, Player, Room } from "@sharedTypes/types.ts";

import { StyledSteps, VoteBlock, VotePoint } from "./styles.ts";

// TODO: в контекст нафиг - 2 штуки - для хоста и для игрока
type VotingModalContentProps = {
  votingFact: Room["votingFact"];
  facts: Room["facts"];
  round: Room["round"];
  story: Room["story"];
  players: Player[];
};

// TODO: на весь экран, чтобы не было видно промежуточных результатов или в отдельную экран
export const VotingModalContent = ({
  votingFact,
  facts,
  round,
  story,
  players,
}: VotingModalContentProps) => {
  const { t } = useTranslation();

  const voteKey: keyof Candidate = "voteCount";
  const playerIdWithMaxVotes = maxBy(votingFact?.candidates, voteKey);

  const isOnlyMax =
    votingFact?.candidates.filter(
      (c) => c.voteCount === playerIdWithMaxVotes?.voteCount,
    ).length === 1;

  const votedFacts = story[round]?.length || 0;
  const isAllPlayersVotedForFact =
    votingFact?.candidates.reduce((prev, cur) => {
      return prev + cur.voteCount;
    }, 0) ===
    players.length - 1;

  // TODO: вынести
  const items: StepsProps["items"] = facts
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
              status: story[round][i] === "NOBODY" ? "error" : "finish",
              icon:
                story[round][i] === "NOBODY" ? (
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
        <Typography.Title level={1}>{votingFact?.text}</Typography.Title>
      </Flex>
      <Flex justify={"center"} gap={"small"} wrap>
        {votingFact?.candidates.map((c) => (
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
