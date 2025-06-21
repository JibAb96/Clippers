"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/User/user";

export default function ClientSessionProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const userType = localStorage.getItem("userType") as
      | "creator"
      | "clipper"
      | null;

    if (token && userString && userType) {
      try {
        const user = JSON.parse(userString);
        dispatch(setUser({ user, token, role: userType, refreshToken: null }));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
      }
    }
  }, [dispatch]);

  return null;
}
