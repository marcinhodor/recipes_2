import React, { useState } from "react";

const AuthContext = React.createContext({
  username: "",
  setUsername: (username: string) => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("Guest");

  const contextValue = {
    username,
    setUsername,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
