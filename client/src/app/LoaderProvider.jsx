"use client";

import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");

    if (!splashShown) {
      setLoading(true);

      const timer = setTimeout(() => {
        sessionStorage.setItem("splashShown", "true");
        setLoading(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}