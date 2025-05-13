import { Badge, Card, Skeleton, Statistic } from "antd";
import styled from "styled-components";

import { MAX_PLAYERS } from "@constants";

export const PLAYERS_COUNTER_TITLE_CLASS = "counter-title";
export const DECORATIVE_PLACE_CLASS = "decorative";
export const EMPTY_PLACE_CLASS = "empty";

const PLACES_COUNT = 16;
export const DECORATIVE_PLACES_COUNT = PLACES_COUNT - MAX_PLAYERS;

export const PlayersCounter = styled(Statistic)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 20px;

  .${PLAYERS_COUNTER_TITLE_CLASS} {
    margin: 10px 0;
  }
`;

export const StyledBadge = styled(Badge.Ribbon).attrs({
  text: "VIP",
  color: "gold",
  placement: "start",
})<{ isVip: boolean }>`
  display: ${({ isVip }) => (isVip ? "block" : "none")};
`;

export const PlayerInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledSkeleton = styled(Skeleton.Node)``;
export const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  aspect-ratio: 1 / 1;

  > * {
    height: 100%;
  }
`;

export const PlayersGrid = styled.div`
  max-width: 60vh;
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
