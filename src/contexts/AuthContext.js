import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { myAxios, getAuthHeaders } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  async function login(adat) {
    setLoading(true);

    try {
      const response = await myAxios.post("/login", adat);

      localStorage.setItem("token", response.data.access_token);
      setToken(response.data.access_token);
      setUser(response.data.user);

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      hibakezeles(error);
    } finally {
      setLoading(false);
    }
  }

  async function register(adat) {
    setLoading(true);
    try {
      await myAxios.post("/register", adat);

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      hibakezeles(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      setUser(null);
      return;
    }

    setToken(savedToken);
    setLoading(true);

    myAxios
      .get("/profile", { headers: getAuthHeaders() })
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.log(error);
        setUser(null);
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  function hibakezeles(error) {
    const status = error.response?.status;
    if (status === 400) {
      setServerError("A megadott adatok nem szerepelnek az adatbázisban");
    } else if (status === 401) {
      setServerError(
        "A hitelesítési token érvénytelen vagy lejárt. Menj a login oldalra!"
      );
    } else if (status === 403) {
      setServerError("Nincs jogosultsága a kért művelethez!");
    } else if (status === 404) {
      setServerError("A kért erőforrás nem található!");
    } else if (status === 422) {
      setServerError("Validációs hiba");
    } else if (status === 500) {
      setServerError("Szerver hiba történt.");
    } else {
      setServerError("Ismeretlen hiba történt.");
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, register, loading, user, logout, serverError, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
