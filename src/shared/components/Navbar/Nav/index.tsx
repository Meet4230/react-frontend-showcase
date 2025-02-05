import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../../constants";
import { CloseIcon, MenuIcon } from "../../Icons";
import { User } from "../../../Interfaces";

interface INavProps {
  user: User | null;
  handleLogout: () => void;
  handleToggle: () => void;
  isOpen: boolean;
}

export const Nav = ({
  user,
  handleLogout,
  handleToggle,
  isOpen,
}: INavProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <span data-testid="nav-logo" className="font-bold text-xl">
            React Showcase
          </span>
        </div>
        <div className="items-center hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              to="/login"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Link to={`/profile/${user?._id}`}>
                      <img
                        src={user.avatar.url || DEFAULT_AVATAR}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </Link>

                    <div className="flex flex-col">
                      <strong className="text-sm">{user?.username}</strong>
                      <span className="text-xs text-gray-500">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer hover:underline text-sm"
                  >
                    Logout
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={handleToggle}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <MenuIcon /> : <CloseIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};
