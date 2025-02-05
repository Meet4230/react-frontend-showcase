import type React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../Loading";
import { NavMobile } from "./NavMobile";
import { Nav } from "./Nav";

const Navbar: React.FC = () => {
  const { user, handleLogout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 text-white">
      <Nav
        user={user}
        handleLogout={handleLogout}
        handleToggle={toggleMenu}
        isOpen={isOpen}
      />
      <NavMobile user={user} isOpen={isOpen} onClick={handleLogout} />
    </nav>
  );
};

export default Navbar;
