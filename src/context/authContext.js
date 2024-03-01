"use client";

import { useState, useEffect, createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Logout } from "@/fetchData/auth";
import useAlertStore from "@/zustand/alertStore";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { alertData, setAlertData } = useAlertStore();
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(true);
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

  const LogOut = () => {
    Logout();
    setUser(null);
    setAlertData({
      type: "success",
      message: "Logged  out  successfully 😁 !",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        checkUser,
        setUser,
        LogOut,
        fetchUserData,
        setUserUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
