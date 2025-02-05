import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

export default function AppLayout() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
}
