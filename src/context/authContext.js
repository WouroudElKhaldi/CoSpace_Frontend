"use client";

import { useState, useEffect, createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { redirect } from "next/navigation";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  useEffect(() => {
    if (!user && user === null) {
      fetchUserData();
    }
  }, [user, userUpdated]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.get("user/logged-in-user");
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setCheckUser(false);
    }
  };

  const logOut = async () => {
    await axiosInstance.post("user/logout");
    setUser(null);
    redirect("/");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        checkUser,
        setUser,
        logOut,
        fetchUserData,
        setUserUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
