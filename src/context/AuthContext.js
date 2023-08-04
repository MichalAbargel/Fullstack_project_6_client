import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);

  const updateAuthState = (user) => {
    if (user) {
      setIsConnected(true);
      setUserId(user.id);
    } else {
      setIsConnected(false);
      setUserId(null);
    }
  };

  const values = {
    isConnected,
    userId,
    updateAuthState,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

