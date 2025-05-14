import { Spin } from "antd";

export const WaitingPlayersScreen = () => {
  return (
    <div>
      <div>В разработке: Экран ожидания подключения всех игроков</div>
      <Spin tip="Loading" size="large"></Spin>
    </div>
  );
};
