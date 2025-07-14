import {
  Badge,
  Divider,
  Flex,
  GlobalToken,
  TableProps,
  Typography,
} from "antd";

import { RoomClient } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";

import { DataType } from "../types.ts";

type GetTableColsProps = {
  token: GlobalToken;
  facts: RoomClient["facts"];
  players: RoomClient["players"];
};

// TODO: для 9 игроков
// const MIN_COL_WIDTH = "280px";
// TODO: для 7-8 игроков
// const MIN_COL_WIDTH = "240px";
// TODO: для 6 или менее игроков
const MIN_COL_WIDTH = "200px";

export const getTableCols = ({
  token,
  facts,
  players,
}: GetTableColsProps): TableProps<DataType>["columns"] => [
  {
    key: "round",
    dataIndex: "round",
    fixed: "left",
    // TODO: не 100vw
    width: `max(${MIN_COL_WIDTH}, 100vw / ${players.length + 1} - 60px)`,
    title: (
      <Flex align={"center"} vertical gap={"middle"}>
        <Typography.Text type={"secondary"}>
          {/*TODO: перевод*/}В каждом раунде игрок получает{" "}
          <Badge color={"gold"} count={`баллы`} /> за каждый факт, в котором он
          верно проголосовал, а так же{" "}
          <Badge color={"purple"} count={"баллы"} /> за свой факт в зависимости
          от раунда, в котором его факт отгадали
        </Typography.Text>
      </Flex>
    ),
    render: (round: DataType["round"]) => {
      return (
        <Flex gap={"small"} vertical align={"center"}>
          <Typography.Text type={"secondary"}>
            {/*TODO: перевод*/}
            Раунд {round}
          </Typography.Text>
          {/*TODO: формулу  вынести val * 3*/}
          <Badge color={"purple"} count={round * 3} />
        </Flex>
      );
    },
  },

  ...facts.map((fact) => ({
    title: (
      <Flex vertical gap={"small"} align={"center"} justify={"space-between"}>
        <Typography.Title
          style={{
            maxWidth: `100%`,
            textAlign: "center",
            margin: 0,
          }}
          level={3}
          ellipsis={{ rows: 5, expandable: false }}
        >
          {fact.text}
        </Typography.Title>
      </Flex>
    ),

    key: fact.id,
    dataIndex: "roundHistory",
    width: `max(${MIN_COL_WIDTH}, 100vw / ${players.length + 1} - 60px)`,
    render: (roundHistory: DataType["roundHistory"], data: DataType) => {
      const sp = roundHistory.find((s) => s.fact.id === fact.id);
      return (
        <Flex align={"center"} gap={"normal"} vertical>
          <Flex gap={"large"} wrap align={"center"} justify={"center"}>
            {!!sp && !sp?.playersWhoGuessedCorrectly.length && <div>Никто</div>}
            {sp?.playersWhoGuessedCorrectly?.map((player, index) => {
              return player ? (
                <Flex vertical>
                  <Badge
                    color={"gold"}
                    offset={[-4, 4]}
                    count={((players.length || 0) - 1 - index) * 2}
                  >
                    <PlayerAvatar
                      size={"default"}
                      token={player.avatar.token}
                    />
                  </Badge>
                </Flex>
              ) : (
                "ERROR"
              );
            })}
          </Flex>
          <div>
            {sp?.isGuessed && (
              <>
                <Divider />
                <Badge color={"purple"} count={+data.round * 3}>
                  <PlayerAvatar
                    size={"default"}
                    token={sp.fact.author.avatar.token}
                  />
                </Badge>
              </>
            )}
          </div>
        </Flex>
      );
    },

    onCell: ({ roundHistory }: DataType) => {
      const sp = roundHistory.find((s) => s.fact.id === fact.id);
      return {
        style: {
          background: sp?.isGuessed ? token.colorPrimaryBorderHover : undefined,
        },
      };
    },
  })),
];
