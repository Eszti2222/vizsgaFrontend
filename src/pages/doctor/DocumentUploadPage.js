import React from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import DocumentUpload from "../../components/doctor/DocumentUpload";

export default function DocumentUploadPage() {
  return (
    <DoctorLayout>
      <DocumentUpload />
    </DoctorLayout>
  );
}
