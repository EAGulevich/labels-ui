import { Avatar, Button, Dropdown, MenuProps } from "antd";
import { SAvatarDropdownOverlay } from "./styles.ts";
import { PlayerAvatar } from "@components/PlayerAvatar/PlayerAvatar.tsx";
import { RobotOutlined } from "@ant-design/icons";
import { FC, useMemo, useState } from "react";
import { avatarItems } from "./avatarItems.tsx";
import { AvatarToken } from "@sharedTypes/avatarTokens.ts";

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
      menu={{ items }}
      dropdownRender={(originNode) => (
        <SAvatarDropdownOverlay>{originNode}</SAvatarDropdownOverlay>
      )}
    >
      <Button
        size={"large"}
        type="dashed"
        shape="circle"
        icon={
          avatarToken ? (
            <PlayerAvatar token={avatarToken} />
          ) : (
            <Avatar size={40} icon={<RobotOutlined />} />
          )
        }
      />
    </Dropdown>
  );
};
