import { Card, Statistic } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card).attrs({
  styles: {
    body: {
      height: "100%",
    },
  },
})`
  padding: 10px;
`;

export const StatisticGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

export const StyledStatistic = styled(Statistic).attrs({
  valueStyle: {
    display: "flex",
    justifyContent: "center",
  },
})`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
