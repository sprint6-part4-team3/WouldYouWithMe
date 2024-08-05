import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default AuthLayout;
