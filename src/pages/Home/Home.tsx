import { Logo } from "../../components/Logo/Logo.tsx";
import { Button, Flex } from "antd";
import { StyledPageLayout } from "../../App.tsx";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <StyledPageLayout>
      <Logo />

      <Flex vertical>
        <Button size={"large"} type={"link"} onClick={() => navigate("/new")}>
          Новая игра
        </Button>
        <Button size={"large"} type={"link"} onClick={() => navigate("/join")}>
          Присоединиться
        </Button>
      </Flex>
    </StyledPageLayout>
  );
};

export default HomePage;
