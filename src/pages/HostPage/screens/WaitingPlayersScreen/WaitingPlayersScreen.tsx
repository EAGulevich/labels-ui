import { Col, Row } from "antd";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { InviteBlock } from "./parts/InviteBlock/InviteBlock.tsx";
import { PlayersBlock } from "./parts/PlayersBlock/PlayersBlock.tsx";

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
        <InviteBlock roomCode={room.code} />
      </Col>
      <Col span={10}>
        <PlayersBlock
          players={room.players.filter((p) => !p.isFake)}
          showCountDown={showCountDown}
        />
      </Col>
    </Row>
  );
};
