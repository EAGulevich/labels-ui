import { useEffect } from "react";

import { startAnimation } from "@assets/homeLogo/_startAnimationLogo";
import LogoSvg from "@assets/homeLogo/logoForAnimation.svg?react";

import { LogoWrapper } from "./styles.ts";

export const MainAnimatedLogo = () => {
  useEffect(() => {
    startAnimation();
  });

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
