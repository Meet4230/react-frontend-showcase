import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../../constants";

export const NavMobile = ({ isOpen, user, onclick }: any) => {
  return (
    <div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/login"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={DEFAULT_AVATAR}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <strong className="text-sm">{user?.username}</strong>
                      <span className="text-xs text-gray-500">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={onclick}
                    className="text-red-500 cursor-pointer hover:underline text-sm"
                  >
                    Logout
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
