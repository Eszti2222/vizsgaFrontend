import React, { useEffect, useState } from "react";
//import axios from "axios";
import { getDoctors } from "../services/api";


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  function getDoctors() {
    axios
      //.get("http://127.0.0.1:8000/api/doctors")
      getDoctors()
      .then(response => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div>
      <h2>Orvosaink</h2>

      {doctors.length === 0 && <p>Nincs megjeleníthető orvos</p>}

      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            <strong>{doctor.name}</strong><br />
            Szakterület: {doctor.specialization}<br />
            Rendelő: {doctor.office_location}
          </li>
        ))}
      </ul>
    </div>
  );
}
