"use client";

import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import API from "../lib/api";

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const init = async () => {
      try {
        await API.get("/health");
      } catch (err) {
        console.log(err);
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(4000 - elapsed, 0);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    init();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}