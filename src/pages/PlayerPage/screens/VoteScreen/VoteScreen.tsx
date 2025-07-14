import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";

import { FACT_STATUSES, PlayerClient } from "@shared/types";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

type VoteScreenProps = {
  addVote: (params: { candidateId: string; factId: number }) => void;
};

// TODO: разраничить переводы для host и для player
// TODO запрет на голосование за один и тот же факт дважды
export const VoteScreen = ({ addVote }: VoteScreenProps) => {
  const { t } = useTranslation();
  const { room } = useGameState();
  const [sendVoteForFact, setSendVoteForFact] = useState<number | null>(null);
  const [voteCandidate, setVoteCandidate] = useState<Pick<
    PlayerClient,
    "id" | "name" | "avatar"
  > | null>(null);

  // TODO: если перезагрузить страницу, то можно проголосовать дважды!!! - так не должно быть
  if (
    sendVoteForFact === room?.votingData?.currentVotingFact.id &&
    voteCandidate
  ) {
    return (
      <Flex vertical justify={"center"} align={"center"}>
        {/*TODO: styles*/}
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          {room.votingData.currentVotingFact.text}
        </Typography.Title>
        <Typography.Title level={4} type={"secondary"}>
          {t("playerVoteScreen.youVoted")}
        </Typography.Title>
        <Flex>
          <PlayerCard
            player={{
              ...voteCandidate,
              factStatus: FACT_STATUSES.NOT_GUESSED,
            }}
          />
        </Flex>
      </Flex>
    );
  }

  if (!room?.votingData) {
    // todo
    return "Error";
  }

  const currentVotingFactId = room.votingData.currentVotingFact.id;
  return (
    <Flex align={"center"} vertical>
      <Typography.Title level={4} type={"secondary"}>
        {t("playerVoteScreen.title")}
      </Typography.Title>
      {/*TODO: styles*/}
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        {room.votingData.currentVotingFact.text}
      </Typography.Title>
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
              setSendVoteForFact(currentVotingFactId);
              setVoteCandidate(c.candidate);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
