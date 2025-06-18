import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  setUser() {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "SUPPLIER",
    username: "Pasindu",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
