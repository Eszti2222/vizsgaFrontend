import { createContext, useCallback, useContext, useState } from "react";
import { myAxios } from "../services/api";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorError, setDoctorError] = useState(null);

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



  return (
    <DoctorContext.Provider
      value={{
        doctors,
        loadingDoctors,
        doctorError,
        loadDoctors,setDoctors
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