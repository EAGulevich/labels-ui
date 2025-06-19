import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { Candidate } from "@sharedTypes/types.ts";

type VoteScreenProps = {
  addVote: (candidateId: string) => void;
};

// TODO: разраничить переводы для host и для player
// TODO запрет на голосование за один и тот же факт дважды
export const VoteScreen = ({ addVote }: VoteScreenProps) => {
  const { t } = useTranslation();
  const { room } = useGameState();
  const { votingFact } = room || {};
  const [sendVoteForFact, setSendVoteForFact] = useState("");
  const [voteCandidate, setVoteCandidate] = useState<Candidate | null>(null);

  // TODO: если перезагрузить страницу, то можно проголосовать дважды!!! - так не должно быть
  if (sendVoteForFact === votingFact?.id && voteCandidate) {
    return (
      <Flex vertical justify={"center"} align={"center"}>
        {/*TODO: styles*/}
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          {votingFact?.text}
        </Typography.Title>
        <Typography.Title level={4} type={"secondary"}>
          {t("playerVoteScreen.youVoted")}
        </Typography.Title>
        <Flex>
          <PlayerCard player={voteCandidate} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex align={"center"} vertical>
      <Typography.Title level={4} type={"secondary"}>
        {t("playerVoteScreen.title")}
      </Typography.Title>
      {/*TODO: styles*/}
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        {votingFact?.text}
      </Typography.Title>
      <Flex wrap align={"center"} justify={"center"} gap={"large"}>
        {votingFact?.candidates.map((c) => (
          <PlayerCard
            key={c.id}
            player={c}
            onClick={() => {
              addVote(c.id);
              setSendVoteForFact(votingFact?.id);
              setVoteCandidate(c);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
