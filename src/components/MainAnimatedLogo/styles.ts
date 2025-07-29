import styled, { keyframes } from "styled-components";

const SVG_PATH_IDS = {
  letter_L_id: "eap9rCg3KAe10",
  letter_A_id: "eap9rCg3KAe9",
  letter_B_id: "eap9rCg3KAe8",
  letter_E_id: "eap9rCg3KAe7",
  letter_L2_id: "eap9rCg3KAe6",
  letter_S_id: "eap9rCg3KAe5",
  label_id: "eap9rCg3KAe3",
};

const DROP_SHADOW_BLUR = 10;
const DROP_SHADOW_LENGTH = 1;

// <-- fix for letter E
const DROP_SHADOW_BLUR_FOR_E = 3 * DROP_SHADOW_BLUR;
const DROP_SHADOW_LENGTH_FOR_E = 2 * DROP_SHADOW_LENGTH;
// fix for E -->

export const ANIMATION_DELAY = 3;
const ANIMATION_DURATION = 0.5;
const ANIMATION_STEP_DELAY = ANIMATION_DURATION / 7;

const backlightAnimation = (
  length: number,
  blur: number,
  color: string,
) => keyframes`
  0% {
      filter: drop-shadow(0 0 0 ${color});
  }
  50% {
      filter: drop-shadow(${length}px ${length}px ${blur}px ${color})
              drop-shadow(-${length}px -${length}px ${blur}px ${color});
  }
  100% {
      filter: drop-shadow(0 0 0 ${color});
  }
`;

export const LogoWrapper = styled.div`
  overflow: hidden;

  width: 100%;
  aspect-ratio: 960 / 440;

  filter: drop-shadow(0 0 0 ${({ theme }) => theme.token.colorPrimary});

  svg {
    path[id="eap9rCg3KAe5"],
    path[id="eap9rCg3KAe6"],
    path[id="eap9rCg3KAe7"],
    path[id="eap9rCg3KAe8"],
    path[id="eap9rCg3KAe9"],
    path[id="eap9rCg3KAe10"],
    path[id="eap9rCg3KAe3"] {
      fill: ${({ theme }) => theme.token.colorTextBase};

      animation: ${ANIMATION_DURATION}s
        ${({ theme }) =>
          backlightAnimation(
            DROP_SHADOW_LENGTH,
            DROP_SHADOW_BLUR,
            theme.themeName === "dark"
              ? theme.token.colorWhite
              : theme.token.colorPrimary,
          )}
        normal;
    }

    path[id=${SVG_PATH_IDS.letter_L_id}] {
      animation-delay: ${ANIMATION_DELAY}s;
    }
    path[id=${SVG_PATH_IDS.letter_A_id}] {
      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY}s;
    }
    path[id=${SVG_PATH_IDS.letter_B_id}] {
      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY * 2}s;
    }
    path[id=${SVG_PATH_IDS.letter_E_id}] {
      // <-- fix for E
      animation: ${ANIMATION_DURATION}s
        ${({ theme }) =>
          backlightAnimation(
            DROP_SHADOW_LENGTH_FOR_E,
            DROP_SHADOW_BLUR_FOR_E,
            theme.themeName === "dark"
              ? theme.token.colorWhite
              : theme.token.colorPrimary,
          )}
        normal;
      // fix for E -->

      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY * 3}s;
    }
    path[id=${SVG_PATH_IDS.letter_L2_id}] {
      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY * 4}s;
    }
    path[id=${SVG_PATH_IDS.letter_S_id}] {
      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY * 5}s;
    }
    path[id=${SVG_PATH_IDS.label_id}] {
      animation-delay: ${ANIMATION_DELAY + ANIMATION_STEP_DELAY * 5.5}s;
    }
  }
`;
