import { CreateOrReturnToRoom } from "./screens/CreateOrReturnToRoom/CreateOrReturnToRoom.tsx";
import { WaitingPlayersScreen } from "./screens/WaitingPlayersScreen/WaitingPlayersScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const HostPage = () => {
  const { room, creatorId } = useSocketEvents();

  return (
    <>
      {!room && <CreateOrReturnToRoom hostId={creatorId} />}
      {!!room && <WaitingPlayersScreen room={room} />}
    </>
  );
};

export default HostPage;
