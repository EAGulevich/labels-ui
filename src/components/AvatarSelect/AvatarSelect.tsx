import { FC, useMemo, useState } from "react";
import { RobotOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
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

  const items: MenuProps["items"] = useMemo(
    () =>
      avatarItems.map((item) => ({
        ...item,
        onClick: () => {
          setAvatarToken(item.key);
          if (typeof onChange === "function") {
            onChange(item.key);
          }
        },
      })),
    [onChange],
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
