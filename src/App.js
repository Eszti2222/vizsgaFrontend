
import { DoctorProvider } from "./contexts/DoctorContext";
import AboutUsPage from "./pages/AboutUsPage";
import GyikPage from "./pages/GyikPage";
import ContactsPage from "./pages/ContactsPage";
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import authMiddleware from "./middleware/autMiddleware";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import Layout from "./layouts/Layout";
import DocumentsPage from "./pages/DocumentsPage";
import TimeTablePage from "./pages/TimeTablePage";
import ProfilePage from "./pages/ProfilePage";
//doctor
import BookedTimes from "./pages/doctor/BookedTimes";
import DoctorPatientDetailsPage from "./pages/doctor/DoctorPatientDetailsPage";
import DocumentUpload from "./components/doctor/DocumentUpload";
import DoctorPatientsList from "./components/doctor/DoctorPatientsList";
//admin
import AdminHomePage from "./pages/admin/AdminHomePage";
//patient
import PatientBookedAppointmentsPage from "./pages/patient/PatientBookedAppointmentsPage";
import AdminUserList from "./components/admin/AdminUsersList";
import PatientDocumentsPage from "./pages/patient/PatientDocumentsPage";
import SpecialordersPage from "./pages/patient/SpecialordersPage";
import DoctorDetailsPage from "./pages/patient/DoctorDetailsPage";
import PatientHomePage from "./pages/patient/PatientHomePage";
import DoctorsPage from "./pages/DoctorsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      //kell külön adminlayout, patient stb...
      element: <Layout />,
      //middleware: [authMiddleware],
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "/timetable",
          element: <TimeTablePage />,
        },
        /*{
          path: "/documents",   //legyen erre külön útvonala mindenkinek pl:
          element: <DocumentsPage />,
        },*/
        {
          path: "/specialorders",
          element: <SpecialordersPage />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage />,
        },
        {
          path: "/adoctors",
          element: <AdminUserList />,
        },
        {
          path: "/doctors/:id",
          element: <DoctorDetailsPage />,
        },
        {
          path: "/appointments",
          element: <BookedTimes />,
        },
        {
          path: "/patients",
          element: <DoctorPatientsList />,
        },
        {
          path: "/patients/:id",
          element: <DoctorPatientDetailsPage />,
        },
        {
          path: "/appointments-list",
          element: <BookedTimes />,
        },
        {
          path: "/document-upload",
          element: <DocumentUpload />,
        },
        {
          path: "/aboutus",
          element: <AboutUsPage />,
        },
        {
          path: "/gyik",
          element: <GyikPage />,
        },
        {
          path: "/contacts",
          element: <ContactsPage />,
        },
        {
          path: "/admin",
          element: <AdminHomePage />,
        },
        {
          path: "/patient-home",
          element: <PatientHomePage />,
        },
        {
          path: "/doctors/:id/timetable",
          element: <TimeTablePage />,
        },
        {
          path: "/patient-my-appointments",
          element: <PatientBookedAppointmentsPage />,
        },
        {
          path: "/patient-my-documents",
          element: <PatientDocumentsPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NoPage />,
    },
  ]);

  return (
    <AuthProvider>
      <DoctorProvider>
        <RouterProvider router={router} />
      </DoctorProvider>
    </AuthProvider>
  );
}

export default App;
