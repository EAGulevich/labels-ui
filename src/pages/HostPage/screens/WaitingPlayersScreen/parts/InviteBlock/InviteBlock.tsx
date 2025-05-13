import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex, QRCode, Typography } from "antd";

import { QUERY_PARAM_ROOM_CODE, ROUTE_PATHS } from "@constants";

import { StyledBlock, StyledTag, TITLE_CLASS_NAME } from "./styles.ts";

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
    <>
      <StyledBlock>
        <Typography.Title
          className={TITLE_CLASS_NAME}
          level={4}
          type={"secondary"}
        >
          {t("waitingPlayersScreen.joinLinkText")}
        </Typography.Title>
        <Typography.Title className={TITLE_CLASS_NAME} level={2} code>
          {host.toUpperCase()}
        </Typography.Title>
      </StyledBlock>
      <StyledBlock>
        <Typography.Title className={TITLE_CLASS_NAME} level={4}>
          {t("waitingPlayersScreen.enterCode")}
        </Typography.Title>
        <Typography.Title className={TITLE_CLASS_NAME} level={2}>
          <StyledTag color="gold">{roomCode}</StyledTag>
        </Typography.Title>
      </StyledBlock>
      <Flex align={"center"} vertical style={{ margin: "50px" }}>
        <QRCode value={qrValue} />
        <Typography.Text type={"secondary"}>
          {t("waitingPlayersScreen.scan")}
        </Typography.Text>
      </Flex>
    </>
  );
};
