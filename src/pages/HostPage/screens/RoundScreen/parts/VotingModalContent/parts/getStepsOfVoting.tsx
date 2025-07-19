import { Trans } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GlobalToken, StepsProps } from "antd";

import { FactClient, RoomClient, VotingDataItem } from "@shared/types";

type GetStepsOfVotingProps = {
  room: Omit<RoomClient, "votingData"> & { votingData: VotingDataItem };
  token: GlobalToken;
};

export const getStepsOfVoting = ({ room, token }: GetStepsOfVotingProps) => {
  const votedFactsCount = room.votingData.prevSteps.length;

  const voteCount =
    room.votingData?.candidates.reduce(
      (acc, item) => acc + item.votesCount,
      0,
    ) || 0;

  const facts: (FactClient | null)[] = room.votingData.prevSteps
    .map((val) => room.facts.find((v) => v.id === val.fact.id))
    .filter((val) => !!val);

  const stepCount = room.players.filter(
    (player) => player.factStatus === "NOT_GUESSED",
  ).length;

  facts.splice(
    facts.length,
    0,
    ...new Array(stepCount - facts.length).fill(null),
  );

  const items: StepsProps["items"] = facts.map((_f, i) => {
    const supposedPlayer = room.votingData?.prevSteps.find(
      (val) => val.fact.id === _f?.id,
    )?.selectedPlayer;

    return votedFactsCount === i
      ? {
          status: "process",
          description: `${voteCount} / ${room.players.length - 1}`,
          icon: (
            <LoadingOutlined
              style={{
                color: token.colorLink,
              }}
            />
          ),
        }
      : i > votedFactsCount - 1
        ? {
            status: "wait",
            description: ``,

            icon: <UserOutlined style={{}} />,
          }
        : {
            description: !supposedPlayer ? (
              <Trans i18nKey={"roundScreen.nobody"} />
            ) : (
              supposedPlayer?.name
            ),
            status: !supposedPlayer ? "error" : "finish",
            icon: !supposedPlayer ? (
              <CloseOutlined style={{ color: token.colorError }} />
            ) : (
              <CheckCircleOutlined
                style={{
                  color: token.colorSuccess,
                }}
              />
            ),
          };
  });

  return items;
};
