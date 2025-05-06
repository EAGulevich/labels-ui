import { Button, Flex, Input, Segmented, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { NAME_MAX_LENGTH, ROOM_CODE_LENGTH } from "../../constants.ts";
import { PlayerAvatar } from "../../components/PlayerAvatar/PlayerAvatar.tsx";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../socket.ts";
import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { useSearchParams } from "react-router";

const { Title } = Typography;

const JoinScreen = () => {
  const [searchParams] = useSearchParams();

  const socket = useSocket();

  const [roomCode, setRoomCode] = useState<string>(
    searchParams.get("roomCode") || "",
  );
  const [playerName, setPlayerName] = useState<string>("");

  const { t } = useTranslation();

  const joinHandler = () => {
    socket.emit("joinRoom", {
      roomCode,
      player: {
        id: socket.id || "sdf",
        name: playerName,
        avatarToken: "ROBOT_2",
      },
    });
  };

  const [status, setStatus] = useState<boolean>(false);

  const joinRoom: ServerToClientEvents["joinedPlayer"] = useCallback(() => {
    console.log("joinedPlayer");
    setStatus(true);
  }, []);

  const roomClosed: ServerToClientEvents["roomClosed"] = useCallback(() => {
    console.log("joinedPlayer");
    setStatus(false);
  }, []);

  useEffect(() => {
    socket.off("joinedPlayer", joinRoom).on("joinedPlayer", joinRoom);
    socket.off("roomClosed", roomClosed).on("roomClosed", roomClosed);

    return () => {
      socket.off("createdRoom");
      socket.off("joinedPlayer");
    };
  }, [joinRoom, socket]);

  return (
    <div
      style={{
        minWidth: "320px",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <Flex gap="middle" align="flex-start" vertical>
        <Title level={4}>{t("joinScreen.enterRoomCode")}</Title>
        <Input.OTP
          variant={"outlined"}
          length={ROOM_CODE_LENGTH}
          formatter={(str) => str.toUpperCase()}
          value={roomCode}
          onChange={(value) => {
            setRoomCode(value);
          }}
        />
        <Title level={4}>{t("joinScreen.enterName")}</Title>
        <Input
          showCount
          maxLength={NAME_MAX_LENGTH}
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
        />
        <Title level={4}>{t("joinScreen.chooseAvatar")}</Title>
        <Segmented
          shape={"round"}
          block={false}
          options={[
            { value: "ROBOT_1", icon: <PlayerAvatar token={"ROBOT_1"} /> },
            { value: "ROBOT_2", icon: <PlayerAvatar token={"ROBOT_2"} /> },
            { value: "ROBOT_3", icon: <PlayerAvatar token={"ROBOT_3"} /> },
            { value: "ROBOT_4", icon: <PlayerAvatar token={"ROBOT_4"} /> },
            { value: "ROBOT_5", icon: <PlayerAvatar token={"ROBOT_5"} /> },
            { value: "ROBOT_6", icon: <PlayerAvatar token={"ROBOT_6"} /> },
            { value: "ROBOT_7", icon: <PlayerAvatar token={"ROBOT_7"} /> },
            { value: "ROBOT_8", icon: <PlayerAvatar token={"ROBOT_8"} /> },
            { value: "ROBOT_9", icon: <PlayerAvatar token={"ROBOT_9"} /> },
            // { value: "ROBOT_BOT", icon: <PlayerAvatar token={"ROBOT_BOT"} /> },
          ]}
        />
      </Flex>

      <Button onClick={joinHandler}>Присоединиться</Button>
      {status ? "connected" : "disconnected"}
    </div>
  );
};

export default JoinScreen;
