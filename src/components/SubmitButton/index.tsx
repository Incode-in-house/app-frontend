import classNames from "classnames";
import React from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={classNames(
        "w-full h-11 text-lg uppercase font-semibold  bg-blue-500 text-white rounded-md transition-colors duration-200 hover:bg-blue-600",
        className
      )}
      {...props}>
      {children}
    </button>
  );
}
