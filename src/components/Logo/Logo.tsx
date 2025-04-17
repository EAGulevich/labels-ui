import { useEffect } from "react";
import LogoSvg from "../../assets/logoForAnimation.svg?react";
import { startAnimation } from "../../assets/startAnimationLogo.js";
import "./styles.css";

export const Logo = () => {
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div
      style={{
        height: "calc((100vw - 2em) * 0.32)",
        overflow: "hidden",
        width: "calc(100vw - 2em)",
        // filter: "drop-shadow(0 0 4em #61dafbaa)",
        margin: "2em auto",
        border: "1px solid ",
      }}
    >
      <LogoSvg />
    </div>
  );
};
