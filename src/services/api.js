import axios from "axios";

export const myAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- PUBLIKUS ----
export const getDoctors = () => {
  return myAxios.get("/doctors");
};

// ---- AUTH ----
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};


// KÉSŐBB IDE JÖN:
// export const login = (data) => api.post("/login", data);
// export const getAppointments = () => api.get("/appointments");
// export const getPatients = () => api.get("/patients");