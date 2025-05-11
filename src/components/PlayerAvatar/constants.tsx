import { ReactElement } from "react";
import Robot_1_Svg from "../../assets/avatars/robot_1.svg?react";
import Robot_2_Svg from "../../assets/avatars/robot_2.svg?react";
import Robot_3_Svg from "../../assets/avatars/robot_3.svg?react";
import Robot_4_Svg from "../../assets/avatars/robot_4.svg?react";
import Robot_5_Svg from "../../assets/avatars/robot_5.svg?react";
import Robot_6_Svg from "../../assets/avatars/robot_6.svg?react";
import Robot_7_Svg from "../../assets/avatars/robot_7.svg?react";
import Robot_9_Svg from "../../assets/avatars/robot_9.svg?react";
import Robot_8_Svg from "../../assets/avatars/robot_8.svg?react";
import Robot_bot_Svg from "../../assets/avatars/robot_bot.svg?react";
import {
  AvatarToken,
  AvatarTokenBot,
} from "../../sharedTypesFromServer/avatarTokens.ts";

export const AVATARS: {
  [key in AvatarToken | AvatarTokenBot]: {
    background: string;
    icon: ReactElement;
  };
} = {
  ROBOT_1: {
    background:
      "radial-gradient(circle,rgba(146, 11, 58, 1) 0%, rgba(248, 113, 160, 1) 100%)",
    icon: <Robot_1_Svg fill={"#FDD0DF"} />,
  },
  ROBOT_2: {
    background:
      "radial-gradient(circle,rgba(14, 138, 170, 1) 0%, rgba(6, 183, 219, 1) 100%)",
    icon: <Robot_2_Svg fill={"#C3F4FD"} />,
  },
  ROBOT_3: {
    background:
      "radial-gradient(circle,rgba(147, 99, 22, 1) 0%, rgba(247, 183, 80, 1) 100%)",
    icon: <Robot_3_Svg fill={"#FDEDD3"} />,
  },
  ROBOT_4: {
    background:
      "radial-gradient(circle,rgba(9, 80, 40, 1) 0%, rgba(18, 161, 80, 1) 100%)",
    icon: <Robot_4_Svg fill={"#D1F4E0"} />,
  },
  ROBOT_5: {
    background:
      "radial-gradient(circle,rgba(49, 4, 19, 1) 0%, rgba(97, 7, 38, 1) 100%)",
    icon: <Robot_5_Svg fill={"#FAA0BF"} />,
  },
  ROBOT_6: {
    background:
      "radial-gradient(circle,rgba(72, 24, 120, 1) 0%, rgba(147, 83, 211, 1) 100%)",
    icon: <Robot_6_Svg fill={"#E4D4F4"} />,
  },
  ROBOT_7: {
    background:
      "radial-gradient(circle,rgba(0, 46, 98, 1) 0%, rgba(0, 111, 238, 1) 100%)",
    icon: <Robot_7_Svg fill={"#CCE3FD"} />,
  },
  ROBOT_8: {
    background:
      "radial-gradient(circle,rgba(49, 33, 7, 1) 0%, rgba(147, 99, 22, 1) 100%)",
    icon: <Robot_8_Svg fill={"#e1c9a0"} />,
  },
  ROBOT_9: {
    background:
      "radial-gradient(circle,rgba(173, 33, 2, 1) 0%, rgba(255, 156, 110, 1) 100%)",
    icon: <Robot_9_Svg fill={"#ffbb96"} />,
  },
  ROBOT_BOT: {
    background:
      "radial-gradient(circle,rgba(113, 113, 122, 1) 0%, rgba(63, 63, 70, 1) 100%)",
    icon: <Robot_bot_Svg />,
  },
};
