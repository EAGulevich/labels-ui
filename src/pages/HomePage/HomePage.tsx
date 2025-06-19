import { useEffect } from "react";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  useEffect(() => {
    socket.disconnect();
  }, []);

  return (
    <>
      <MainAnimatedLogo />
      <AnimatedMenuList />
    </>
  );
};

export default HomePage;
