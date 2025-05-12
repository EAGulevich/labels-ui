import { ThemeSwitcher } from "@components/ThemeSwither/ThemeSwitcher.tsx";
import { LngSwitcher } from "@components/LngSwitcher/LngSwitcher.tsx";
import HeaderLogo from "./headerLogo.svg?react";
import {
  StyledDivider,
  StyledHeader,
  StyledHeaderContent,
  StyledMenuButton,
  SvgContainer,
} from "./styles.tsx";
import { List, Popover } from "antd";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

type HeaderProps = {
  hideLogo: boolean;
};

export const Header = ({ hideLogo }: HeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!hideLogo) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [hideLogo]);

  const navigate = useNavigate();
  const items = [<ThemeSwitcher />, <LngSwitcher />];
  return (
    <StyledHeader>
      <StyledHeaderContent>
        <SvgContainer hideLogo={hideLogo}>
          <HeaderLogo
            onClick={() => navigate("/")}
            className={"headerLogo"}
            height={70}
          />
        </SvgContainer>
        <Popover
          placement="bottomRight"
          trigger={"click"}
          content={
            <List
              bordered
              dataSource={items}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          }
          arrow={false}
        >
          <StyledMenuButton />
        </Popover>
      </StyledHeaderContent>

      {!hideLogo && <StyledDivider mounted={isMounted} />}
    </StyledHeader>
  );
};
