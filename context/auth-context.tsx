import React, { useState } from "react";
import { useRouter } from "next/router";

let logoutTimer: NodeJS.Timeout;

type ctxTypes = {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
  login: (token: string | null, expirationTime: string) => void;
  logout: () => void;
  retrieveStoredToken: () => { token: string; duration: number } | null;
  logoutTimer: NodeJS.Timeout;
};

export const AuthContext = React.createContext<ctxTypes>({
  token: "",
  setToken: (token: string | null) => {},
  isLoggedIn: false,
  login: (token: string | null, expirationTime: string) => {},
  logout: () => {},
  retrieveStoredToken: () => null,
  logoutTimer: setTimeout(() => {}),
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  if (!storedToken || !storedExpirationDate) return null;

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    router.push("/");
  };

  const loginHandler = (token: string | null, expirationTime: string) => {
    if (typeof token === "string") {
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
    }
    setToken(token);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token,
    setToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    retrieveStoredToken,
    logoutTimer,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
