import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
