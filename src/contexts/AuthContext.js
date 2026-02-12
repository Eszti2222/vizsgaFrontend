import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null); 
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }); 
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await api.get("/users/me"); 
      setUser(data);
    } catch (error) {
      console.log("getUser hiba:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout"); 
    } catch (error) {
      console.log("Logout hiba:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token"); 
      navigate("/bejelentkezes"); 
    }
  };

  const loginReg = async (adat, endpoint) => {
    // reset hibák
    setErrors({ name: "", email: "", password: "", password_confirmation: "" });
    setServerError(null);

    try {
      const response = await api.post(endpoint, adat);

      // token mentése
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // felhasználó adat frissítése
      await getUser();

      // sikeres navigáció a főoldalra
      navigate("/");
    } catch (error) {
      console.log("loginReg hiba:", error);

      if (error.response?.status === 422) {
        // backend validációs hibák
        setErrors(error.response.data.errors);
      } else {
        setServerError("Ismeretlen hiba történt.");
      }
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        serverError,
        loading,
        loginReg,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
