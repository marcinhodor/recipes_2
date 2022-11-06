import React, { useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

type ctxTypes = {
  token: string | null;
  name: string;
  isLoggedIn: boolean;
  login: (token: string, name: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<ctxTypes>({
  token: "",
  name: "Guest",
  isLoggedIn: false,
  login: (token: string, name: string) => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("Guest");

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, name: string) => {
    setToken(token);
    setName(name);
    Cookies.set("loggedIn", "yes");
  };

  const logoutHandler = () => {
    setToken(null);
    Cookies.remove("loggedIn");
    router.push("/");
  };

  const contextValue = {
    token,
    name,
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
