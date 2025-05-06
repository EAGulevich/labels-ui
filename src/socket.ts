import React, { useContext } from "react";
import io, { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "./sharedTypesFromServer/events.ts";

const WS_URL = import.meta.env.PROD
  ? "https://labels-server-production.up.railway.app"
  : "";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(WS_URL);

export const SocketContext = React.createContext(socket);

export const useSocket = () => useContext(SocketContext);
