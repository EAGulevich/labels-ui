import { Fact, Player as Candidate } from "@sharedTypes/types.ts";

import { FactsGrid } from "./parts/FactsGrid/FactsGrid.tsx";
import { Footer } from "./parts/Footer/Footer.tsx";
import { VotingModalContent } from "./parts/VotingModalContent/VotingModalContent.tsx";

type RoundScreenProps = {
  players: Candidate[];
  facts: Fact[];
  votingFact?: {
    text: string;
    candidates: (Candidate & { votes: number })[];
  };
};

export const RoundScreen = ({
  facts,
  votingFact,
  players,
}: RoundScreenProps) => {
  return (
    <>
      {/*TODO adaptive нет скролла и 1 колонка для маленьких экранов*/}
      <FactsGrid facts={facts} />
      {votingFact && <VotingModalContent votingFact={votingFact} />}
      <Footer players={players} />
    </>
  );
};
