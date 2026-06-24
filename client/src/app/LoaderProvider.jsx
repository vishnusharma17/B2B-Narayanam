"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      router.push("/");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}