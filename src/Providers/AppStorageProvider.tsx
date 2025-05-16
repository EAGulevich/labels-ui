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

type AppStorageContextType = {
  roomHostId: string | null;
  changeRoomHostId: (id: string) => void;
  removeRoomHostId: () => void;

  playerId: string | null;
  changePlayerId: (id: string) => void;
  removePlayerId: () => void;
};

const defaultValue: AppStorageContextType = {
  roomHostId: sessionStorage.getItem(SESSION_KEY_HOST_ID) || "",
  changeRoomHostId: () => undefined,
  removeRoomHostId: () => undefined,

  playerId: sessionStorage.getItem(SESSION_KEY_PLAYER_ID) || "",
  changePlayerId: () => undefined,
  removePlayerId: () => undefined,
};

const AppStorageContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStorage = () => useContext(AppStorageContext);

export const AppStorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [roomHostId, setRoomHostId] = useState(
    sessionStorage.getItem(SESSION_KEY_HOST_ID),
  );

  const [playerId, setPlayerId] = useState(
    sessionStorage.getItem(SESSION_KEY_PLAYER_ID),
  );

  const removeRoomHostId = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY_HOST_ID);
    setRoomHostId(null);
  }, []);

  const removePlayerId = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY_PLAYER_ID);
    setPlayerId(null);
  }, []);

  const changeRoomHostId = (newRoomHostId: string) => {
    sessionStorage.setItem(SESSION_KEY_HOST_ID, newRoomHostId);
    setRoomHostId(newRoomHostId);
  };

  const changePlayerId = (newPlayerId: string) => {
    sessionStorage.setItem(SESSION_KEY_PLAYER_ID, newPlayerId);
    setPlayerId(newPlayerId);
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
      }}
    >
      {children}
    </AppStorageContext.Provider>
  );
};
