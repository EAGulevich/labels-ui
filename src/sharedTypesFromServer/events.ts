import { Player, Room } from './types';

export interface ServerToClientEvents {
  createdRoom: (data: { room: Room; eventData: { createdRoom: Room } }) => void;
  joinedPlayer: (data: {
    room: Room;
    eventData: { joinedPlayer: Player };
  }) => void;
  disconnectedPlayer: (data: {
    room: Room;
    eventData: { disconnectedPlayer: Player };
  }) => void;
  roomClosed: (data: {
    room: Room;
    eventData: { closedRoomCode: Room['code'] };
  }) => void;
}

export interface ClientToServerEvents {
  createRoom: () => void;
  joinRoom: (data: { roomCode: Room['code']; player: Player }) => void;
}
