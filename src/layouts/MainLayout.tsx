import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuthStore from '@/features/auth/store/useAuthStore';
import useChatStore, {type ChatMessage } from '@/features/chat/store/useChatStore';
import { stompClient } from '@/features/chat/api/stompClient';

const MainLayout: React.FC = () => {
  const { logout, user } = useAuthStore();
  const { currentRoomId } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const connectAndSubscribe = () => {
      stompClient.onConnect = (frame) => {
        console.log('Notification channel connected: ' + frame);

        // 개인 알림 채널 구독
        stompClient.subscribe(`/user/queue/notifications`, (message) => {
          if (message.body) {
            const notification: ChatMessage = JSON.parse(message.body);
            
            // 현재 보고 있는 채팅방이 아닐 경우에만 알림을 띄움
            if (notification.roomId !== currentRoomId) {
              toast.info(`New message in Room ${notification.roomId}: "${notification.content}"`);
            }
          }
        });
      };

      stompClient.activate();
    };

    connectAndSubscribe();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [user, currentRoomId]);

  const handleLogout = () => {
    logout();
    if (stompClient.connected) {
      stompClient.deactivate();
    }
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
