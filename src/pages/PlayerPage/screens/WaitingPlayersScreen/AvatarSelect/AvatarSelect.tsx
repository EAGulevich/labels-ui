import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Flex, Typography } from "antd";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { AvatarToken, PlayerClient } from "@shared/types";

import { AvatarItem, FlexItem } from "./styles.ts";

type AvatarSelectProps = {
  value: PlayerClient["avatar"]["token"];
  onChange: (token: PlayerClient["avatar"]["token"]) => void;
  disabledItems: AvatarToken[];
};

export const AvatarSelect: FC<AvatarSelectProps> = ({
  value,
  onChange,
  disabledItems,
}) => {
  const [token, setToken] = useState(value);
  const { t } = useTranslation();
  const {
    audio: { getAudio },
  } = useAppSettings();

  const { volume } = useAppStorage();

  return (
    <Flex align={"center"} vertical gap={"large"}>
      <Typography.Title level={4}>
        {t("waitingPlayersScreen.selectAvatar.title")}
      </Typography.Title>
      <Flex wrap gap={"small"}>
        {Object.values(AvatarToken).map((avatarToken) => {
          const isDisabled = disabledItems.includes(avatarToken);
          return (
            <FlexItem key={avatarToken}>
              <AvatarItem
                selected={avatarToken === token}
                disabled={isDisabled}
              >
                <PlayerAvatar
                  token={avatarToken}
                  onClick={() => {
                    if (isDisabled) {
                      return;
                    }
                    setToken(avatarToken);
                    getAudio(avatarToken).play({ userSettingsVolume: volume });
                  }}
                />
              </AvatarItem>
            </FlexItem>
          );
        })}
      </Flex>
      <Button
        type={"primary"}
        onClick={() => {
          onChange(token);
        }}
      >
        {t("waitingPlayersScreen.selectAvatar.buttons.ready")}
      </Button>
    </Flex>
  );
};
