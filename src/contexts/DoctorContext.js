import { createContext, useCallback, useContext, useState } from "react";
import { myAxios } from "../services/api";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorError, setDoctorError] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loadingDoctorAppointments, setLoadingDoctorAppointments] = useState(false);
  const [doctorAppointmentsError, setDoctorAppointmentsError] = useState("");

  const loadDoctors = useCallback(async () => {
    try {
      setLoadingDoctors(true);
      setDoctorError(null);

      const {data} = await myAxios.get("/api/doctors");
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Itt beállíthatsz felhasználóbarát hibaüzenetet
      if (error.response?.status === 401) {
        setDoctorError("Nincs bejelentkezve, jelentkezz be újra.");
      } else {
        setDoctorError("Nem sikerült betölteni az orvosokat.");
      }
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  const loadDoctorAppointments = useCallback(async () => {
    try {
      setLoadingDoctorAppointments(true);
      setDoctorAppointmentsError("");

      const res = await myAxios.get("/api/doctor/appointments");
      setDoctorAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (_error) {
      setDoctorAppointmentsError("Nem sikerült lekérni az időpontokat.");
    } finally {
      setLoadingDoctorAppointments(false);
    }
  }, []);



  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loadingDoctors,
        doctorError,
        loadDoctors,
        setDoctors,
        doctorAppointments,
        loadingDoctorAppointments,
        doctorAppointmentsError,
        loadDoctorAppointments,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

// Kényelmi hook
export function useDoctors() {
  return useContext(DoctorContext);
}