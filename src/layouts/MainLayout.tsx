import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import useAuthStore from '@/features/auth/store/useAuthStore';

const MainLayout: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col items-center w-16 py-4 bg-white shadow-md md:w-64">
        <div className="flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-indigo-600">CC</span>
        </div>
        <nav className="flex flex-col flex-1 mt-10 space-y-2">
          {/* Navigation items can be added here */}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"
          >
            {/* Logout Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
