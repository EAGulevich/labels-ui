import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FieldTimeOutlined } from "@ant-design/icons";
import { Button, Flex, Progress } from "antd";
import { Statistic } from "antd";
import { useTheme } from "styled-components";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { Player } from "@sharedTypes/types.ts";

import { PlayersList, Wrapper } from "./styles.ts";

type FooterProps = {
  players: Player[];
};

const { Countdown } = Statistic;

export const Footer = ({ players }: FooterProps) => {
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

  return (
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
              onFinish={() => setTimeLeft(0)}
              onChange={(value) => setTimeLeft(+(value || 0))}
            />
          ) : (
            <FieldTimeOutlined style={{ fontSize: 40, marginLeft: "4px" }} />
          )
        }
      />
      {/*TODO: убрать кнопку*/}
      <Flex align={"center"}>
        <Button
          type={"text"}
          onClick={() => {
            setDeadline(Date.now() + DISCUSSION_TIME_MS);
            setTimeLeft(DISCUSSION_TIME_MS);
          }}
        >
          запустить
        </Button>
      </Flex>
      <PlayersList>
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </PlayersList>
    </Wrapper>
  );
};
