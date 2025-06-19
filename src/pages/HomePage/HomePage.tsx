import { useEffect } from "react";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  const { setRoom } = useGameState();

  useEffect(() => {
    socket.disconnect();
    setRoom(null);
  }, [setRoom]);

  return (
    <>
      <MainAnimatedLogo />
      <AnimatedMenuList />
    </>
  );
};

export default HomePage;
