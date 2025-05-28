import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { Fact, Player as Candidate, Room } from "@sharedTypes/types.ts";

import { FactsGrid } from "./parts/FactsGrid/FactsGrid.tsx";
import { Footer } from "./parts/Footer/Footer.tsx";
import { VotingModalContent } from "./parts/VotingModalContent/VotingModalContent.tsx";

type RoundScreenProps = {
  roomStatus: Room["status"];
  players: Candidate[];
  facts: Fact[];
  votingFact?: Room["votingFact"];
  onTimerFinish: () => void;
  round: Room["round"];
  story: Room["story"];
};

export const RoundScreen = ({
  facts,
  votingFact,
  players,
  onTimerFinish,
  round,
  story,
}: RoundScreenProps) => {
  const isAllGuessed = !players.filter(
    (p) => p.factStatus === FACT_STATUS.NOT_GUESSED,
  ).length;
  return (
    <>
      <Footer
        players={players}
        startTimer={!votingFact && !isAllGuessed}
        onTimerFinish={onTimerFinish}
        round={round}
      />
      <FactsGrid facts={facts} />
      {votingFact && (
        <VotingModalContent
          votingFact={votingFact}
          facts={facts}
          round={round}
          story={story}
          players={players}
        />
      )}
    </>
  );
};
