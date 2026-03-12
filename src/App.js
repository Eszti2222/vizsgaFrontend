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
