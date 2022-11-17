import React, { useState } from "react";
import { useRouter } from "next/router";

type ctxTypes = {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, name: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<ctxTypes>({
  token: "",
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

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, name: string) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    router.push("/");
  };

  const contextValue = {
    token,
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
