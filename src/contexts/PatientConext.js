import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../services/api";
import { AuthContext } from "./AuthContext";

export const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [patientError, setPatientError] = useState(null);

  // AuthContext-ből meg tudod nézni, hogy van-e user
  const { user } = useContext(AuthContext);

  const loadPatients = async () => {
    try {
      setLoadingPatients(true);
      setPatientError(null);

      const {data} = await myAxios.get("/api/doctor/patients");
      console.log(data)
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Itt beállíthatsz felhasználóbarát hibaüzenetet
      if (error.response?.status === 401) {
        setPatientError("Nincs bejelentkezve, jelentkezz be újra.");
      } else {
        setPatientError("Nem sikerült betölteni az orvosokat.");
      }
    } finally {
      setLoadingPatients(false);
    }
  };

    function loadPatients1() {
    myAxios
      .get("/api/doctor/patients")
      .then(function (response) {
        // handle success
        console.log(response.data);
            setPatients(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  // Ha be van jelentkezve a user, automatikusan betölthetjük az orvosokat


  return (
    <PatientContext.Provider
      value={{
        patients: patients,
        loadingPatients: loadingPatients,
        patientError: patientError,
        loadPatients: loadPatients,setPatients: setPatients
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