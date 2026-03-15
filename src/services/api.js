import axios from "axios";

export const myAxios = axios.create({
    // Alap backend API kiszolgáló elérési útjának beállítása
    baseURL: "http://localhost:8000",
    // Beállítjuk, hogy a kérések azonosítása cookie-k segítségével történik.
    withCredentials: true,
});

myAxios.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }
    return config;
  },
  (error) => {
    // Hiba esetén írjuk ki a hibát, vagy végezzünk hibakezelést
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// API helper functions

// Saját páciensek listázása (GET /patient/o_id)
export const getDoctorPatients = async (doctorId) => {
  return myAxios.get(`/patient/${doctorId}`);
};


// Egy páciens kiválasztása (GET /patient/p_id)
export const getPatientWithAppointments = async (patientId) => {
  return myAxios.get(`/patient/${patientId}`);
};


// Páciensek időpontjainak listázása (GET /appointments/o_id)
export const getDoctorAppointments = async (doctorId) => {
  return myAxios.get(`/appointments/${doctorId}`);
};


// Dokumentum feltöltés pácienshez (POST /documents)
export const uploadDocument = async (formData) => {
  return myAxios.post(`/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default myAxios;