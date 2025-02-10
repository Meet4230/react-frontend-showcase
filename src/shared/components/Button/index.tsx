import React from "react";
import { IButtonProps } from "../../Interfaces";
import { cn } from "../../utils/cn"; // Utility function to merge class names

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type,
  disabled,
  asChild = false,
}) => {
  const classNames = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    link: "text-blue-600 hover:text-blue-800 underline",
  };

  const Component = asChild ? "span" : "button";

  return (
    <Component
      {...(!asChild && { type, disabled, onClick })} // Apply only if not asChild
      className={cn(
        "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
        classNames[variant],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Button;
