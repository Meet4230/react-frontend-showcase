import { createBrowserRouter } from "react-router-dom";
// import App from "../../App";
import Register from "../pages/Register";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    errorElement: <div>Not Found</div>,
    children: [],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Not Found</div>,
    children: [],
  },
]);
