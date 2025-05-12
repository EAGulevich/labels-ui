import { JoinScreen } from "./screens/JoinScreen/JoinScreen.tsx";
import { useSocketEvents } from "./useSocketEvents/useSocketEvents.tsx";

const PlayerPage = () => {
  const { room, contextHolder } = useSocketEvents();

  return (
    <>
      {contextHolder}
      {!room && <JoinScreen />}
      {!!room && <div> connected </div>}
    </>
  );
};

export default PlayerPage;
