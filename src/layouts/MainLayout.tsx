import React, { useEffect } from 'react';
import { Outlet, useNavigate, useMatch } from 'react-router';
import { toast } from 'react-toastify';
import Logo from '@/components/Logo';
import Avatar from '@/components/ui/Avatar';
import RoomList from '@/features/room/components/RoomList';
import useAuthStore from '@/features/auth/store/useAuthStore';
import useChatStore, { type ChatMessage } from '@/features/chat/store/useChatStore';
import { stompClient } from '@/features/chat/api/stompClient';

const MainLayout: React.FC = () => {
  const { logout, user } = useAuthStore();
  const { currentRoomId } = useChatStore();
  const navigate = useNavigate();
  const roomMatch = useMatch('/rooms/:roomId');
  const isChatOpen = Boolean(roomMatch);

  useEffect(() => {
    if (!user) return;

    const connectAndSubscribe = () => {
      stompClient.onConnect = (frame) => {
        console.log('Notification channel connected: ' + frame);

        stompClient.subscribe(`/user/queue/notifications`, (message) => {
          if (message.body) {
            const notification: ChatMessage = JSON.parse(message.body);

            if (notification.roomId !== currentRoomId) {
              toast.info(
                <div className="text-sm">
                  <span className="font-semibold">새 메시지</span>
                  <p className="mt-0.5 truncate text-surface-600">{notification.content}</p>
                </div>,
              );
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
    <div className="flex h-svh max-h-svh overflow-hidden bg-surface-100">
      {/* 채팅방 목록 패널 */}
      <aside
        className={`flex w-full shrink-0 flex-col border-r border-surface-200 bg-white md:w-80 lg:w-96 ${
          isChatOpen ? 'hidden md:flex' : 'flex'
        }`}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-surface-200/80 px-4 py-3">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Avatar name={user?.nickname ?? '게스트'} imageUrl={user?.profileImageUrl} size="sm" />
            <button
              type="button"
              onClick={handleLogout}
              title="로그아웃"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-surface-500 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>
        <RoomList />
      </aside>

      {/* 채팅 영역 */}
      <main
        className={`min-w-0 flex-1 flex-col bg-chat-bg ${isChatOpen ? 'flex' : 'hidden md:flex'}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
