import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function PatientLayout({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "patient") {
    return <div>Nincs jogosultságod a páciens felülethez.</div>;
  }

  return <>{children}</>;
}