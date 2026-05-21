import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatEmpty from './features/chat/components/ChatEmpty';
import ChatRoom from './features/chat/components/ChatRoom';

function App() {
  return (
    <>
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
            <Route path="/rooms" element={<ChatEmpty />} />
            <Route path="/rooms/:roomId" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="!top-4"
        toastClassName="!rounded-2xl !shadow-card !font-sans"
      />
    </>
  );
}

export default App;
