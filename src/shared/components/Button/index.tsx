import React from "react";
import { IButtonProps } from "../../Interfaces";

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant = "danger",
  className,
  type = "button",
  disabled,
}) => {
  const classNames = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-grey-200 text-white",
    danger: "bg-red-500 text-white",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${classNames[variant]} ${className} px-4 py-2 cursor-pointer `}
    >
      {children}
    </button>
  );
};

export default Button;
