import { type ThemeName } from "@providers/AppSettingsProvider.tsx";

// session storage fields
export const SESSION_KEY_HOST_ID = "hostId";

// settings
export const ROOM_CODE_LENGTH = 4;
export const NAME_MAX_LENGTH = 12;
export const DEFAULT_THEME: ThemeName = "dark";

// query params fields
export const QUERY_PARAM_ROOM_CODE = "roomCode";

// routes
export const ROUTE_PATHS = {
  home: "/",
  host: "/room",
  player: "/game",
} as const;
