import { useTranslation } from "react-i18next";
import { Flex, Modal, Typography } from "antd";

import { PlayerCard } from "@components/PlayerCard/PlayerCard.tsx";
import { Player as Candidate } from "@sharedTypes/types.ts";

import { VoteBlock, VotePoint } from "./styles.ts";

type VotingModalContentProps = {
  votingFact: {
    text: string;
    candidates: (Candidate & { votes: number })[];
  } | null;
};

export const VotingModalContent = ({ votingFact }: VotingModalContentProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={
        <Flex justify={"center"} align={"center"} vertical>
          <Typography.Title level={3} type={"secondary"}>
            {t("roundScreen.modalVote").toUpperCase()}
          </Typography.Title>
          <Typography.Title level={1}>{votingFact?.text}</Typography.Title>
        </Flex>
      }
      open={true}
      closable={false}
      footer={null}
      width={"90vw"}
      centered
    >
      <Flex justify={"center"} gap={"small"} wrap>
        {votingFact?.candidates.map((c) => (
          <Flex vertical key={c.id}>
            <PlayerCard player={c} />
            <VoteBlock>
              {Array(c.votes || 0)
                .fill(<VotePoint />)
                .map((i) => i)}
            </VoteBlock>
          </Flex>
        ))}
      </Flex>
    </Modal>
  );
};
