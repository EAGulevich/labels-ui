import { useEffect } from "react";
import { Col, Row } from "antd";

import { MainAnimatedLogo } from "@components/MainAnimatedLogo/MainAnimatedLogo.tsx";
import { useGameState } from "@providers/GameStateProvider.tsx";
import { socket } from "@socket";

import { AnimatedMenuList } from "./parts/AnimatedMenuList.tsx";

const HomePage = () => {
  const { setRoom } = useGameState();

  useEffect(() => {
    socket.disconnect();
    setRoom(null);
  }, [setRoom]);

  return (
    <Row justify={"center"}>
      <Col span={10} xs={18} md={10} lg={10}>
        <Row gutter={[0, { xs: 0, sm: 16, md: 24 }]}>
          <Col span={24}>
            <MainAnimatedLogo />
          </Col>
          <Col span={24}>
            <AnimatedMenuList />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
