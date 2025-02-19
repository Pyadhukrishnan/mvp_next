import React from "react";
import ClientLoader from "../client-loader/client-loader";

const LoadingPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientLoader>
      {children}
    </ClientLoader>
  );
};

export default LoadingPage;
