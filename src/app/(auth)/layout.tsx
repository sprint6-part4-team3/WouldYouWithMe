import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default AuthLayout;
