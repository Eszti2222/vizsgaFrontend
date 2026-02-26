import { createContext, useContext, useEffect, useState } from "react";

import { myAxios, getAuthHeaders } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    console.log(adat, vegpont);

    try {
      await myAxios.post(vegpont, adat);
      console.log("siker");
      //sikeres bejelentkezés/regisztráció esetén
      //Lekérdezzük a usert
      //await getUser();
      //elmegyünk  a kezdőlapra
      loadUser()
      window.location.href = "/home";

    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        hibakezeles(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [])

  const loadUser = async () => {
    try {
      await csrf(); // CSRF cookie lekérése
      const { data } = await myAxios.get("/api/profile");
      console.log(data)
      setUser(data);
    } catch(err) {
      console.log(err);
    }
  }

  const logout = async () => {
    await csrf();

    myAxios.post("/logout").then((resp) => {
      setUser(null);
      console.log(resp);
    });
  };

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
    <AuthContext.Provider value={{ logout, loginReg, hibakezeles, loadUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}
