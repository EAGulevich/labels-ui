import { CheckCircleTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import { Badge, Flex, Spin } from "antd";
import { useTheme } from "styled-components";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { AvatarToken, AvatarTokenBot } from "@sharedTypes/avatarTokens.ts";
import { type Player as PlayerType } from "@sharedTypes/types.ts";

import {
  PlayerName,
  StyledBadge,
  StyledCard,
  StyledPlayer,
  Wrapper,
} from "./styles.ts";

type PlayerProps = {
  status?: "success" | "waiting";
  player: Pick<PlayerType, "name" | "isVip" | "isActive" | "factStatus"> & {
    avatarToken?: AvatarToken | AvatarTokenBot;
  };
};

export const PlayerCard = ({ player, status }: PlayerProps) => {
  const { token } = useTheme();

  return (
    <Wrapper>
      <StyledBadge isVip={player.isVip}>
        <Badge
          count={
            status === "waiting" ? (
              <ClockCircleTwoTone
                style={{ fontSize: 22 }}
                spin
                twoToneColor={token.colorError}
              />
            ) : status === "success" ? (
              <CheckCircleTwoTone
                style={{ fontSize: 22 }}
                twoToneColor={token.colorSuccess}
              />
            ) : undefined
          }
        >
          <StyledCard variant={"outlined"} $isSuccess={status === "success"}>
            <StyledPlayer>
              <Flex align={"end"} justify={"center"} flex={1}>
                <Spin spinning={!player.isActive}>
                  <PlayerAvatar token={player.avatarToken} />
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
