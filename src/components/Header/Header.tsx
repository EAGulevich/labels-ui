import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Flex, List, Popover, Typography } from "antd";

import HeaderLogo from "@assets/headerLogo.svg?react";
import { DiscussionTimeSlider } from "@components/DiscussionTimeSlider/DiscussionTimeSlider.tsx";
import { LngSwitcher } from "@components/LngSwitcher/LngSwitcher.tsx";
import { MuteSwitcher } from "@components/MuteSwitcher/MuteSwitcher.tsx";
import { ThemeSwitcher } from "@components/ThemeSwither/ThemeSwitcher.tsx";
import { HEADER_INFO_CONTAINER, ROUTE_PATHS, VERSION } from "@constants";

import {
  StyledDivider,
  StyledHeader,
  StyledHeaderContent,
  StyledInfoHeader,
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
        <StyledInfoHeader id={HEADER_INFO_CONTAINER} />
        <Popover
          placement="bottomRight"
          trigger={"click"}
          content={
            <List
              dataSource={[
                <Flex vertical>
                  Тема <ThemeSwitcher />
                </Flex>,
                <Flex vertical>
                  Язык <LngSwitcher />
                </Flex>,
                <Flex vertical>
                  Звук <MuteSwitcher />
                </Flex>,
                // TODO: только для хоста
                <Flex vertical>
                  <div>Таймер на обсуждение сек</div>
                  <DiscussionTimeSlider />
                </Flex>,
                <Typography.Text type={"secondary"}>
                  Версия: {VERSION}
                </Typography.Text>,
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
