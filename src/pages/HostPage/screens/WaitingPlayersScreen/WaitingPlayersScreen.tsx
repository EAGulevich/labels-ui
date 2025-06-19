import { Row } from "antd";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { InviteBlock } from "./parts/InviteBlock/InviteBlock.tsx";
import { PlayersBlock } from "./parts/PlayersBlock/PlayersBlock.tsx";
import { WrapperInviteBlock, WrapperPlayersBlock } from "./styles.ts";

export const WaitingPlayersScreen = () => {
  const { room } = useGameState();

  if (!room) {
    return <ErrorFallback />;
  }

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
