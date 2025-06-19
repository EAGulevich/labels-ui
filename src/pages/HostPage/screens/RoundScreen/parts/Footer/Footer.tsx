import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Progress, Spin, Statistic, Typography } from "antd";
import { useTheme } from "styled-components";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { FOOTER_CONTENT } from "@constants";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";

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
              Раунд {room?.round}
            </Typography.Text>
          )
        }
      />

      <PlayersList>
        {room?.players.map((p) => {
          const isGuessed = p.factStatus === FACT_STATUS.GUESSED;
          return (
            <PlayerItem isGuessed={isGuessed}>
              <Spin spinning={!p.isActive}>
                <PlayerAvatar token={p.avatarToken} />
              </Spin>
              <Typography.Text delete={isGuessed}>
                {p.name.toUpperCase()}
              </Typography.Text>
            </PlayerItem>
          );
        })}
      </PlayersList>
    </Wrapper>,
    document.getElementById(FOOTER_CONTENT)!,
  );
};
