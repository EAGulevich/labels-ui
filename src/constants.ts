import { version } from "../package.json";

export const VERSION = "v" + version;

export const SESSION_KEY_USER_ID = "userId";
export const LOCAL_KEY_USER_NAME = "userName";

// TODO: что это не здесь должно быть
export const ANIMATION_DURATION_COUNT_DOWN_BEFORE_START_S = 1;

export const MESSAGE_SHOW_DURATION_S = 2;
export const MESSAGE_SHOW_RECONNECTING_DURATION_S = 5 * 60;
export const MESSAGE_TOP = "50px";

// query params fields
export const QUERY_PARAM_ROOM_CODE = "roomCode";

// routes
export const ROUTE_PATHS = {
  home: "/",
  host: "/room",
  player: "/game",
  about: "/about",
  howToPlay: "/how-to-play",
} as const;

// elems
export const FOOTER_CONTENT = "FOOTER_CONTENT";
export const HEADER_INFO_CONTAINER = "HEADER_INFO_CONTAINER";

export const LAYOUT_ID = "LAYOUT_ID";
export const TV_WIDTH = 1920;
export const TV_HEIGHT = 1080;
