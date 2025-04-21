import { useEffect } from "react";
import LogoSvg from "../../assets/logoForAnimation.svg?react";
import { startAnimation } from "../../assets/_startAnimationLogo.js";
import { LogoWrapper } from "./styles.ts";

export const Logo = () => {
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
  );
};
