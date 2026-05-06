import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://sanad-backend.vercel.app";

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
