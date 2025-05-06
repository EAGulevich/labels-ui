import { useCallback, useEffect, useState } from "react";
import { Card, QRCode, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Player } from "../../sharedTypesFromServer/types.ts";
import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { useSocket } from "../../socket.ts";

const CreateRoomScreen = () => {
  const socket = useSocket();
  const { t } = useTranslation();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const joinRoom: ServerToClientEvents["joinedPlayer"] = useCallback((data) => {
    console.log("joinedPlayer");
    setPlayers(() => [...data.room.players]);
  }, []);

  const leaveRoom: ServerToClientEvents["disconnectedPlayer"] = useCallback(
    (data) => {
      console.log("disconnectedPlayer");
      setPlayers(() => [...data.room.players]);
    },
    [],
  );

  useEffect(() => {
    console.log("useEffect");

    // socket.on("connect", () => {
    //   console.log("emit create room");
    //   socket.emit("createRoom");
    // });
    socket.emit("createRoom");

    socket.on("createdRoom", (data) => {
      console.log(data);
      setRoomCode(data.eventData.createdRoom.code);
    });

    socket.off("joinedPlayer", joinRoom).on("joinedPlayer", joinRoom);
    socket
      .off("disconnectedPlayer", leaveRoom)
      .on("disconnectedPlayer", leaveRoom);

    return () => {
      socket.off("createdRoom");
      socket.off("joinedPlayer");
    };
  }, [joinRoom, socket]);

  return (
    <div>
      <Card style={{ margin: "20px" }}>
        <div>
          <Typography.Text>
            {t("createRoomScreen.joinLinkText", {
              link: "game-labels.vercel.app",
            })}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text>{t("createRoomScreen.enterCode")}</Typography.Text>
        </div>
        <Typography.Text>{roomCode}</Typography.Text>
        <QRCode
          value={`https://game-labels.vercel.app/join?roomCode=${roomCode}`}
          icon="https://game-labels.vercel.app/icon.svg"
        />
        <Typography.Text>{t("createRoomScreen.scan")}</Typography.Text>
      </Card>
      <Card>
        <Typography.Text>Игроки: </Typography.Text>
        {players.map((player) => player.name)}
      </Card>
    </div>
  );
};

export default CreateRoomScreen;
