import React from 'react';
import { Outlet } from 'react-router';
import Logo from '@/components/Logo';

const AuthLayout: React.FC = () => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-100 via-surface-50 to-surface-200"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-surface-300/40 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mb-8">
        <Logo size="lg" className="justify-center" />
        <p className="mt-2 text-center text-sm text-surface-500">
          언제 어디서나, 가볍고 빠른 실시간 채팅
        </p>
      </div>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
