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
import BookedTimes from "./pages/doctor/BookedTimes";
import AdminHomePage from "./pages/admin/AdminHomePage";
import PatientHomePage from "./pages/PatientHomePage";
import DoctorPatientsList from "./components/doctor/DoctorPatientsList";
import DoctorAppointmentsList from "./components/doctor/DoctorAppointmentsList";
import DoctorPatientDetails from "./components/doctor/DoctorPatientDetails";
import DocumentUpload from "./components/doctor/DocumentUpload";
import TimeTablePage from "./pages/TimeTablePage";
import ProfilePage from "./pages/ProfilePage";
import SpecialordersPage from "./pages/SpecialordersPage";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import { DoctorProvider } from "./contexts/DoctorContext";

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
        {
          path: "/documents",
          element: <DocumentsPage />,
        },
        {
          path: "/specialorders",
          element: <SpecialordersPage />,
        },
        {
          path: "/doctors",
          element: <DoctorsPage />,
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
          path: "/appointments-list",
          element: <DoctorAppointmentsList />,
        },
        {
          path: "/patients/:id",
          element: <DoctorPatientDetails />,
        },
        {
          path: "/document-upload",
          element: <DocumentUpload />,
        },
        {
          path: "/admin",
          element: <AdminHomePage />,
        },
        {
          path: "/patient-home",
          element: <PatientHomePage />,
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
