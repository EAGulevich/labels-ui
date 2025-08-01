import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { LOCAL_KEY_USER_NAME, SESSION_KEY_USER_ID } from "@constants";

const LOCAL_KEY_VOLUME = "volume";

type AppStorageContextType = {
  volume: number;
  changeVolume: (volume: number) => void;

  userId: string;
  setUserId: (userId: string) => void;

  userName: string;
  setUserName: (userName: string) => void;
};

const defaultValue: AppStorageContextType = {
  volume: +(localStorage.getItem(LOCAL_KEY_VOLUME) || 3),
  changeVolume: () => undefined,

  userId: sessionStorage.getItem(SESSION_KEY_USER_ID) || "",
  setUserId: () => null,

  userName: "",
  setUserName: () => null,
};

const AppStorageContext = createContext(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStorage = () => useContext(AppStorageContext);

export const AppStorageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [volume, setVolume] = useState(
    +(localStorage.getItem(LOCAL_KEY_VOLUME) || 3),
  );

  const changeVolume = (newVolume: number) => {
    localStorage.setItem(LOCAL_KEY_VOLUME, newVolume.toString());
    setVolume(newVolume);
  };

  const [userId, setUserId] = useState<string>(
    sessionStorage.getItem(SESSION_KEY_USER_ID) || "",
  );

  const changeUserId = (userId: string) => {
    sessionStorage.setItem(SESSION_KEY_USER_ID, userId);
    setUserId(userId);
  };

  const [userName, setUserName] = useState<string>(
    localStorage.getItem(LOCAL_KEY_USER_NAME) || "",
  );

  const changeUserName = (userName: string) => {
    localStorage.setItem(LOCAL_KEY_USER_NAME, userName);
    setUserName(userName);
  };

  return (
    <AppStorageContext.Provider
      value={{
        volume,
        changeVolume,

        userId,
        setUserId: changeUserId,

        userName,
        setUserName: changeUserName,
      }}
    >
      {children}
    </AppStorageContext.Provider>
  );
};
