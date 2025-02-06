import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import AppLayout from "../components/AppLayout";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import UserProfilePage from "../pages/UserProfile/UserProfilePage";
import Todo from "../../features/todo-list/pages/Todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile/:_id",
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/todo-app",
        element: <Todo />,
      },
    ],
  },
]);
