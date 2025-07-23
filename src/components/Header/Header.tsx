import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, List, Popover, Typography } from "antd";

import HeaderLogo from "@assets/headerLogo.svg?react";
import { DiscussionTimeSlider } from "@components/DiscussionTimeSlider/DiscussionTimeSlider.tsx";
import { LngSwitcher } from "@components/LngSwitcher/LngSwitcher.tsx";
import { MuteSwitcher } from "@components/MuteSwitcher/MuteSwitcher.tsx";
import { ThemeSwitcher } from "@components/ThemeSwither/ThemeSwitcher.tsx";
import {
  HEADER_INFO_CONTAINER,
  LAYOUT_ID,
  ROUTE_PATHS,
  VERSION,
} from "@constants";
import { useAppStorage } from "@providers/AppStorageProvider.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";

import {
  StyledDivider,
  StyledHeaderContent,
  StyledInfoHeader,
  SvgContainer,
} from "./styles.tsx";

type HeaderProps = {
  hasOnlyMenu: boolean;
};

export const Header = ({ hasOnlyMenu }: HeaderProps) => {
  const navigate = useNavigate();

  const [isDividerVisible, setIsDividerVisible] = useState(false);
  const { room } = useGameState();
  const { userId } = useAppStorage();
  const isHost = room?.hostId === userId;

  useEffect(() => {
    if (!hasOnlyMenu) {
      setIsDividerVisible(true);
    } else {
      setIsDividerVisible(false);
    }
  }, [hasOnlyMenu]);

  const listDataSource = [<ThemeSwitcher />, <LngSwitcher />, <MuteSwitcher />];

  if (isHost) {
    listDataSource.push(<DiscussionTimeSlider />);
  }

  return (
    <Layout.Header>
      <StyledHeaderContent>
        <SvgContainer
          $hideLogo={hasOnlyMenu}
          onClick={() => navigate(ROUTE_PATHS.home)}
        >
          <HeaderLogo />
        </SvgContainer>
        <StyledInfoHeader id={HEADER_INFO_CONTAINER} />
        <Popover
          getPopupContainer={() =>
            document.getElementById(LAYOUT_ID) || document.body
          }
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
            <Button size={"large"} type={"text"} icon={<MenuOutlined />} />
          </Flex>
        </Popover>
      </StyledHeaderContent>

      {!hasOnlyMenu && <StyledDivider $isDividerVisible={isDividerVisible} />}
    </Layout.Header>
  );
};
