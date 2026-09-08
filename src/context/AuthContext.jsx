import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));
  const [loginRequested, setLoginRequested] = useState(false);

  const value = useMemo(() => ({
    isLoggedIn,
    login: () => {
      localStorage.setItem("token", "local-session");
      setIsLoggedIn(true);
      setLoginRequested(false);
    },
    logout: () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    },
    requestLogin: () => setLoginRequested(true),
    clearLoginRequest: () => setLoginRequested(false),
    loginRequested,
  }), [isLoggedIn, loginRequested]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
