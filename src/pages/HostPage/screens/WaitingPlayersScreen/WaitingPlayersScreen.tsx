import { Col, Row } from "antd";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { InviteBlock } from "./parts/InviteBlock/InviteBlock.tsx";
import { PlayersBlock } from "./parts/PlayersBlock/PlayersBlock.tsx";
import { WrapperInviteBlock, WrapperPlayersBlock } from "./styles.ts";

export const WaitingPlayersScreen = ({
  showCountDown,
}: {
  showCountDown: boolean;
}) => {
  const { room } = useGameState();

  if (!room) {
    return <ErrorFallback />;
  }

  return (
    <Row justify={"center"}>
      <Col span={10}>
        <WrapperInviteBlock>
          <InviteBlock roomCode={room.code} />
        </WrapperInviteBlock>
      </Col>
      <Col span={10}>
        <WrapperPlayersBlock>
          <PlayersBlock
            players={room.players.filter((p) => !p.isFake)}
            showCountDown={showCountDown}
          />
        </WrapperPlayersBlock>
      </Col>
    </Row>
  );
};
