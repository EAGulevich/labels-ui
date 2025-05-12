import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Flex,
  QRCode,
  Skeleton,
  Statistic,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { ServerToClientEvents } from "../../sharedTypesFromServer/events.ts";
import { socket } from "../../socket.ts";
import { SESSION_CREATOR_ID_FILED_NAME } from "../../constants.ts";
import { Room } from "../../sharedTypesFromServer/types.ts";
import { PlayerAvatar } from "../../components/PlayerAvatar/PlayerAvatar.tsx";
import { PlayerInfo, PlayersGrid, StyledBlock, StyledTag } from "./styles.ts";
import { useTheme } from "styled-components";

const CreateRoomScreen = () => {
  const { token } = useTheme();
  const [creatorId, setCreatorId] = useState(
    sessionStorage.getItem(SESSION_CREATOR_ID_FILED_NAME),
  );
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const onCreatedRoom: ServerToClientEvents["createdRoom"] = (data) => {
      sessionStorage.setItem(
        SESSION_CREATOR_ID_FILED_NAME,
        data.eventData.createdRoom.creatorId,
      );
      setRoom(data.room);
    };

    const onCreatingRoomError: ServerToClientEvents["creatingRoomError"] =
      () => {
        sessionStorage.setItem(SESSION_CREATOR_ID_FILED_NAME, "");
        setCreatorId(null);
      };

    const onJoinedPlayer: ServerToClientEvents["joinedPlayer"] = (data) => {
      setRoom(data.room);
    };

    const onDisconnectedPlayer: ServerToClientEvents["disconnectedPlayer"] = (
      data,
    ) => {
      setRoom(data.room);
    };

    socket.on("createdRoom", onCreatedRoom);
    socket.on("creatingRoomError", onCreatingRoomError);
    socket.on("joinedPlayer", onJoinedPlayer);
    socket.on("disconnectedPlayer", onDisconnectedPlayer);

    return () => {
      socket.off("createdRoom", onCreatedRoom);
      socket.off("creatingRoomError", onCreatingRoomError);
      socket.off("joinedPlayer", onJoinedPlayer);
      socket.off("disconnectedPlayer", onDisconnectedPlayer);
    };
  }, []);

  if (!room) {
    return (
      <>
        {creatorId && (
          <Button
            onClick={() => {
              socket.emit("createRoom", creatorId);
            }}
          >
            Вернуться в игру
          </Button>
        )}

        <Button
          onClick={() => {
            socket.emit("createRoom", null);
            // TODO отправить эвенет на удаление старой комнаты
          }}
        >
          Создать комнату
        </Button>
      </>
    );
  }

  return (
    <Flex vertical justify={"space-between"} gap={"large"}>
      <Flex justify="space-between" gap={"large"}>
        <Card style={{ minWidth: "40%", textAlign: "center" }}>
          <StyledBlock>
            <Typography.Title level={4}>
              {t("createRoomScreen.joinLinkText")}:{" "}
            </Typography.Title>
            <Typography.Title level={2} code>
              GAME-LABELS.VERCEL.APP
            </Typography.Title>
          </StyledBlock>
          <StyledBlock>
            <Typography.Title level={4}>
              {t("createRoomScreen.enterCode")}:{" "}
            </Typography.Title>
            <Typography.Title level={2}>
              <StyledTag color="gold">{room?.code}</StyledTag>
            </Typography.Title>
          </StyledBlock>
          <Flex align={"center"} vertical style={{ margin: "50px" }}>
            <QRCode
              value={`${window.location.origin}/join?roomCode=${room?.code}`}
            />
            <Typography.Text>{t("createRoomScreen.scan")}</Typography.Text>
          </Flex>
        </Card>
        <Card style={{ width: "100%" }}>
          <StyledBlock>
            <Statistic
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
              valueStyle={{
                color: room?.players.length > 4 ? "inherit" : token.colorError,
              }}
              title={
                <Typography.Title level={4} type={"secondary"}>
                  {t("createRoomScreen.players")}
                </Typography.Title>
              }
              value={room?.players.length}
              suffix="/ 9"
            />
            <PlayersGrid>
              <Card className="place decorative decorative_1" />
              <Card className="place decorative decorative_2" />
              <Card className="place decorative decorative_3" />
              <Card className="place decorative decorative_4" />
              <Card size={"small"} className="place decorative decorative_5" />
              <Card className="place decorative decorative_6" />
              <Card className="place decorative decorative_7" />
              {room?.players.map((player) => (
                <Badge.Ribbon
                  text={"VIP"}
                  key={player.name}
                  color={"gold"}
                  placement={"start"}
                  style={{ display: player.isVip ? "block" : "none" }}
                >
                  <Card key={player.name} size={"small"} className="place">
                    <PlayerInfo>
                      <Flex vertical style={{ width: "100%", height: "100%" }}>
                        <Flex
                          style={{ width: "100%", height: "50%" }}
                          align={"center"}
                          justify={"center"}
                        >
                          <PlayerAvatar token={player.avatarToken} />
                        </Flex>
                        <Flex
                          style={{ width: "100%", height: "50%" }}
                          align={"center"}
                          justify={"center"}
                        >
                          <Typography.Text>{player.name}</Typography.Text>
                        </Flex>
                      </Flex>
                    </PlayerInfo>
                  </Card>
                </Badge.Ribbon>
              ))}
              {Array(9 - room?.players.length)
                .fill(1)
                .map(() => (
                  <Skeleton.Node
                    className="empty"
                    active={true}
                  ></Skeleton.Node>
                ))}
            </PlayersGrid>
          </StyledBlock>
        </Card>
      </Flex>
      <Flex justify={"center"}>
        {/*TODO: логика для кнопки*/}
        <Button type={"dashed"} disabled>
          {t("createRoomScreen.buttons.exit")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateRoomScreen;
