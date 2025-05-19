import { useTranslation } from "react-i18next";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Progress,
  Typography,
} from "antd";
import { useTheme } from "styled-components";

import { FACT_MAX_LENGTH } from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { FACT_STATUS } from "@sharedTypes/factStatuses.ts";
import { Player } from "@sharedTypes/types.ts";

import { FormFieldType } from "./types.ts";

type InputFactScreenProps = {
  players: Player[];
  onSendFact: (data: { factText: string }) => void;
};

export const InputFactScreen = ({
  players,
  onSendFact,
}: InputFactScreenProps) => {
  const { token } = useTheme();
  const { t } = useTranslation();
  const { playerId } = useAppStorage();

  const onFinishFact: FormProps<FormFieldType>["onFinish"] = ({ fact }) => {
    onSendFact({ factText: fact });
  };

  const isFactSend =
    players.find((p) => p.id === playerId)?.factStatus !==
    FACT_STATUS.NOT_RECEIVED;

  if (!isFactSend) {
    return (
      <Form
        name="playerFact"
        layout={"vertical"}
        variant={"outlined"}
        initialValues={{ fact: "" }}
        onFinish={onFinishFact}
        autoComplete="off"
      >
        <Flex vertical gap={"small"}>
          <Form.Item<FormFieldType>
            label={t("inputFactScreen.form.fields.fact.label")}
            name="fact"
            rules={[
              {
                required: true,
                max: FACT_MAX_LENGTH,
                message: t("inputFactScreen.form.fields.fact.errors.required"),
              },
            ]}
          >
            <Input showCount maxLength={FACT_MAX_LENGTH} />
          </Form.Item>
          <Form.Item label={null}>
            <Flex vertical>
              <Button type="primary" htmlType="submit">
                {t("inputFactScreen.buttons.send")}
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    );
  }

  const factsLength = players.filter(
    (p) => p.factStatus !== FACT_STATUS.NOT_RECEIVED,
  ).length;

  return (
    <Flex vertical align={"center"} gap="large">
      <Typography.Title level={3}>
        {t("inputFactScreen.statisticsLabel")}
      </Typography.Title>
      <Progress
        type="circle"
        percent={(factsLength / players.length) * 100}
        format={() => `${factsLength}/${players.length}`}
        steps={{ count: players.length, gap: 10 }}
        trailColor={token.colorBgContainer}
      />
    </Flex>
  );
};
