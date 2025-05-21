import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const SESSION_KEY_HOST_ID = "roomHostId";
const SESSION_KEY_PLAYER_ID = "playerId";

const LOCAL_KEY_VOLUME = "volume";

type AppStorageContextType = {
  roomHostId: string | null;
  changeRoomHostId: (id: string) => void;
  removeRoomHostId: () => void;

  playerId: string | null;
  changePlayerId: (id: string) => void;
  removePlayerId: () => void;

  volume: number;
  changeVolume: (volume: number) => void;
};

const defaultValue: AppStorageContextType = {
  roomHostId: sessionStorage.getItem(SESSION_KEY_HOST_ID) || "",
  changeRoomHostId: () => undefined,
  removeRoomHostId: () => undefined,

  playerId: sessionStorage.getItem(SESSION_KEY_PLAYER_ID) || "",
  changePlayerId: () => undefined,
  removePlayerId: () => undefined,

  volume: +(localStorage.getItem(LOCAL_KEY_VOLUME) || 1),
  changeVolume: () => undefined,
};

const AppStorageContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStorage = () => useContext(AppStorageContext);

export const AppStorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [roomHostId, setRoomHostId] = useState(
    sessionStorage.getItem(SESSION_KEY_HOST_ID),
  );
  const removeRoomHostId = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY_HOST_ID);
    setRoomHostId(null);
  }, []);
  const changeRoomHostId = (newRoomHostId: string) => {
    sessionStorage.setItem(SESSION_KEY_HOST_ID, newRoomHostId);
    setRoomHostId(newRoomHostId);
  };

  const [playerId, setPlayerId] = useState(
    sessionStorage.getItem(SESSION_KEY_PLAYER_ID),
  );
  const removePlayerId = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY_PLAYER_ID);
    setPlayerId(null);
  }, []);
  const changePlayerId = (newPlayerId: string) => {
    sessionStorage.setItem(SESSION_KEY_PLAYER_ID, newPlayerId);
    setPlayerId(newPlayerId);
  };

  const [volume, setVolume] = useState(
    +(localStorage.getItem(LOCAL_KEY_VOLUME) || 1),
  );

  const changeVolume = (newVolume: number) => {
    localStorage.setItem(LOCAL_KEY_VOLUME, newVolume.toString());
    setVolume(newVolume);
  };

  return (
    <AppStorageContext.Provider
      value={{
        roomHostId,
        changeRoomHostId,
        removeRoomHostId,

        playerId,
        changePlayerId,
        removePlayerId,

        volume,
        changeVolume,
      }}
    >
      {children}
    </AppStorageContext.Provider>
  );
};
