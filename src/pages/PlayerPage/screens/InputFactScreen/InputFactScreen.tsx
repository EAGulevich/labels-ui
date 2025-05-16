import { Progress } from "antd";
import { useTheme } from "styled-components";

import { Player } from "@sharedTypes/types.ts";

type InputFactScreenProps = {
  players: Player[];
};

export const InputFactScreen = ({ players }: InputFactScreenProps) => {
  const { token } = useTheme();

  // TODO: экрны игроков в отдельный лейаут с ограничением ширины

  return (
    <div>
      <div>
        В разработке: здесь игрок будет вводить факт И видеть прогресс, скольких
        игроков надо еще ждать
        <Progress
          type="dashboard"
          percent={(4 / players.length) * 100}
          format={(percent) => (percent === 100 ? undefined : "3/4")}
          steps={{ count: players.length, gap: 2 }}
          trailColor={token.colorBgContainer}
          strokeWidth={16}
        />
      </div>
    </div>
  );
};
