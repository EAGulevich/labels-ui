import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Badge, Progress, Spin, Statistic, Typography } from "antd";
import { useTheme } from "styled-components";

import { FACT_STATUSES } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { FOOTER_CONTENT } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { PlayerItem, PlayersList, Wrapper } from "./styles.ts";

type FooterProps = {
  startTimer: boolean;
  onTimerFinish: () => void;
};

const { Countdown } = Statistic;

export const Footer = ({ startTimer, onTimerFinish }: FooterProps) => {
  const { room } = useGameState();

  const { token } = useTheme();
  const { t } = useTranslation();
  const [deadline, setDeadline] = useState<number | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState(0);
  const {
    discussion: { discussionTime },
  } = useAppSettings();

  const DISCUSSION_TIME_MS = 1000 * discussionTime;

  const percent = timeLeft
    ? (timeLeft / 1000 / (DISCUSSION_TIME_MS / 1000)) * 100
    : 0;

  useEffect(() => {
    // TODO: должно быть не через useEffect
    if (startTimer) {
      setDeadline(Date.now() + DISCUSSION_TIME_MS);
      setTimeLeft(DISCUSSION_TIME_MS);
    }
  }, [DISCUSSION_TIME_MS, startTimer]);

  return createPortal(
    <Wrapper>
      <Progress
        strokeColor={
          percent > 30 || percent === 0 ? token.colorPrimary : token.colorError
        }
        strokeLinecap={"round"}
        type="circle"
        percent={percent}
        format={() =>
          timeLeft > 0 ? (
            <Countdown
              title={t("roundScreen.time")}
              value={deadline}
              format="s"
              onFinish={() => {
                setTimeLeft(0);
                onTimerFinish();
              }}
              onChange={(value) => setTimeLeft(+(value || 0))}
            />
          ) : (
            // TODO: перевести Раунд
            <Typography.Text type={"secondary"}>
              Раунд {room?.currentRound}
            </Typography.Text>
          )
        }
      />

      <PlayersList>
        {room?.players.map((p) => {
          const isGuessed = p.factStatus === FACT_STATUSES.GUESSED;
          return (
            <PlayerItem key={p.id} $isGuessed={isGuessed}>
              <Badge
                count={p.isVip ? "VIP" : undefined}
                size={"small"}
                color={"gold"}
              >
                <Spin spinning={!p.isActive}>
                  <PlayerAvatar token={p.avatar.token} />
                </Spin>
              </Badge>

              <Typography.Text
                type={!p.isActive ? "secondary" : undefined}
                style={{
                  textAlign: "center",
                  textShadow:
                    p.factStatus === "GUESSED"
                      ? "none"
                      : `0 0 40px ${token.colorWhite}, 0 0 10px ${token.colorWhite}, 0 0 20px ${token.colorWhite}`,
                }}
              >
                {p.name}
              </Typography.Text>
            </PlayerItem>
          );
        })}
      </PlayersList>
    </Wrapper>,
    document.getElementById(FOOTER_CONTENT)!,
  );
};
