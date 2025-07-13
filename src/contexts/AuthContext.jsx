import { createContext, useContext, useState } from "react";
import users from "../data/users"; 

const AuthContext = createContext({
  user: null,
  setUser() {},
});

export const AuthProvider = ({ children }) => {
  // Pick any one user for default login (e.g., index 0 = Pasindu)
  const [user, setUser] = useState(users[0]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
