
import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
import DoctorAppointmentsList from "../../components/doctor/DoctorAppointmentsList";

export default function BookedTimes() {
	const { user } = useContext(AuthContext);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		const loadAppointments = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await myAxios.get("/api/doctor/appointments");
				setAppointments(Array.isArray(res.data) ? res.data : []);
			} catch (error) {
				setError("Nem sikerült lekérni az időpontokat.");
			} finally {
				setLoading(false);
			}
		};

		loadAppointments();
	}, [user]);

	return (
		<DoctorLayout>
			<div className="booked-times-page">
				<h2>Foglalt időpontjaim</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && <DoctorAppointmentsList appointments={appointments} />}
			</div>
		</DoctorLayout>
	);
}
