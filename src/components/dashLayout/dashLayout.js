"use client";

import Unauthorized from "@/components/unauthorized/unauthorized";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function DashLayout({ children, role }) {
  const { user } = useContext(AuthContext);
  if (user && role.includes(user.role)) {
    return <div>{children}</div>;
  } else {
    return <Unauthorized />;
  }
}
