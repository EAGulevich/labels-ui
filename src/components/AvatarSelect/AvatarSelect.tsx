import { FC, useMemo, useState } from "react";
import { RobotOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { useAppSettings } from "@providers/AppSettingsProvider/AppSettingsProvider.tsx";
import { AvatarToken } from "@sharedTypes/avatarTokens.ts";

import { avatarItems } from "./avatarItems.tsx";
import {
  MENU_AVATARS_LIST_CLASS,
  SAvatarDropdownOverlay,
  StyledAvatar,
  StyledButton,
} from "./styles.ts";

type AvatarSelectProps = {
  value?: AvatarToken;
  onChange?: (token: AvatarToken) => void;
};

export const AvatarSelect: FC<AvatarSelectProps> = ({ value, onChange }) => {
  const [avatarToken, setAvatarToken] = useState<AvatarToken | undefined>(
    value || undefined,
  );

  const {
    audio: { getAudio },
  } = useAppSettings();

  const items: MenuProps["items"] = useMemo(
    () =>
      avatarItems.map((item) => ({
        ...item,
        label: (
          <Button
            type={"primary"}
            icon={<PlayerAvatar token={item.key} />}
            onClick={() => {
              setAvatarToken(item.key);
              getAudio(item.key).play();
              if (typeof onChange === "function") {
                onChange(item.key);
              }
            }}
          />
        ),
      })),
    [getAudio, onChange],
  );

  return (
    <Dropdown
      trigger={["click"]}
      menu={{ items, className: MENU_AVATARS_LIST_CLASS }}
      dropdownRender={(originNode) => (
        <SAvatarDropdownOverlay>{originNode}</SAvatarDropdownOverlay>
      )}
    >
      <StyledButton
        size={"large"}
        type="dashed"
        icon={
          avatarToken ? (
            <PlayerAvatar token={avatarToken} />
          ) : (
            <StyledAvatar size={40} shape={"square"} icon={<RobotOutlined />} />
          )
        }
      />
    </Dropdown>
  );
};
