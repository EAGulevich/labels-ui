import { useTranslation } from "react-i18next";
import { getLayoutContainer } from "@utils/getLayoutContainer.ts";
import { Col, Drawer, Flex, Row, Typography } from "antd";
import maxBy from "lodash.maxby";
import styled, { useTheme } from "styled-components";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { AVATARS } from "@components/PlayerAvatar/constants.tsx";
import { TV_WIDTH } from "@constants";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { getStepsOfVoting } from "./parts/getStepsOfVoting.tsx";
import { FactTitle, StyledSteps, VoteBlock, VotePoint } from "./styles.ts";

export const PlayerCard = styled(Flex).attrs({
  vertical: true,
  justify: "space-between",
  align: "center",
  gap: "small",
})<{ background: string }>`
  background: ${({ background }) => background};
  position: relative;
  padding: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

export const PlayerName = styled(Flex).attrs({
  justify: "center",
  align: "center",
})`
  width: 100%;
  max-width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 4px;
  height: 40%;
  background: ${({ theme }) => theme.token.colorBgContainer + "d9"};

  > div {
    margin: 0;
    max-width: 100%;
  }
`;

export const VotingModalContent = () => {
  const { token } = useTheme();
  const { t } = useTranslation();
  const { room } = useGameState();

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
      getContainer={getLayoutContainer}
      height={"848px"}
      placement="bottom"
      closable={false}
      open={!!room.votingData}
      mask={false}
      styles={{
        content: {
          width: `${TV_WIDTH}px`,
          backgroundColor: token.colorBgContainer + "90",
          backdropFilter: "blur(12px)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: `inset 0px 4px 20px 0px ${token.colorBorderSecondary}`,
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
    >
      {room.votingData && (
        <Row gutter={[0, 60]}>
          <Col span={24}>
            <Row justify={"center"}>
              <Col span={20}>
                <FactTitle>
                  <Typography.Title level={1} style={{ margin: 0 }}>
                    {room.votingData.currentVotingFact.text}
                  </Typography.Title>
                </FactTitle>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify={"center"}>
              {room.votingData.candidates.map((c) => (
                <Col span={2}>
                  <Flex
                    vertical
                    key={c.candidate.id}
                    style={{
                      transition: "opacity 1s, scale 0.5s",
                      scale:
                        isOnlyMax &&
                        c.candidate.id === playerIdWithMaxVotes?.candidate.id
                          ? 1.1
                          : 0.9,
                      opacity:
                        isAllPlayersVotedForFact &&
                        isOnlyMax &&
                        c.candidate.id !== playerIdWithMaxVotes?.candidate.id
                          ? "0"
                          : "1",
                    }}
                  >
                    <PlayerCard
                      background={AVATARS[c.candidate.avatar.token].background}
                    >
                      {AVATARS[c.candidate.avatar.token].icon}
                      <PlayerName>
                        <Typography.Paragraph ellipsis={{ rows: 2 }}>
                          {c.candidate.name}
                        </Typography.Paragraph>
                      </PlayerName>
                    </PlayerCard>
                    <VoteBlock>
                      {Array(c.votesCount || 0)
                        .fill(<VotePoint />)
                        .map((i) => i)}
                    </VoteBlock>
                  </Flex>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};
