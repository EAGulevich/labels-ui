import { Trans } from "react-i18next";
import { Flex, Table, Typography } from "antd";

import { Results, RoomClient } from "@shared/types";

import { getPlayerPoints, getPointsByRound } from "./pointsHelper.ts";

export const TableSummary = ({
  roundsStepsHistory,
  room,
}: {
  roundsStepsHistory: Results;
  room: RoomClient;
}) => {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <Flex justify={"center"}>
          <Typography.Title>
            <Trans i18nKey="resultsScreen.total" />
          </Typography.Title>
        </Flex>
      </Table.Summary.Cell>
      {room.facts.map((f) => {
        let points = 0;
        const pId = f.selectedPlayer?.id;

        Object.entries(roundsStepsHistory).forEach(([r, info]) => {
          info.forEach((i) => {
            if (i.isGuessed && pId === i.fact.author.id) {
              points += getPointsByRound({ round: +r });
            }

            i.playersWhoGuessedCorrectly.forEach((gp, index) => {
              if (gp.id === pId) {
                points += getPlayerPoints({
                  players: room.players,
                  index: index,
                });
              }
            });
          });
        });
        return (
          <Table.Summary.Cell index={1}>
            <Typography.Title level={2}>{points}</Typography.Title>
          </Table.Summary.Cell>
        );
      })}
    </Table.Summary.Row>
  );
};
