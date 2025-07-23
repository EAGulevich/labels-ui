import { useState } from "react";
import { Col, Row, Segmented, Table } from "antd";
import { useTheme } from "styled-components";

import { ErrorFallback } from "@components/Error/ErrorFallback.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { getTableCols } from "./parts/getTableCols.tsx";
import { Summary } from "./parts/Summary.tsx";
import { DataType } from "./types.ts";

export const GameResultScreen = () => {
  const [mode, setMode] = useState<"full" | "short">("short");
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
    <Row
      align={"top"}
      justify={"center"}
      gutter={[0, 20]}
      style={{ height: "100%", width: "100%" }}
    >
      <Col span={12}>
        <Segmented<"short" | "full">
          block={true}
          defaultValue={mode}
          options={[
            { label: "Итог", value: "short" },
            { label: "Полная таблица", value: "full" },
          ]}
          onChange={(value) => {
            setMode(value);
          }}
        />
      </Col>
      <Col span={24} style={{ height: "100%" }}>
        {mode === "short" && <Summary room={room} showAs={"players"} />}
        {mode === "full" && (
          <Table<DataType>
            size={"small"}
            bordered
            columns={getTableCols({
              token,
              players: room?.players || [],
              facts: room?.facts || [],
            })}
            scroll={{
              y: 540,
            }}
            dataSource={data}
            pagination={false}
            summary={() => {
              return (
                <Table.Summary fixed={"bottom"}>
                  <Summary room={room} showAs={"table"} />
                </Table.Summary>
              );
            }}
          />
        )}
      </Col>
    </Row>
  );
};
