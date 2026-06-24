"use client";

import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import API from "../lib/api";

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await API.get("/health");

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);

        setTimeout(checkBackend, 2000);
      }
    };

    checkBackend();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}