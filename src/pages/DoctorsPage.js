import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../contexts/DoctorContext";
import DoctorComponent from "../components/patient/DoctorComponent";

export default function DoctorsPage() {
  const { doctors, loadingDoctors, doctorError, loadDoctors, setDoctors } =
    useContext(DoctorContext);

  useEffect(() => {
    loadDoctors();
    console.log(doctors);
  }, []);
  return (
    <div>
      <h2>Orvosaink</h2>

      {doctors.length === 0 && <p>Nincs megjeleníthető orvos</p>}

      <ul>
        {doctors.map((doctor, i) => {
          return <DoctorComponent doctor={doctor} key={i} />;
        })}
      </ul>
    </div>
  );
}

