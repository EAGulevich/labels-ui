import { Card, Flex, Skeleton, Statistic } from "antd";
import styled from "styled-components";

import { MAX_PLAYERS } from "@shared/constants/validations.ts";

import { ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S } from "@constants";

export const DECORATIVE_PLACE_CLASS = "decorative";
export const EMPTY_PLACE_CLASS = "empty";

const PLACES_COUNT = 16;
export const DECORATIVE_PLACES_COUNT = PLACES_COUNT - MAX_PLAYERS;

export const PlayersCounter = styled(Statistic)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 20px;
`;

export const StyledSkeleton = styled(Skeleton.Node)``;

export const PlayerCard = styled(Flex).attrs({
  vertical: true,
  justify: "space-between",
  align: "center",
  gap: "small",
})<{ background: string }>`
  background: ${({ background }) => background};
  position: relative;
  padding: 8px;
`;

export const PlayerName = styled(Flex).attrs({
  justify: "center",
  align: "center",
})`
  width: 100%;
  max-width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 4px;
  height: 40%;
  background: ${({ theme }) => theme.token.colorBgContainer + "d9"};

  > div {
    margin: 0;
    max-width: 100%;
  }
`;

export const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;

export const PlayersGrid = styled.div`
  max-width: 100%;
  min-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;

  ${StyledSkeleton} {
    .${EMPTY_PLACE_CLASS} {
      height: 100%;
      width: 100%;
    }
  }

  .${DECORATIVE_PLACE_CLASS} {
    background: ${({ theme }) => theme.token.colorTextSecondary};
  }

  .${DECORATIVE_PLACE_CLASS}_1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .${DECORATIVE_PLACE_CLASS}_2 {
    grid-area: 4 / 1 / 5 / 2;
  }
  .${DECORATIVE_PLACE_CLASS}_3 {
    grid-area: 2 / 4 / 3 / 5;
  }
  .${DECORATIVE_PLACE_CLASS}_4 {
    grid-area: 1 / 4 / 2 / 5;
  }
  .${DECORATIVE_PLACE_CLASS}_5 {
    grid-area: 4 / 2 / 5 / 3;
  }
  .${DECORATIVE_PLACE_CLASS}_6 {
    grid-area: 2 / 3 / 3 / 4;
  }
  .${DECORATIVE_PLACE_CLASS}_7 {
    grid-area: 3 / 1 / 4 / 2;
  }
`;

export const CountDownItem = styled.div<{ $visible?: boolean }>`
  font-size: 110px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  text-shadow: 4px 2px 4px ${({ theme }) => theme.token.colorBgBase};
  color: ${({ theme }) => theme.token.colorHighlight};
  transition: opacity
    ${({ $visible }) =>
      $visible ? `${ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S}s` : "0s"};
`;
