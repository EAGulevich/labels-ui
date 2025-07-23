import { Trans } from "react-i18next";
import { Flex, Table, Typography } from "antd";
import maxBy from "lodash.maxby";
import { motion } from "motion/react";

import { RoomClient } from "@shared/types";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";

import { CrownIcon, PlayerItem } from "../styles.ts";
import { getPlayerPoints, getPointsByRound } from "./pointsHelper.ts";

const positions = [
  { top: 250, left: 800, transform: "rotate(-1deg)" },
  { top: 200, left: 120, transform: "rotate(-8deg)" },
  { top: 140, right: 100, transform: "rotate(4deg)" },
  { top: 80, right: 560, transform: "rotate(-20deg)" },
  { top: 40, left: 500, transform: "rotate(4deg)" },
  { top: 350, right: 200, transform: "rotate(-4deg)" },
  { top: 540, left: 410, transform: "rotate(-30deg)" },
  { top: 420, right: 450, transform: "rotate(10deg)" },
  { top: 420, left: 200, transform: "rotate(2deg)" },
  { top: 600, right: 760, transform: "rotate(2deg)" },
];

export const Summary = ({
  room,
  showAs,
}: {
  room: RoomClient;
  showAs: "table" | "players";
}) => {
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

  if (showAs === "players") {
    return (
      <div
        style={{
          height: "86%",
          width: "100%",
          position: "relative",
        }}
      >
        {total
          .sort((a, b) => b.points - a.points)
          .map(({ player, points }, index) => {
            const isWinner = maxPoints === points;
            return (
              <motion.div
                key={index}
                initial={{
                  scale: 0.5,
                  opacity: 0,
                  top: positions[index].top * 3,
                }}
                animate={{
                  scale: isWinner ? 1.1 : 1,
                  opacity: 1,
                  top: positions[index].top,
                }}
                transition={{
                  type: "spring",
                  damping: 3,
                  stiffness: 10,
                  delay: (index + 1) * 0.5,
                }}
              >
                <Flex
                  vertical
                  align={"center"}
                  justify={"center"}
                  style={{
                    position: "absolute",
                    ...(positions[index] || {}),
                  }}
                >
                  {isWinner && (
                    <CrownIcon
                      style={{
                        fontSize: 50,
                        top: -40,
                      }}
                    />
                  )}
                  <Typography.Title
                    level={2}
                    style={
                      isWinner ? { color: "gold", margin: 0 } : { margin: 0 }
                    }
                  >
                    {points}
                  </Typography.Title>{" "}
                  {player && (
                    <PlayerItem>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0 }}
                        type={isWinner ? undefined : "secondary"}
                      >
                        {player.name}
                      </Typography.Title>
                      <PlayerAvatar
                        size={"default"}
                        token={player.avatar.token}
                      />
                    </PlayerItem>
                  )}
                </Flex>
              </motion.div>
            );
          })}
      </div>
    );
  }

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
          <Table.Summary.Cell key={player?.id} index={1}>
            <Flex vertical align={"center"} justify={"center"} gap={"small"}>
              <Typography.Title
                level={2}
                style={isWinner ? { color: "gold", margin: 0 } : { margin: 0 }}
              >
                {points}
              </Typography.Title>{" "}
              {player && (
                <PlayerItem>
                  {isWinner && <CrownIcon />}
                  <PlayerAvatar size={"default"} token={player.avatar.token} />
                  <Typography.Text>{player.name}</Typography.Text>
                </PlayerItem>
              )}
            </Flex>
          </Table.Summary.Cell>
        );
      })}
    </Table.Summary.Row>
  );
};
