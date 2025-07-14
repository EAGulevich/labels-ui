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
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

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
  const { room } = useGameState();
  const { userId } = useAppStorage();
  const isHost = room?.hostId === userId;

  useEffect(() => {
    if (!onlyMenuButton) {
      setIsDividerVisible(true);
    } else {
      setIsDividerVisible(false);
    }
  }, [onlyMenuButton]);

  const listDataSource = [<ThemeSwitcher />, <LngSwitcher />, <MuteSwitcher />];

  if (isHost) {
    listDataSource.push(<DiscussionTimeSlider />);
  }

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
              dataSource={listDataSource}
              footer={
                <Flex justify={"end"}>
                  <Typography.Text type={"secondary"}>
                    {VERSION}
                  </Typography.Text>
                </Flex>
              }
              renderItem={(item) => (
                <List.Item style={{ display: "block" }}>{item}</List.Item>
              )}
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
