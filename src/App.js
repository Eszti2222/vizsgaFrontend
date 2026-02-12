import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router";

import RegisterPage from './pages/RegisterPage';
import NoPage from "./pages/NoPage";
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';

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
      path: "*",
      element: <NoPage />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
