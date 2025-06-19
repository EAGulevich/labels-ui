import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";

import { FactsGrid } from "./parts/FactsGrid/FactsGrid.tsx";
import { Footer } from "./parts/Footer/Footer.tsx";
import { VotingModalContent } from "./parts/VotingModalContent/VotingModalContent.tsx";

type RoundScreenProps = {
  onTimerFinish: () => void;
};

export const RoundScreen = ({ onTimerFinish }: RoundScreenProps) => {
  const { room } = useGameState();

  if (!room) {
    return <ErrorFallback />;
  }

  const isAllGuessed = !room.players.filter(
    (p) => p.factStatus === FACT_STATUS.NOT_GUESSED,
  ).length;

  return (
    <>
      <Footer
        startTimer={!room.votingFact && !isAllGuessed}
        onTimerFinish={onTimerFinish}
      />
      <FactsGrid facts={room.facts} />
      {room.votingFact && <VotingModalContent />}
    </>
  );
};
