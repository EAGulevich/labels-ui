import { useTranslation } from "react-i18next";
import {
  AimOutlined,
  CheckCircleOutlined,
  CrownTwoTone,
  LikeOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { useTheme } from "styled-components";

import { StatisticGrid, StyledCard, StyledStatistic } from "./styles.ts";

type PlayerStatisticProps = {
  totalPoints: number;
  rightVotesCount: number;
  wrongVotesCount: number;
  guessedRound: number;
  isWinner: boolean;
};

export const PlayerStatistic = ({
  rightVotesCount,
  wrongVotesCount,
  guessedRound,
  totalPoints,
  isWinner,
}: PlayerStatisticProps) => {
  const { t } = useTranslation();
  const { token } = useTheme();
  return (
    <StatisticGrid>
      <StyledCard>
        <StyledStatistic
          title={t("resultsScreen.statistic.rightVotesCount")}
          value={rightVotesCount}
          prefix={
            <CheckCircleOutlined style={{ color: token["colorSuccess"] }} />
          }
          suffix={
            <Typography.Text type={"secondary"}>
              {t("resultsScreen.statistic.times", { count: rightVotesCount })}
            </Typography.Text>
          }
        />
      </StyledCard>

      <StyledCard>
        <StyledStatistic
          title={t("resultsScreen.statistic.wrongVotesCount")}
          value={wrongVotesCount}
          prefix={
            <MinusCircleOutlined style={{ color: token["colorError"] }} />
          }
          suffix={
            <Typography.Text type={"secondary"}>
              {t("resultsScreen.statistic.times", { count: wrongVotesCount })}
            </Typography.Text>
          }
        />
      </StyledCard>
      <StyledCard>
        <StyledStatistic
          title={t("resultsScreen.statistic.guessedRound")}
          value={guessedRound}
          prefix={<AimOutlined style={{ color: token["colorPrimary"] }} />}
        />
      </StyledCard>
      <StyledCard>
        <StyledStatistic
          title={t("resultsScreen.statistic.totalPoints")}
          value={totalPoints}
          suffix={isWinner && <CrownTwoTone twoToneColor={"gold"} />}
          prefix={
            <LikeOutlined style={{ color: token["colorPrimaryHover"] }} />
          }
        />
      </StyledCard>
    </StatisticGrid>
  );
};
