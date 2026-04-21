import { createContext, useCallback, useContext, useState } from "react";
import { myAxios } from "../services/api";

const PatientSpecializationContext = createContext();

export function PatientSpecializationProvider({ children }) {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingSpecializations, setLoadingSpecializations] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState("");

  const loadSpecializations = useCallback(async () => {
    try {
      setLoadingSpecializations(true);
      setError("");

      const { data } = await myAxios.get("/api/specializations");
      setSpecializations(Array.isArray(data) ? data : []);
    } catch {
      setError("Nem sikerült betölteni a szakrendeléseket.");
    } finally {
      setLoadingSpecializations(false);
    }
  }, []);

  const loadDoctorsBySpecialization = useCallback(async (specialization) => {
    try {
      setLoadingDoctors(true);
      setError("");

      const { data } = await myAxios.get(
        `/api/doctors?specialization=${encodeURIComponent(specialization)}`
      );
      setDoctors(Array.isArray(data) ? data : []);
    } catch {
      setError("Nem sikerült betölteni az orvosokat.");
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  return (
    <PatientSpecializationContext.Provider
      value={{
        specializations,
        doctors,
        loadingSpecializations,
        loadingDoctors,
        error,
        loadSpecializations,
        loadDoctorsBySpecialization,
      }}
    >
      {children}
    </PatientSpecializationContext.Provider>
  );
}

export function usePatientSpecializations() {
  return useContext(PatientSpecializationContext);
}