import { version } from "../package.json";

export const VERSION = "v" + version;

export const SESSION_KEY_USER_ID = "userId";

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
