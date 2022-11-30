import { FC, ReactNode } from "react";

type ButtonProps = {
  variant: "blue" | "gray" | "red";
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ children, variant }) => {
  const buttonVariant: () => string = () => {
    if (variant === "blue") {
      return "text-blue-400 border-blue-400";
    }
    if (variant === "gray") {
      return "text-gray-400 border-gray-400";
    }
    if (variant === "red") {
      return "text-red-400 border-red-400";
    } else {
      return "";
    }
  };

  return (
    <button
      className={`${buttonVariant()} px-6 py-2 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out border-2 rounded-md hover:bg-black hover:bg-opacity-5`}
    >
      {children}
    </button>
  );
};

export default Button;
