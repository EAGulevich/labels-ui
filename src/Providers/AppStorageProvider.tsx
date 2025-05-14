import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const SESSION_KEY_HOST_ID = "roomHostId";

type AppStorageContextType = {
  roomHostId: string | null;
  changeRoomHostId: (id: string) => void;
  removeRoomHostId: () => void;
};

const defaultValue: AppStorageContextType = {
  roomHostId: sessionStorage.getItem(SESSION_KEY_HOST_ID) || "",
  changeRoomHostId: () => undefined,
  removeRoomHostId: () => undefined,
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

  return (
    <AppStorageContext.Provider
      value={{
        roomHostId,
        changeRoomHostId,
        removeRoomHostId,
      }}
    >
      {children}
    </AppStorageContext.Provider>
  );
};
