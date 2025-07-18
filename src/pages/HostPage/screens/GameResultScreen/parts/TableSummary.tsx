import { Trans } from "react-i18next";
import { Flex, Table, Typography } from "antd";
import maxBy from "lodash.maxby";

import { RoomClient } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";

import { CrownIcon, PlayerItem } from "../styles.ts";
import { getPlayerPoints, getPointsByRound } from "./pointsHelper.ts";

export const TableSummary = ({ room }: { room: RoomClient }) => {
  const total = room.facts.map((f) => {
    let points = 0;
    const pId = f.selectedPlayer?.id;
    const player = room.players.find((p) => p.id === pId);

    Object.entries(room.results || {}).forEach(([r, info]) => {
      info.forEach((i) => {
        if (i.isGuessed && pId === i.fact.author.id) {
          points += getPointsByRound({ round: +r });
        }

        i.playersWhoGuessedCorrectly.forEach((gp, index) => {
          if (gp.id === pId) {
            points += getPlayerPoints({
              playersLength: room.players.length,
              index: index,
            });
          }
        });
      });
    });
    return {
      points,
      player,
    };
  });

  const maxPoints = maxBy(total, (el) => el.points)?.points;

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <Flex justify={"center"}>
          <Typography.Title>
            <Trans i18nKey="resultsScreen.total" />
          </Typography.Title>
        </Flex>
      </Table.Summary.Cell>
      {total.map(({ player, points }) => {
        const isWinner = maxPoints === points;
        return (
          <Table.Summary.Cell index={1}>
            <Flex vertical align={"center"} justify={"center"} gap={"small"}>
              {player && (
                <PlayerItem>
                  {isWinner && <CrownIcon />}
                  <PlayerAvatar size={"default"} token={player.avatar.token} />
                  <Typography.Text>{player.name}</Typography.Text>
                </PlayerItem>
              )}
              <Typography.Title
                level={2}
                style={isWinner ? { color: "gold", margin: 0 } : { margin: 0 }}
              >
                {points}
              </Typography.Title>
            </Flex>
          </Table.Summary.Cell>
        );
      })}
    </Table.Summary.Row>
  );
};
