export const getPlayerPoints = ({
  playersLength,
  index,
}: {
  playersLength: number;
  index: number;
}) => {
  return (playersLength - 1 - index) * 2;
};

export const getPointsByRound = ({ round }: { round: number }) => {
  return round * 3;
};
// TODO вынести
