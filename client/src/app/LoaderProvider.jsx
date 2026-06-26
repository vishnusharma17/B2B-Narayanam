"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import API from "../lib/api";

export default function LoaderProvider({ children }) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Splash sirf Home page par chalega
    if (pathname !== "/") return;

    // Ek session me sirf ek baar
    const splashShown = sessionStorage.getItem("splashShown");

    if (splashShown) return;

    setLoading(true);

    const startTime = Date.now();

    const init = async () => {
      try {
        // Backend wakeup
        await API.get("/health");
      } catch (err) {
        console.log(err);
      }

      const elapsed = Date.now() - startTime;

      // Minimum 4 second splash
      const remaining = Math.max(4000 - elapsed, 0);

      setTimeout(() => {
        sessionStorage.setItem("splashShown", "true");
        setLoading(false);
      }, remaining);
    };

    init();
  }, [pathname]);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}