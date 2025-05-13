import { type ThemeName } from "@providers/AppSettingsProvider.tsx";

// session storage fields
export const SESSION_KEY_HOST_ID = "hostId";

// local storage fields
export const LOCAL_STORAGE_THEME = "theme";
export const LOCAL_STORAGE_LNG = "lng";

// settings
export const ROOM_CODE_LENGTH = 4;
export const NAME_MAX_LENGTH = 12;

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 9;

export const DEFAULT_LNG = "ru";
export const DEFAULT_THEME: ThemeName = "dark";

// query params fields
export const QUERY_PARAM_ROOM_CODE = "roomCode";

// routes
export const ROUTE_PATHS = {
  home: "/",
  host: "/room",
  player: "/game",
} as const;
