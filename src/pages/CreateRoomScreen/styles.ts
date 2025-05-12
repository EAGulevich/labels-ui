import styled from "styled-components";
import { Tag } from "antd";

export const StyledTag = styled(Tag)`
  font-size: inherit;
  padding: 10px;
`;

export const PlayerInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledBlock = styled.div`
  > h1.ant-typography,
  h2.ant-typography,
  h3.ant-typography,
  h4.ant-typography,
  h5.ant-typography,
  h6.ant-typography {
    margin: 10px 0;
  }
  margin: 0 0 20px;
  text-align: center;
`;

export const PlayersGrid = styled.div`
  max-width: 60vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 8px;

  .place {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    aspect-ratio: 1 / 1;

    .ant-card-body {
      height: 100%;
    }
  }

  .empty {
    height: 100%;
    width: 100%;

    .ant-skeleton-image {
      height: 100%;
      width: 100%;
    }
  }

  .place.decorative {
    background: ${({ theme }) => theme.token.colorInfoBg};
  }

  .decorative_1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .decorative_2 {
    grid-area: 4 / 1 / 5 / 2;
  }
  .decorative_3 {
    grid-area: 2 / 4 / 3 / 5;
  }
  .decorative_4 {
    grid-area: 1 / 4 / 2 / 5;
  }
  .decorative_5 {
    grid-area: 4 / 2 / 5 / 3;
  }
  .decorative_6 {
    grid-area: 2 / 3 / 3 / 4;
  }
  .decorative_7 {
    grid-area: 3 / 1 / 4 / 2;
  }
`;
