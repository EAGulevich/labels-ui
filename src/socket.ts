import io, { Socket } from "socket.io-client";

import { ClientToServerEvents, ServerToClientEvents } from "@shared/types";

import { SESSION_KEY_USER_ID } from "@constants";

const WS_URL = import.meta.env.PROD ? import.meta.env.VITE_WS_URL : undefined;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    autoConnect: false,
    auth: (cb) =>
      cb({
        userId: sessionStorage.getItem(SESSION_KEY_USER_ID),
      }),
  },
);
