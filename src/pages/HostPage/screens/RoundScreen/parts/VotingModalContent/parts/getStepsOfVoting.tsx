import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GlobalToken, StepsProps } from "antd";

import { Room } from "@sharedTypes/types.ts";

type GetStepsOfVotingProps = {
  room: Room;
  token: GlobalToken;
};

export const getStepsOfVoting = ({ room, token }: GetStepsOfVotingProps) => {
  const votedFacts = room.story[room.round]?.length || 0;

  const voteCount =
    room.votingFact?.candidates.reduce(
      (acc, item) => acc + item.voteCount,
      0,
    ) || 0;

  const items: StepsProps["items"] = room.facts
    .filter((f) => !f.isGuessed)
    .map((_f, i) =>
      votedFacts === i
        ? {
            status: "process",
            description: `${voteCount} / ${room.players.length - 1}`,
            icon: (
              <LoadingOutlined
                style={{
                  color: token.colorPrimaryText,
                }}
              />
            ),
          }
        : i > votedFacts - 1
          ? {
              status: "wait",
              description: ``,

              icon: <UserOutlined style={{}} />,
            }
          : {
              description:
                room.story[room.round][i] === "NOBODY"
                  ? "Никто"
                  : room.players.find((p) => p.id === room.story[room.round][i])
                      ?.name,
              status:
                room.story[room.round][i] === "NOBODY" ? "error" : "finish",
              icon:
                room.story[room.round][i] === "NOBODY" ? (
                  <CloseOutlined style={{ color: token.colorError }} />
                ) : (
                  <CheckCircleOutlined
                    style={{
                      color: token.colorSuccess,
                    }}
                  />
                ),
            },
    );

  return items;
};
