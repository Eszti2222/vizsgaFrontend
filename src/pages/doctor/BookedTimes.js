
import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import DoctorAppointmentsList from "../../components/doctor/DoctorAppointmentsList";
import { useDoctors } from "../../contexts/DoctorContext";

export default function BookedTimes() {
	const { user } = useContext(AuthContext);
	const {
		doctorAppointments,
		loadingDoctorAppointments,
		doctorAppointmentsError,
		loadDoctorAppointments,
	} = useDoctors();

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		loadDoctorAppointments();
	}, [loadDoctorAppointments, user]);

	return (
		<DoctorLayout>
			<div className="booked-times-page">
				<h2>Foglalt időpontjaim</h2>
				{loadingDoctorAppointments && <p>Betöltés...</p>}
				{doctorAppointmentsError && <p className="text-danger">{doctorAppointmentsError}</p>}
				{!loadingDoctorAppointments && !doctorAppointmentsError && (
					<DoctorAppointmentsList appointments={doctorAppointments} />
				)}
			</div>
		</DoctorLayout>
	);
}
