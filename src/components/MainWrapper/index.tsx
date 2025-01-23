import React from "react";

export default function MainWrapper({ children }: React.PropsWithChildren) {
  return <div className="font-poppins flex justify-center items-center min-h-screen">{children}</div>;
}
