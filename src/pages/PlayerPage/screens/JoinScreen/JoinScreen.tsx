import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { Button, Flex, Form, FormProps, Input } from "antd";

import { AvatarSelect } from "@components/AvatarSelect/AvatarSelect.tsx";
import {
  NAME_MAX_LENGTH,
  QUERY_PARAM_ROOM_CODE,
  ROOM_CODE_LENGTH,
} from "@constants";
import { Player, Room } from "@sharedTypes/types.ts";

import { FormFieldType } from "./types.ts";
import { StyledForm } from "./styles.ts";

type JoinScreenProps = {
  onJoin: (params: {
    roomCode: Room["code"];
    player: Pick<Player, "name" | "avatarToken">;
  }) => void;
};

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
  const [searchParams] = useSearchParams();
  const [roomCode] = useState<string>(
    searchParams.get(QUERY_PARAM_ROOM_CODE) || "",
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
    <StyledForm
      name="playerInfo"
      layout={"vertical"}
      variant={"outlined"}
      initialValues={{ roomCode: roomCode }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Flex vertical gap={"small"}>
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
        <Form.Item<FormFieldType>
          label={t("joinScreen.form.fields.avatar.label")}
          name="avatarToken"
          rules={[
            {
              required: true,
              message: t("joinScreen.form.fields.avatar.errors.required"),
            },
          ]}
        >
          <AvatarSelect />
        </Form.Item>
        <Form.Item<FormFieldType>
          label={t("joinScreen.form.fields.name.label")}
          name="name"
          rules={[
            {
              required: true,
              max: NAME_MAX_LENGTH,
              message: t("joinScreen.form.fields.name.errors.required"),
            },
          ]}
        >
          <Input showCount maxLength={NAME_MAX_LENGTH} />
        </Form.Item>
        <Form.Item label={null}>
          <Flex vertical>
            <Button type="primary" htmlType="submit">
              {t("joinScreen.buttons.enter")}
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </StyledForm>
  );
};
