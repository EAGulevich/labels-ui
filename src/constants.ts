import { version } from "../package.json";

export const VERSION = "v" + version;

// settings
export const ROOM_CODE_LENGTH = 4;
export const NAME_MAX_LENGTH = 12;
export const FACT_MAX_LENGTH = 100;

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 9;

export const ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S = 1;

// query params fields
export const QUERY_PARAM_ROOM_CODE = "roomCode";

// routes
export const ROUTE_PATHS = {
  home: "/",
  host: "/room",
  player: "/game",
} as const;

// elems
export const FOOTER_CONTENT = "FOOTER_CONTENT";
export const HEADER_INFO_CONTAINER = "HEADER_INFO_CONTAINER";
