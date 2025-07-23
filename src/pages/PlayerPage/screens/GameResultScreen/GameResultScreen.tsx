import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Segmented, Timeline } from "antd";

import { PlayerStatistic } from "./parts/PlayerStatistic/PlayerStatistic.tsx";
import { useGameResult } from "./useGameResult.tsx";

enum TABS {
  COMMON = "COMMON",
  HISTORY = "HISTORY",
}

export const GameResultScreen = () => {
  const { timeLineItems, statistic, isWinner } = useGameResult();
  const [option, setOption] = useState<string>(TABS.COMMON);
  const { t } = useTranslation();

  const options = [
    { value: TABS.COMMON, label: t("resultsScreen.tabCommon") },
    { value: TABS.HISTORY, label: t("resultsScreen.tabHistory") },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
        },
      }}
    >
      <Segmented
        options={options}
        block
        defaultValue={options[0].value}
        value={option}
        onChange={(value) => {
          setOption(value);
        }}
        style={{
          marginBottom: "20px",
        }}
      />

      {option === TABS.COMMON && (
        <PlayerStatistic {...statistic} isWinner={isWinner} />
      )}
      {option === TABS.HISTORY && (
        <Timeline mode={"right"} items={timeLineItems} />
      )}
    </ConfigProvider>
  );
};
