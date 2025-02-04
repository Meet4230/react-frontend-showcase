import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import AppLayout from "../components/AppLayout";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <Register />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
