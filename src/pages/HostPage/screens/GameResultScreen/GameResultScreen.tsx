import { Flex, Table } from "antd";
import { useTheme } from "styled-components";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { getTableCols } from "./parts/getTableCols.tsx";
import { TableSummary } from "./parts/TableSummary.tsx";
import { DataType } from "./types.ts";

export const GameResultScreen = () => {
  const { room } = useGameState();
  const { token } = useTheme();

  if (!room || !room.results) {
    return <ErrorFallback />;
  }

  const data = Object.entries(room.results).map(([round, val]) => ({
    key: round,
    round: +round,
    roundHistory: val,
  }));

  return (
    <Flex>
      <Table<DataType>
        size={"small"}
        bordered
        columns={getTableCols({
          token,
          players: room?.players || [],
          facts: room?.facts || [],
        })}
        scroll={{
          // TODO: высчитать
          y: 520,
          // document.getElementsByTagName("main")[0]?.clientHeight -
          // document.getElementsByClassName("ant-table-header")[0]
          //   ?.clientHeight -
          // document.getElementsByClassName("ant-table-summary")[0]
          //   ?.clientHeight -
          // 40 -
          // 1,
        }}
        dataSource={data}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary fixed={"bottom"}>
              <TableSummary room={room} roundsStepsHistory={room.results} />
            </Table.Summary>
          );
        }}
      />
    </Flex>
  );
};
