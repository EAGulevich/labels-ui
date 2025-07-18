import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Col, Flex, QRCode, Row, Typography } from "antd";

import { QUERY_PARAM_ROOM_CODE, ROUTE_PATHS } from "@constants";

import { StyledTag, StyledTitle } from "./styles.ts";

type InviteBlockProps = {
  roomCode: string;
};

export const InviteBlock: FC<InviteBlockProps> = ({ roomCode }) => {
  const { t } = useTranslation();

  const host = window.location.host;

  const qrLink = window.location.origin + ROUTE_PATHS.player;
  const qrLinkParams = `${QUERY_PARAM_ROOM_CODE}=${roomCode}`;
  const qrValue = `${qrLink}?${qrLinkParams}`;

  return (
    <Row justify={"center"} align={"middle"} gutter={[0, 20]}>
      <Col span={24}>
        <Flex vertical gap={"small"}>
          <StyledTitle level={4} type={"secondary"}>
            {t("waitingPlayersScreen.joinLinkText")}
          </StyledTitle>
          <StyledTitle level={3} code>
            {host.toUpperCase()}
          </StyledTitle>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex vertical gap={"small"}>
          <StyledTitle level={4}>
            {t("waitingPlayersScreen.enterCode")}
          </StyledTitle>
          <StyledTitle level={2}>
            <StyledTag color="gold">{roomCode}</StyledTag>
          </StyledTitle>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex vertical gap={"small"} align={"center"} justify={"center"}>
          <QRCode value={qrValue} bgColor={"white"} color={"black"} />
          <Typography.Text type={"secondary"}>
            {t("waitingPlayersScreen.scan")}
          </Typography.Text>
        </Flex>
      </Col>
    </Row>
  );
};
