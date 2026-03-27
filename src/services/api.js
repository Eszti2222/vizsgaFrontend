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

//export const getDoctorPatients = async () => {
//  return myAxios.get("/doctor/patients");
//};
//
//export const getDoctorPatient = async (patientId) => {
//  return myAxios.get(`/doctor/patients/${patientId}`);
//};
//
//export const getDoctorAppointments = async () => {
//  return myAxios.get("/doctor/appointments");
//};
//
//export const uploadDoctorDocument = async (formData) => {
//  return myAxios.post("/doctor/documents", formData, {
//    headers: { "Content-Type": "multipart/form-data" },
//  });
//};

export default myAxios;