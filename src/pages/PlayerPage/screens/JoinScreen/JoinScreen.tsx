import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormProps, Input } from "antd";

import {
  PLAYER_NAME_MAX_LENGTH,
  PLAYER_NAME_MIN_LENGTH,
  ROOM_CODE_LENGTH,
} from "@shared/constants/validations.ts";
import { PlayerClient, RoomClient } from "@shared/types";

import { QUERY_PARAM_ROOM_CODE } from "@constants";

import { FormFieldType } from "./types.ts";
import { StyledInputOptWrapper } from "./styles.ts";

type JoinScreenProps = {
  onJoin: (params: {
    roomCode: RoomClient["code"];
    player: Pick<PlayerClient, "name">;
  }) => void;
};

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
  const [searchParams] = useSearchParams();
  const [roomCode] = useState<string>(
    searchParams.get(QUERY_PARAM_ROOM_CODE)?.toUpperCase() || "",
  );

  const { t } = useTranslation();

  const onFinish: FormProps<FormFieldType>["onFinish"] = ({
    roomCode,
    ...player
  }) => {
    onJoin({
      roomCode,
      player,
    });
  };

  return (
    <Form
      name="playerInfo"
      layout={"vertical"}
      variant={"outlined"}
      initialValues={{ roomCode: roomCode }}
      onFinish={onFinish}
      autoComplete="off"
      size={"large"}
    >
      <Flex vertical gap={"small"}>
        <StyledInputOptWrapper>
          <Form.Item<FormFieldType>
            label={t("joinScreen.form.fields.roomCode.label")}
            name="roomCode"
            rules={[
              {
                required: true,
                message: t("joinScreen.form.fields.roomCode.errors.required"),
              },
            ]}
          >
            <Input.OTP
              length={ROOM_CODE_LENGTH}
              formatter={(str) => str.toUpperCase()}
            />
          </Form.Item>
        </StyledInputOptWrapper>

        <Form.Item<FormFieldType>
          label={t("joinScreen.form.fields.name.label")}
          name="name"
          rules={[
            {
              required: true,
              message: t("joinScreen.form.fields.name.errors.required"),
            },
            {
              max: PLAYER_NAME_MAX_LENGTH,
              min: PLAYER_NAME_MIN_LENGTH,
              message: t("joinScreen.form.fields.name.errors.length", {
                max: PLAYER_NAME_MAX_LENGTH,
                min: PLAYER_NAME_MIN_LENGTH,
              }),
            },
          ]}
        >
          <Input
            showCount
            maxLength={PLAYER_NAME_MAX_LENGTH}
            minLength={PLAYER_NAME_MIN_LENGTH}
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Flex vertical>
            <Button type="primary" htmlType="submit">
              {t("joinScreen.buttons.enter")}
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};
