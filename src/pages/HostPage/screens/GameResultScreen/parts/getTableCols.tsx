import { Trans } from "react-i18next";
import { MinusCircleOutlined } from "@ant-design/icons";
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
import { getPlayerPoints, getPointsByRound } from "./pointsHelper.ts";

type GetTableColsProps = {
  token: GlobalToken;
  facts: RoomClient["facts"];
  players: RoomClient["players"];
};

const getMinFactColWidth = (playersLength: number) =>
  playersLength <= 6 ? "200px" : playersLength <= 8 ? "240px" : "280px";

const ROUND_COL_WIDTH = "300px";

export const getTableCols = ({
  token,
  facts,
  players,
}: GetTableColsProps): TableProps<DataType>["columns"] => [
  {
    key: "round",
    dataIndex: "round",
    fixed: "left",
    width: ROUND_COL_WIDTH,
    title: (
      <Flex align={"center"} vertical gap={"middle"}>
        <Typography.Text type={"secondary"}>
          <Trans
            i18nKey="resultsScreen.pointsDescription"
            components={{
              BadgeVote: <Badge color={"gold"} />,
              BadgeRound: <Badge color={"purple"} />,
            }}
          />
        </Typography.Text>
      </Flex>
    ),
    render: (round: DataType["round"]) => {
      return (
        <Flex gap={"small"} vertical align={"center"}>
          <Typography.Text type={"secondary"}>
            <Trans i18nKey="resultsScreen.round" /> {round}
          </Typography.Text>
          <Badge color={"purple"} count={getPointsByRound({ round })} />
        </Flex>
      );
    },
  },

  ...facts.map((fact) => ({
    title: (
      <Flex vertical gap={"small"} align={"center"} justify={"space-between"}>
        <Typography.Paragraph
          style={{
            maxWidth: `100%`,
            textAlign: "center",
            margin: 0,
          }}
          ellipsis={{ rows: 5, expandable: false }}
        >
          {fact.text}
        </Typography.Paragraph>
      </Flex>
    ),

    key: fact.id,
    dataIndex: "roundHistory",
    width: `max(${getMinFactColWidth(players.length)}, 100vw / ${players.length} - ${ROUND_COL_WIDTH} - 40px)`,
    render: (roundHistory: DataType["roundHistory"], data: DataType) => {
      const sp = roundHistory.find((s) => s.fact.id === fact.id);
      return (
        <Flex align={"center"} gap={"normal"} vertical>
          <Flex gap={"large"} wrap align={"center"} justify={"center"}>
            {!!sp && !sp?.playersWhoGuessedCorrectly.length && (
              <MinusCircleOutlined
                style={{ fontSize: 22, color: token["colorBorderSecondary"] }}
              />
            )}
            {sp?.playersWhoGuessedCorrectly?.map((player, index) => {
              return player ? (
                <Flex key={player.id} vertical>
                  <Badge
                    color={"gold"}
                    offset={[-4, 4]}
                    count={getPlayerPoints({
                      playersLength: players.length,
                      index,
                    })}
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
                <Badge
                  color={"purple"}
                  count={getPointsByRound({ round: data.round })}
                >
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
