import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // AGAR request me pehle se Authorization ko false ya empty kiya hai, toh token mat jodo
    if (
      config.headers.Authorization === false ||
      config.headers.Authorization === ""
    ) {
      delete config.headers.Authorization; // Isse header clean ho jayega
      return config;
    }

    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
