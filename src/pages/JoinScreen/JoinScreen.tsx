import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { NAME_MAX_LENGTH, ROOM_CODE_LENGTH } from "../../constants.ts";
import { PlayerAvatar } from "../../components/PlayerAvatar/PlayerAvatar.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { message } from "antd";

import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { useSearchParams } from "react-router";
import { socket } from "../../socket.ts";
import { Room } from "../../sharedTypesFromServer/types.ts";
import { AvatarToken } from "../../sharedTypesFromServer/avatarTokens.ts";
import { SAvatarDropdownOverlay } from "./styles.ts";
import { RobotOutlined } from "@ant-design/icons";
import { avatarItems } from "./avatarItems.tsx";
const { Title } = Typography;

const JoinScreen = () => {
  const [searchParams] = useSearchParams();
  const [roomCode, setRoomCode] = useState<string>(
    searchParams.get("roomCode") || "",
  );

  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const [room, setRoom] = useState<Room | null>(null);
  const [joiningError, setJoiningError] = useState<{ message: string } | null>(
    null,
  );

  const [playerName, setPlayerName] = useState<string>("");
  const [playerAvatarToken, setPlayerAvatarToken] = useState<
    AvatarToken | undefined
  >();

  const items: MenuProps["items"] = useMemo(
    () =>
      avatarItems.map((item) => ({
        ...item,
        onClick: () => setPlayerAvatarToken(item.key),
      })),
    [],
  );

  const joinHandler = () => {
    if (playerName && playerAvatarToken) {
      socket.emit("joinRoom", {
        roomCode,
        player: {
          name: playerName,
          avatarToken: playerAvatarToken,
        },
      });
    }
  };

  const joinRoom: ServerToClientEvents["joinedPlayer"] = useCallback(
    (data) => {
      setRoom(data.room);

      console.log("joinedPlayer");
      setJoiningError(null);
      messageApi.open({
        type: "success",
        content: t("joinScreen.messages.youEnteredInRoom"),
      });
    },
    [t, messageApi],
  );

  const creatorWasDisconnect: ServerToClientEvents["creatorWasDisconnect"] =
    useCallback(
      (data) => {
        setRoom(data.room);
        // TODO: эвент с сервера, что комната удалена, т.к. хост не переподключился
        messageApi.open({
          key: data.room.code,
          type: "loading",
          content: t("joinScreen.messages.reconnecting"),
          duration: 10000,
        });
      },
      [messageApi, t],
    );

  const creatorWasConnected: ServerToClientEvents["creatorWasConnected"] =
    useCallback(
      (data) => {
        setRoom(data.room);
        messageApi.open({
          key: data.room.code,
          type: "success",
          content: t("joinScreen.messages.reconnected"),
          duration: 2,
        });
      },
      [t, messageApi],
    );

  const disconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] =
    useCallback((data) => {
      setRoom(data.room);
    }, []);

  const joiningPlayerError: ServerToClientEvents["joiningPlayerError"] =
    useCallback(
      (err) => {
        setJoiningError(err);
        setRoom(null);

        messageApi.open({
          type: "error",
          content: t("joinScreen.messages.wrongRoomCode"),
        });
      },
      [t, messageApi],
    );

  useEffect(() => {
    socket.on("joinedPlayer", joinRoom);
    socket.on("joiningPlayerError", joiningPlayerError);

    socket.on("creatorWasDisconnect", creatorWasDisconnect);
    socket.on("creatorWasConnected", creatorWasConnected);

    socket.on("disconnectedPlayer", disconnectedPlayer);

    return () => {
      socket.off("joinedPlayer", joinRoom);
      socket.off("creatorWasDisconnect", creatorWasDisconnect);
      socket.off("creatorWasConnected", creatorWasConnected);
      socket.off("disconnectedPlayer", disconnectedPlayer);
      socket.off("joiningPlayerError", joiningPlayerError);
    };
  }, [
    socket,
    joinRoom,
    creatorWasDisconnect,
    creatorWasConnected,
    disconnectedPlayer,
    joiningPlayerError,
  ]);

  return (
    <div
      style={{
        minWidth: "320px",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      {contextHolder}
      <Flex gap="middle" align="flex-start" vertical>
        <Title level={4}>{t("joinScreen.enterRoomCode")}</Title>
        <Input.OTP
          variant={"outlined"}
          length={ROOM_CODE_LENGTH}
          formatter={(str) => str.toUpperCase()}
          status={joiningError ? "error" : ""}
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
        <Dropdown
          trigger={["click"]}
          menu={{ items }}
          dropdownRender={(originNode) => (
            <SAvatarDropdownOverlay>{originNode}</SAvatarDropdownOverlay>
          )}
        >
          <Button
            size={"large"}
            type="dashed"
            shape="circle"
            icon={
              playerAvatarToken ? (
                <PlayerAvatar token={playerAvatarToken} />
              ) : (
                <Avatar size={40} icon={<RobotOutlined />} />
              )
            }
          />
        </Dropdown>
      </Flex>

      <Button onClick={joinHandler}>{t("joinScreen.buttons.enter")}</Button>
      {room ? "connected" : "disconnected"}
    </div>
  );
};

export default JoinScreen;
