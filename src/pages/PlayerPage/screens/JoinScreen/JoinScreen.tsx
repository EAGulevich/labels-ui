import { useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Card, Form, FormProps, Input } from "antd";

import { NAME_MAX_LENGTH, ROOM_CODE_LENGTH } from "@constants";
import { AvatarSelect } from "@components/AvatarSelect/AvatarSelect.tsx";
import { AvatarToken } from "@sharedTypes/avatarTokens.ts";
import { socket } from "@socket";

type FormFieldType = {
  name?: string;
  avatarToken?: AvatarToken;
  roomCode?: string;
};

export const JoinScreen = () => {
  const [searchParams] = useSearchParams();
  const [roomCode] = useState<string>(searchParams.get("roomCode") || "");

  const { t } = useTranslation();

  const onFinish: FormProps<FormFieldType>["onFinish"] = (values) => {
    if (!!values.avatarToken && values.name && values.roomCode) {
      socket.emit("joinRoom", {
        roomCode: values.roomCode,
        player: {
          name: values.name,
          avatarToken: values.avatarToken,
        },
      });
    }
  };

  return (
    <Card>
      <Form
        name="playerInfo"
        layout={"vertical"}
        variant={"outlined"}
        initialValues={{ roomCode: roomCode }}
        onFinish={onFinish}
        autoComplete="off"
      >
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
          <Button type="primary" htmlType="submit">
            {t("joinScreen.buttons.enter")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
