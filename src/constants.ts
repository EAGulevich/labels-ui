// settings
export const ROOM_CODE_LENGTH = 4;
export const NAME_MAX_LENGTH = 12;

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 9;

// query params fields
export const QUERY_PARAM_ROOM_CODE = "roomCode";

// routes
export const ROUTE_PATHS = {
  home: "/",
  host: "/room",
  player: "/game",
} as const;
