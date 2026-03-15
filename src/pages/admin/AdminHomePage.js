import React from "react";
import DoctorLayout from "../../layouts/DoctorLayout";

export default function AdminHomePage() {
  return (
    <DoctorLayout>
      <div className="admin-home">
        <h1>Üdvözöljük az admin felületen!</h1>
        <p>Itt kezelheti a felhasználókat, jogosultságokat és rendszerbeállításokat.</p>
      </div>
    </DoctorLayout>
  );
}
