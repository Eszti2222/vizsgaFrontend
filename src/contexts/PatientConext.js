import { createContext, useCallback, useContext, useState } from "react";
import { myAxios } from "../services/api";

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [patientError, setPatientError] = useState("");

  const loadPatients = useCallback(async () => {
    try {
      setLoadingPatients(true);
      setPatientError(null);

      const { data } = await myAxios.get("/api/doctor/patients");
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.response?.status === 401) {
        setPatientError("Nincs bejelentkezve, jelentkezz be újra.");
      } else {
        setPatientError("Nem sikerült betölteni a pácienseket.");
      }
    } finally {
      setLoadingPatients(false);
    }
  }, []);

  const loadPatientDetails = useCallback(async (patientId) => {
    const response = await myAxios.get(`/api/doctor/patients/${patientId}`);

    return {
      patient: response.data?.patient ?? null,
      appointments: Array.isArray(response.data?.appointments)
        ? response.data.appointments
        : [],
    };
  }, []);

  const createPatient = useCallback(async (payload) => {
    await myAxios.get("/sanctum/csrf-cookie");
    const response = await myAxios.post("/api/doctor/patients", payload);

    const createdPatient =
      response.data && typeof response.data === "object" && !Array.isArray(response.data)
        ? { ...payload, ...response.data }
        : { ...payload };

    return createdPatient;
  }, []);



  return (
    <PatientContext.Provider
      value={{
        patients,
        loadingPatients,
        patientError,
        loadPatients,
        setPatients,
        loadPatientDetails,
        createPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

// Kényelmi hook
export function usePatients() {
  return useContext(PatientContext);
}