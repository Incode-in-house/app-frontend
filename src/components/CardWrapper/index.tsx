import classNames from "classnames";
import React from "react";

export interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <div className={classNames("px-6 py-8 max-w-[800px] w-full shadow-sm rounded-lg border-2", className)}>
      {children}
    </div>
  );
}
