import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Drawer, Flex, Row, Typography } from "antd";
import maxBy from "lodash.maxby";
import styled, { useTheme } from "styled-components";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { AVATARS } from "@components/PlayerAvatar/constants.tsx";
// import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
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
  const [drawerHeight, setDrawerHeight] = useState<string>("0px");
  const { token } = useTheme();
  const { t } = useTranslation();
  const { room } = useGameState();

  useLayoutEffect(() => {
    const updateDrawerHeight = () => {
      const mainContainerHeight =
        document.getElementsByTagName("main")[0].clientHeight;
      if (mainContainerHeight < 400) {
        setDrawerHeight(400 + "px");
      } else {
        setDrawerHeight(mainContainerHeight + "px");
      }
    };

    updateDrawerHeight();

    window.addEventListener("resize", updateDrawerHeight);

    return () => {
      window.removeEventListener("resize", updateDrawerHeight);
    };
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
      height={drawerHeight}
      placement="bottom"
      closable={false}
      open={!!room.votingData}
      // loading={true}
      mask={false}
      styles={{
        content: {
          backgroundColor: token.colorBgContainer + "20",
          backdropFilter: "blur(12px)",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: `inset 0px 4px 20px 0px ${token.colorBorderSecondary}`,
        },
      }}
      title={
        <Flex justify={"center"} align={"center"} vertical>
          <Typography.Title
            level={4}
            type={"secondary"}
            style={{ marginTop: 0 }}
          >
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
        <>
          <Row justify={"center"} gutter={[4, 10]} style={{ height: "100%" }}>
            <Col span={24}>
              <FactTitle>
                <Typography.Title level={3} style={{ marginTop: 0 }}>
                  {room.votingData.currentVotingFact.text}
                </Typography.Title>
              </FactTitle>
            </Col>

            {room.votingData.candidates.map((c) => (
              <Col span={2}>
                <Flex
                  vertical
                  key={c.candidate.id}
                  style={{
                    transition: "opacity 1s",
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
        </>
      )}
    </Drawer>
  );
};
