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

import {
  FACT_TEXT_MAX_LENGTH,
  FACT_TEXT_MIN_LENGTH,
} from "@shared/constants/validations.ts";
import { FACT_STATUSES } from "@shared/types";

import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import { FactHint } from "./parts/FactHint.tsx";
import { FormFieldType } from "./types.ts";

type InputFactScreenProps = {
  onSendFact: (data: { factText: string }) => void;
};

export const InputFactScreen = ({ onSendFact }: InputFactScreenProps) => {
  const { token } = useTheme();
  const { t } = useTranslation();
  const { room } = useGameState();
  const { userId } = useAppStorage();

  const { players = [] } = room || {};

  const onFinishFact: FormProps<FormFieldType>["onFinish"] = ({ fact }) => {
    onSendFact({ factText: fact });
  };

  const isFactSend =
    players.find((p) => p.id === userId)?.factStatus !==
    FACT_STATUSES.NOT_RECEIVED;

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
          <FactHint />
          <Form.Item<FormFieldType>
            label={t("inputFactScreen.form.fields.fact.label")}
            name="fact"
            rules={[
              {
                required: true,
                message: t("inputFactScreen.form.fields.fact.errors.required"),
              },
              {
                max: FACT_TEXT_MAX_LENGTH,
                min: FACT_TEXT_MIN_LENGTH,
                message: t("inputFactScreen.form.fields.fact.errors.length", {
                  min: FACT_TEXT_MIN_LENGTH,
                  max: FACT_TEXT_MAX_LENGTH,
                }),
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={FACT_TEXT_MAX_LENGTH}
              autoSize={{ minRows: 3 }}
            />
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
    (p) => p.factStatus !== FACT_STATUSES.NOT_RECEIVED,
  ).length;

  return (
    <Flex vertical align={"center"} gap="large">
      <Typography.Title level={3}>
        {t("inputFactScreen.statisticLabel")}
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
