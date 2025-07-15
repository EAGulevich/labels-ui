import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";

import { FACT_STATUSES, PlayerClient } from "@shared/types";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { FactTitle } from "./styles.ts";

type VoteScreenProps = {
  addVote: (params: { candidateId: string; factId: number }) => void;
};

export const VoteScreen = ({ addVote }: VoteScreenProps) => {
  const { t } = useTranslation();
  const { room } = useGameState();
  const { userId } = useAppStorage();
  const [chosenCandidate, setChosenCandidate] = useState<Pick<
    PlayerClient,
    "id" | "name" | "avatar"
  > | null>(null);

  if (!room?.votingData) {
    // todo
    return "Error";
  }

  if (room.votingData.playersWhoVotedIds.includes(userId)) {
    return (
      <Flex vertical justify={"center"} align={"center"}>
        <FactTitle>{room.votingData.currentVotingFact.text}</FactTitle>
        <Typography.Title level={4} type={"secondary"}>
          {t("playerVoteScreen.youVoted")}
        </Typography.Title>
        <Flex>
          {chosenCandidate && (
            <PlayerCard
              player={{
                ...chosenCandidate,
                factStatus: FACT_STATUSES.NOT_GUESSED,
              }}
            />
          )}
        </Flex>
      </Flex>
    );
  }

  const currentVotingFactId = room.votingData.currentVotingFact.id;
  return (
    <Flex align={"center"} vertical>
      <Typography.Title level={4} type={"danger"}>
        {t("playerVoteScreen.title")}
      </Typography.Title>
      <FactTitle>{room.votingData.currentVotingFact.text}</FactTitle>
      <Flex wrap align={"center"} justify={"center"} gap={"large"}>
        {room.votingData.candidates.map((c) => (
          <PlayerCard
            key={c.candidate.id}
            player={{
              ...c.candidate,
              factStatus: FACT_STATUSES.NOT_GUESSED,
            }}
            onClick={() => {
              addVote({
                candidateId: c.candidate.id,
                factId: currentVotingFactId,
              });
              setChosenCandidate(c.candidate);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
