import { JoinScreen } from "./screens/JoinScreen/JoinScreen.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const PlayerPage = () => {
  const { room, contextHolder } = useSocketEvents();

  return (
    <>
      {contextHolder}
      {!room && <JoinScreen />}
      {!!room && <WaitingPlayersScreen />}
    </>
  );
};

export default PlayerPage;
