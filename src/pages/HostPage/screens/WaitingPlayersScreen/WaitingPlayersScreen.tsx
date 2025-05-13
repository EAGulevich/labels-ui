import { FC } from "react";
import { Row } from "antd";

import { Room } from "@sharedTypes/types.ts";

import { InviteBlock } from "./parts/InviteBlock/InviteBlock.tsx";
import { PlayersBlock } from "./parts/PlayersBlock/PlayersBlock.tsx";
import { WrapperInviteBlock, WrapperPlayersBlock } from "./styles.ts";

type WaitingPlayersScreenProps = {
  room: Room;
};
export const WaitingPlayersScreen: FC<WaitingPlayersScreenProps> = ({
  room,
}) => {
  return (
    <>
      <Row justify={"center"}>
        <WrapperInviteBlock>
          <InviteBlock roomCode={room.code} />
        </WrapperInviteBlock>
        <WrapperPlayersBlock>
          <PlayersBlock players={room.players} />
        </WrapperPlayersBlock>
      </Row>
    </>
  );
};
