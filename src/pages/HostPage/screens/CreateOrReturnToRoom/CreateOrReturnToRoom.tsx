import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReloadOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

type CreateOrReturnToRoomProps = {
  onCreateRoom: () => void;
  onReenterRoom?: () => void;
};

export const CreateOrReturnToRoom: FC<CreateOrReturnToRoomProps> = ({
  onCreateRoom,
  onReenterRoom,
}) => {
  const { t } = useTranslation();

  if (typeof onReenterRoom === "function") {
    return (
      <Result
        icon={<ReloadOutlined />}
        title={t("createOrReturnToRoom.returnResult.title")}
        subTitle={t("createOrReturnToRoom.returnResult.subTitle")}
        extra={[
          <Button onClick={onReenterRoom}>
            {t("createOrReturnToRoom.returnResult.buttons.return")}
          </Button>,
          <Button onClick={onCreateRoom}>
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
        <Button onClick={onCreateRoom}>
          {t("createOrReturnToRoom.createResult.buttons.create")}
        </Button>
      }
    />
  );
};
