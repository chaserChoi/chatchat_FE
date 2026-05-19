import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RoomList from './features/room/components/RoomList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Main Application Routes */}
        <Route element={<MainLayout />}>
          <Route path="/rooms" element={<RoomList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
