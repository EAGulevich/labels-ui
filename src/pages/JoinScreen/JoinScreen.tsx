import { Button, Card, Form, FormProps, Input } from "antd";
import { useTranslation } from "react-i18next";
import { NAME_MAX_LENGTH, ROOM_CODE_LENGTH } from "../../constants.ts";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";

import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { useSearchParams } from "react-router";
import { socket } from "../../socket.ts";
import { Player, Room } from "../../sharedTypesFromServer/types.ts";
import { AvatarToken } from "../../sharedTypesFromServer/avatarTokens.ts";
import { AvatarSelect } from "./parts/AvatarSelect/AvatarSelect.tsx";

type FieldType = {
  name?: string;
  avatarToken?: AvatarToken;
  roomCode?: string;
};

const JoinScreen = () => {
  const [searchParams] = useSearchParams();
  const [roomCode] = useState<string>(searchParams.get("roomCode") || "");

  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const [room, setRoom] = useState<Room | null>(null);

  const joinHandler = ({
    code,
    name,
    avatarToken,
  }: Pick<Player, "name" | "avatarToken"> & Pick<Room, "code">) => {
    socket.emit("joinRoom", {
      roomCode: code,
      player: {
        name: name,
        avatarToken: avatarToken,
      },
    });
  };

  const joinRoom: ServerToClientEvents["joinedPlayer"] = useCallback(
    (data) => {
      setRoom(data.room);

      console.log("joinedPlayer");
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
    useCallback(() => {
      setRoom(null);
      messageApi.open({
        type: "error",
        content: t("joinScreen.messages.wrongRoomCode"),
      });
    }, [t, messageApi]);

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
    joinRoom,
    creatorWasDisconnect,
    creatorWasConnected,
    disconnectedPlayer,
    joiningPlayerError,
  ]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (!!values.avatarToken && values.name && values.roomCode) {
      joinHandler({
        avatarToken: values.avatarToken,
        name: values.name,
        code: values.roomCode,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card>
      {contextHolder}
      <Form
        name="playerInfo"
        layout={"vertical"}
        variant={"outlined"}
        initialValues={{ roomCode: roomCode }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={t("joinScreen.form.fields.roomCode.label")}
          name="roomCode"
          rules={[
            {
              required: true,
              message: t("joinScreen.form.fields.roomCode.errors.required"),
            },
          ]}
        >
          <Input.OTP
            length={ROOM_CODE_LENGTH}
            formatter={(str) => str.toUpperCase()}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("joinScreen.form.fields.avatar.label")}
          name="avatarToken"
          rules={[
            {
              required: true,
              message: t("joinScreen.form.fields.avatar.errors.required"),
            },
          ]}
        >
          <AvatarSelect />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("joinScreen.form.fields.name.label")}
          name="name"
          rules={[
            {
              required: true,
              max: NAME_MAX_LENGTH,
              message: t("joinScreen.form.fields.name.errors.required"),
            },
          ]}
        >
          <Input showCount maxLength={NAME_MAX_LENGTH} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {t("joinScreen.buttons.enter")}
          </Button>
        </Form.Item>
      </Form>

      {room ? "connected" : "disconnected"}
    </Card>
  );
};

export default JoinScreen;
