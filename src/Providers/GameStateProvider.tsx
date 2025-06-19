import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { Room } from "@sharedTypes/types.ts";

type GameStateContextType = {
  room: Room | null;
  setRoom: (room: Room | null) => void;
};

const defaultValue: GameStateContextType = {
  room: null,
  setRoom: () => null,
};

const GameStateContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [room, setRoom] = useState<Room | null>(null);

  return (
    <GameStateContext.Provider
      value={{
        room,
        setRoom,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
