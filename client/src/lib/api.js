import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://b2b-narayanam.onrender.com/",
});

export default API;
