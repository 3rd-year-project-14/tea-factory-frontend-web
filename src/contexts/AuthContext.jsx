// import { createContext, useContext, useState } from "react";
// // import users from "../data/users";


// const AuthContext = createContext({
//   user: null,
//   setUser() {},
// });

// export const AuthProvider = ({ children }) => {
//   // Pick any one user for default login (e.g., index 0 = Pasindu)
//   const [user, setUser] = useState([]);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null); // 🟩 Changed default from [] to null

  // 🟩 Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // 🟩 Modified setUser to save to localStorage
  const setUser = (userData) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
