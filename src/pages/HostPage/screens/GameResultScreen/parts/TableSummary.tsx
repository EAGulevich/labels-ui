import { Flex, Table, Typography } from "antd";

import { Results, RoomClient } from "@shared/types";

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
          {/*TODO перевод*/}
          <Typography.Title>Результат</Typography.Title>
        </Flex>
      </Table.Summary.Cell>
      {room.facts.map((f) => {
        let points = 0;
        const pId = f.selectedPlayer?.id;

        Object.entries(roundsStepsHistory).forEach(([r, info]) => {
          info.forEach((i) => {
            if (i.isGuessed && pId === i.fact.author.id) {
              points += +r * 3;
            }

            i.playersWhoGuessedCorrectly.forEach((gp, index) => {
              if (gp.id === pId) {
                points += (room?.players.length - 1 - index) * 2;
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
