import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReloadOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Result, Row } from "antd";

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
      <Row style={{ width: "100%" }} justify={"center"}>
        <Col span={20}>
          <Result
            icon={<ReloadOutlined />}
            title={t("createOrReturnToRoom.returnResult.title")}
            subTitle={t("createOrReturnToRoom.returnResult.subTitle")}
            extra={[
              <Flex key={"actions"} gap={"large"} justify={"center"}>
                <Button key={"create"} onClick={onReenterRoom} type={"primary"}>
                  {t("createOrReturnToRoom.returnResult.buttons.return")}
                </Button>
                <Button key={"return"} onClick={onCreateRoom}>
                  {t("createOrReturnToRoom.returnResult.buttons.createNew")}
                </Button>
              </Flex>,
            ]}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Row style={{ width: "100%" }} justify={"center"}>
      <Col span={20}>
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
      </Col>
    </Row>
  );
};
