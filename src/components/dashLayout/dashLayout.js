"use client";

import Unauthorized from "@/components/unauthorized/unauthorized";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function DashLayout({ children }) {
  const { user } = useContext(AuthContext);
  if (user && ["Admin", "Manager"].includes(user.role)) {
    return <div>{children}</div>;
  } else {
    return <Unauthorized />;
  }
}
