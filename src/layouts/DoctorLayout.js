import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function DoctorLayout({ children }) {
	const { user } = useContext(AuthContext);

	if (!user || user.role !== "doctor") {
		return <div>Nincs jogosultságod az orvosi felülethez.</div>;
	}

	return <>{children}</>;
}
