import React, { useState } from "react";
import { useRouter } from "next/router";

type ctxTypes = {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
  login: (token: string | null) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<ctxTypes>({
  token: "",
  setToken: (token: string | null) => {},
  isLoggedIn: false,
  login: (token: string | null) => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const userIsLoggedIn = !!token;

  const loginHandler = (token: string | null) => {
    if (typeof token === "string") {
      localStorage.setItem("token", token);
    }
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  const contextValue = {
    token,
    setToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
