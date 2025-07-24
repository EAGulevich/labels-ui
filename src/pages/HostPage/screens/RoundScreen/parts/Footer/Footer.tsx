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

import { PlayerItem, PlayersList, Slashed, Wrapper } from "./styles.ts";

type FooterProps = {
  startTimer: boolean;
  onTimerFinish: () => void;
};

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

  console.log({ percentTimer: percent, timeLeft, deadline });

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
            <Statistic.Timer
              type={"countdown"}
              title={t("roundScreen.time")}
              value={deadline}
              format="s"
              onFinish={() => {
                console.log("TIMER FINISH");
                onTimerFinish();
                setTimeLeft(0);
              }}
              onChange={(value) => setTimeLeft(+(value || 0))}
            />
          ) : (
            <Typography.Text type={"secondary"}>
              {t("roundScreen.round")} {room?.currentRound}
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
                <Slashed $isGuessed={isGuessed}>
                  <Spin spinning={!p.isActive}>
                    <PlayerAvatar token={p.avatar.token} />
                  </Spin>
                </Slashed>
              </Badge>

              <Typography.Text
                type={!p.isActive ? "secondary" : undefined}
                style={{
                  textAlign: "center",
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
