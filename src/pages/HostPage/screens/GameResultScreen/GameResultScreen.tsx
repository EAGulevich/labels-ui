import { Flex, Segmented, Space, Table } from "antd";
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
    <Flex vertical>
      <Space align={"center"} direction={"vertical"}>
        <Segmented
          defaultValue={null}
          options={[
            { label: "25%", value: "0.25" },
            { label: "50%", value: "0.5" },
            { label: "75%", value: "0.75" },
            { label: "80%", value: "0.8" },
            { label: "90%", value: "0.9" },
            { label: "100%", value: "1" },
          ]}
          onChange={(value) => {
            document.body.style.zoom = value || "1";
          }}
        />
      </Space>
      <Table<DataType>
        size={"small"}
        bordered
        columns={getTableCols({
          token,
          players: room?.players || [],
          facts: room?.facts || [],
        })}
        scroll={{
          y: "auto",
        }}
        dataSource={data}
        pagination={false}
        summary={() => {
          return (
            <Table.Summary fixed={"top"}>
              <TableSummary room={room} />
            </Table.Summary>
          );
        }}
      />
    </Flex>
  );
};
