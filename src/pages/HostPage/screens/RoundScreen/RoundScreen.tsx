import { FACT_STATUSES } from "@shared/types";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

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
    (p) => p.factStatus === FACT_STATUSES.NOT_GUESSED,
  ).length;

  return (
    <>
      <Footer
        startTimer={!room.votingData && !isAllGuessed}
        onTimerFinish={onTimerFinish}
      />
      <FactsGrid />
      <VotingModalContent />
    </>
  );
};
