import io, { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./sharedTypesFromServer/events.ts";

const WS_URL = import.meta.env.PROD
  ? "https://labels-server-production.up.railway.app"
  : undefined;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(WS_URL);
