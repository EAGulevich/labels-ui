import { PlayerAvatar } from "../../../../components/PlayerAvatar/PlayerAvatar.tsx";
import { AvatarToken } from "../../../../sharedTypesFromServer/avatarTokens.ts";
import { ReactElement } from "react";

export const avatarItems: { key: AvatarToken; label: ReactElement }[] = [
  {
    key: "ROBOT_1",
    label: <PlayerAvatar token={"ROBOT_1"} />,
  },
  {
    key: "ROBOT_2",
    label: <PlayerAvatar token={"ROBOT_2"} />,
  },
  {
    key: "ROBOT_3",
    label: <PlayerAvatar token={"ROBOT_3"} />,
  },
  {
    key: "ROBOT_4",
    label: <PlayerAvatar token={"ROBOT_4"} />,
  },
  {
    key: "ROBOT_5",
    label: <PlayerAvatar token={"ROBOT_5"} />,
  },
  {
    key: "ROBOT_6",
    label: <PlayerAvatar token={"ROBOT_6"} />,
  },
  {
    key: "ROBOT_7",
    label: <PlayerAvatar token={"ROBOT_7"} />,
  },
  {
    key: "ROBOT_8",
    label: <PlayerAvatar token={"ROBOT_8"} />,
  },
  {
    key: "ROBOT_9",
    label: <PlayerAvatar token={"ROBOT_9"} />,
  },
];
