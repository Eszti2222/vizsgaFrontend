import axios from "axios";

export const myAxios = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// ---- PUBLIKUS ----
export const getDoctors = () => {
  return myAxios.get("/doctors");
};

// Tokenes auth header
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
