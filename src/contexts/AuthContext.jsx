// export const useAuth = () => useContext(AuthContext);
import { createContext,useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, () => {
      // Optionally, you can fetch user details from backend here
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Optionally, keep your localStorage logic if you want to persist extra user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // 🟩 Modified setUser to save to localStorage
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  // Add logout function
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (!authReady) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)"
    }}>
      <div style={{ textAlign: "center" }}>
        <img src="/assets/logo2.png" alt="PureLeaf Logo" style={{ width: 80, marginBottom: 24 }} />
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#165E52] border-solid mx-auto mb-4"></div>
        <div style={{ color: "#165E52", fontWeight: "bold", fontSize: 20 }}>Loading...</div>
      </div>
    </div>
  );
}
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
