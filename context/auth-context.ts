import React from "react";

const AuthContext = React.createContext({
  username: "",
  setUsername: (username: string) => {},
});

export default AuthContext;
