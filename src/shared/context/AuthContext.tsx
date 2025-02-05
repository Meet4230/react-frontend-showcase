import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CURRENT_USER, LOGOUT_USER } from "../constants/apiRoutes";
import { getRequest, postRequest } from "../api";
import { useLocation } from "react-router-dom";
import { removeItem } from "../utils/localstorage";

export interface User {
  username: string;
  avatar: string;
  role: string;
  email: string;
  accessToken: string;
}

interface AuthContextProps {
  user: User | null;
  handleLogout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be use within Auth Provider");
  }

  return context;
}

type AuthProviderProps = PropsWithChildren;
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const publicRoutes = ["/", "/login", "/forgot-password"];

  async function getCurrentUser() {
    try {
      const userData = await getRequest<User>(CURRENT_USER);

      if (userData) {
        setUser(userData.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!publicRoutes.includes(location.pathname)) {
      getCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  async function handleLogout() {
    try {
      await postRequest(LOGOUT_USER);
      setUser(null);
      removeItem("accessToken");
      window.location.href = "/login";
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
