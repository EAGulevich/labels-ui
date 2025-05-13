import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReloadOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

import { socket } from "@socket";

type CreateOrReturnToRoomProps = {
  hostId: string | null;
};

export const CreateOrReturnToRoom: FC<CreateOrReturnToRoomProps> = ({
  hostId,
}) => {
  const { t } = useTranslation();

  if (hostId) {
    return (
      <Result
        icon={<ReloadOutlined />}
        title={t("createOrReturnToRoom.returnResult.title")}
        subTitle={t("createOrReturnToRoom.returnResult.subTitle")}
        extra={[
          <Button
            onClick={() => {
              socket.emit("createRoom", hostId);
            }}
          >
            {t("createOrReturnToRoom.returnResult.buttons.return")}
          </Button>,
          <Button
            onClick={() => {
              socket.emit("createRoom", null);
            }}
          >
            {t("createOrReturnToRoom.returnResult.buttons.createNew")}
          </Button>,
        ]}
      />
    );
  }

  return (
    <Result
      icon={<UsergroupAddOutlined />}
      title={t("createOrReturnToRoom.createResult.title")}
      subTitle={t("createOrReturnToRoom.createResult.subTitle")}
      extra={
        <Button
          onClick={() => {
            socket.emit("createRoom", null);
          }}
        >
          {t("createOrReturnToRoom.createResult.buttons.create")}
        </Button>
      }
    />
  );
};
