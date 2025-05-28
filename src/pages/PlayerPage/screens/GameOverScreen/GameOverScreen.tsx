import { useTranslation } from "react-i18next";
import { Flex, Typography } from "antd";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { Room } from "@sharedTypes/types.ts";

type GameOverScreenProps = {
  room: Room;
};

export const GameOverScreen = ({ room }: GameOverScreenProps) => {
  const { t } = useTranslation();
  return (
    <Flex vertical justify="center" align="center">
      <Typography.Title level={2}>{t("gameOverScreen.title")}</Typography.Title>
      {/*TODO: добавить текс для этого экрана*/}
      {/*<div>*/}
      {/*  Игра завершена, можете поделиться подробностями про свой факт/свою*/}
      {/*  характеристику или сыграть еще раз. Победитель/Победители: // TODO:*/}
      {/*  Победитель 1, если в конце отгадали 2-х, один из которых фейк. Фейка*/}
      {/*  надо исключить из списка*/}
      {/*</div>*/}
      <Flex wrap>
        {room.story[room.round - 1].map((id) => {
          const player = room.players.find((p) => p.id === id);
          return player ? <PlayerCard player={player} /> : player;
        })}
      </Flex>
    </Flex>
  );
};
