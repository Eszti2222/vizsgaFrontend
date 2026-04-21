import { myAxios } from "../services/api";
import { createContext, useCallback, useContext, useState } from "react";

export const PatientAppointmentsContext = createContext();

export function PatientAppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");

  const loadPatientAppointments = useCallback(async (order = "asc") => {
    try {
      setLoadingAppointments(true);
      setAppointmentsError("");

      const res = await myAxios.get(`/api/appointments?order=${order}`);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (_error) {
      setAppointmentsError("Nem sikerült lekérni az időpontokat.");
    } finally {
      setLoadingAppointments(false);
    }
  }, []);

  const deleteAppointment = useCallback(async (id) => {
    await myAxios.delete(`/api/appointments/${id}`);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <PatientAppointmentsContext.Provider
      value={{
        appointments,
        loadingAppointments,
        appointmentsError,
        loadPatientAppointments,
        deleteAppointment,
      }}
    >
      {children}
    </PatientAppointmentsContext.Provider>
  );
}

// kényelmi hook
export function usePatientAppointments() {
  return useContext(PatientAppointmentsContext);
}