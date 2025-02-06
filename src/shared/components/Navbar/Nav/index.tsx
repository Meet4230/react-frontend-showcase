import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../../constants";
import { CloseIcon, MenuIcon } from "../../Icons";
import { INavProps } from "../../../Interfaces";
import { useTheme } from "../../../context/ThemeContext";

export const Nav = ({
  user,
  handleLogout,
  handleToggle,
  isOpen,
}: INavProps) => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme from context

  return (
    <div className={`bg-gray-800"  transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center p-4">
            <span
              data-testid="nav-logo"
              className="font-bold text-xl text-white"
            >
              React Showcase
            </span>
          </div>

          <div className="flex items-center space-x-6 ml-auto">
            {/* User Details and Logout */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link to={`/profile/${user?._id}`}>
                    <img
                      src={user?.avatar?.url || DEFAULT_AVATAR}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-col text-right">
                    <strong className="text-sm text-white dark:text-gray-200">
                      {user?.username}
                    </strong>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <span
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer hover:underline text-sm dark:text-red-400"
                >
                  Logout
                </span>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {theme === "light" ? "🌙" : "🌞"}
              {/* Show moon for light theme and sun for dark theme */}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={handleToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? <MenuIcon /> : <CloseIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
