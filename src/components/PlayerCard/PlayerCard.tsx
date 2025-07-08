import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import { Badge, Flex, Spin } from "antd";
import { useTheme } from "styled-components";

import { PlayerClient } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";

import {
  PlayerName,
  StyledBadge,
  StyledCard,
  StyledPlayer,
  Wrapper,
} from "./styles.ts";

type PlayerProps = {
  status?: "success" | "waiting";
  player: Pick<PlayerClient, "name" | "isVip" | "isActive" | "factStatus"> & {
    avatar: { token: PlayerClient["avatar"]["token"] | undefined };
  };
  height?: string;
  onClick?: () => void;
  mark?: boolean;
};

export const PlayerCard = ({
  player,
  status,
  height,
  ...props
}: PlayerProps) => {
  const { token } = useTheme();

  return (
    <Wrapper {...props}>
      <StyledBadge isVip={player.isVip}>
        <Badge
          count={
            status === "waiting" ? (
              <ClockCircleTwoTone
                style={{ fontSize: 22 }}
                spin
                twoToneColor={token.colorErrorActive}
              />
            ) : status === "success" ? (
              <CheckCircleTwoTone
                style={{ fontSize: 22 }}
                twoToneColor={token.colorSuccessActive}
              />
            ) : undefined
          }
        >
          <StyledCard
            variant={"outlined"}
            $isSuccess={status === "success"}
            $height={height}
          >
            <StyledPlayer>
              <Flex align={"end"} justify={"center"} flex={1}>
                <Spin spinning={!player.isActive}>
                  <PlayerAvatar token={player.avatar.token} />
                </Spin>
              </Flex>
              <Flex align={"center"} justify={"center"} flex={1}>
                <PlayerName>{player.name}</PlayerName>
              </Flex>
            </StyledPlayer>
          </StyledCard>
        </Badge>
      </StyledBadge>
    </Wrapper>
  );
};
