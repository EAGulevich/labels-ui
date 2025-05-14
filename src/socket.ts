import io, { Socket } from "socket.io-client";

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@sharedTypes/events.ts";

const WS_URL = import.meta.env.PROD ? import.meta.env.VITE_WS_URL : undefined;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  WS_URL,
  {
    autoConnect: false,
  },
);
