import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Flex, List, Popover } from "antd";

import HeaderLogo from "@assets/headerLogo.svg?react";
import { LngSwitcher } from "@components/LngSwitcher/LngSwitcher.tsx";
import { MuteSwitcher } from "@components/MuteSwitcher/MuteSwitcher.tsx";
import { ThemeSwitcher } from "@components/ThemeSwither/ThemeSwitcher.tsx";
import { ROUTE_PATHS } from "@constants";

import {
  StyledDivider,
  StyledHeader,
  StyledHeaderContent,
  SvgContainer,
} from "./styles.tsx";

type HeaderProps = {
  onlyMenuButton: boolean;
};

export const Header = ({ onlyMenuButton }: HeaderProps) => {
  const navigate = useNavigate();

  const [isDividerVisible, setIsDividerVisible] = useState(false);

  useEffect(() => {
    if (!onlyMenuButton) {
      setIsDividerVisible(true);
    } else {
      setIsDividerVisible(false);
    }
  }, [onlyMenuButton]);

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <SvgContainer
          $hideLogo={onlyMenuButton}
          onClick={() => navigate(ROUTE_PATHS.home)}
        >
          <HeaderLogo />
        </SvgContainer>
        <Popover
          placement="bottomRight"
          trigger={"click"}
          content={
            <List
              dataSource={[
                <ThemeSwitcher />,
                <LngSwitcher />,
                <MuteSwitcher />,
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          }
          arrow={false}
        >
          <Flex align="center">
            <Button size={"middle"} type={"text"} icon={<MenuOutlined />} />
          </Flex>
        </Popover>
      </StyledHeaderContent>

      {!onlyMenuButton && (
        <StyledDivider $isDividerVisible={isDividerVisible} />
      )}
    </StyledHeader>
  );
};
