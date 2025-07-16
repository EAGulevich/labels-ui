export const getPlayerPoints = ({
  players,
  index,
}: {
  players: unknown[];
  index: number;
}) => {
  return (players.length - 1 - index) * 2;
};

export const getPointsByRound = ({ round }: { round: number }) => {
  return round * 3;
};
