import React, { useContext } from "react";
import Navigation from "../pages/Navigation";
import { AuthContext } from "../contexts/AuthContext";

export default function DoctorLayout({ children }) {
	const { user } = useContext(AuthContext);

	if (!user || user.role !== "doctor") {
		return <div>Nincs jogosultságod az orvosi felülethez.</div>;
	}

	return (
		<div className="doctor-layout">
			<Navigation />
			<main className="doctor-main">
				{children}
			</main>
		</div>
	);
}
