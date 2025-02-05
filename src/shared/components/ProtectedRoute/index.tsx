import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "../../Interfaces";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 5000;
const COUNTDOWN_INTERVAL = 1000;

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User["role"];
};

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const [countDown, setCountDown] = useState(5);
  const navigate = useNavigate();

  if (user === undefined) {
    return <Loading />;
  }

  useEffect(() => {
    if (user === null) {
      const interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, COUNTDOWN_INTERVAL);

      const timer = setTimeout(() => {
        navigate("/login");
      }, REDIRECT_DELAY);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [user, navigate]);

  if (user === null || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        Permission denied. Going back to home after {countDown} seconds...
      </div>
    );
  }

  return children;
}
