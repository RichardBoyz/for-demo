"use client";
import { handleLogin, handleLogout } from "@/services/auth";
import Parse from "parse";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    // 檢查本地儲存的 session token
    const sessionToken = localStorage.getItem("sessionToken");

    if (sessionToken) {
      Parse.User.become(sessionToken)
        .then((currentUser) => {
          setUser(currentUser);
        })
        .catch((error) => {
          console.error("Session restore failed:", error);
          localStorage.removeItem("sessionToken");
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = handleLogin(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      handleLogout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    isAuthenticating,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
