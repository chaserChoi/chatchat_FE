import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { stompClient } from '@/features/chat/api/stompClient';
import useChatStore, { type ChatMessage } from '@/features/chat/store/useChatStore';
import useAuthStore from '@/features/auth/store/useAuthStore';
import { getRoomById } from '@/features/room/data/dummyRooms';
import MessageBubble from '@/features/chat/components/MessageBubble';

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { messages, addMessage, setCurrentRoomId, setMessages } = useChatStore();
  const { user } = useAuthStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const room = roomId ? getRoomById(roomId) : undefined;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;

    setCurrentRoomId(roomId);
    setMessages([]);

    const connectAndSubscribe = () => {
      stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);

        stompClient.subscribe(`/topic/chat.room.${roomId}`, (message) => {
          if (message.body) {
            const newMsg: ChatMessage = JSON.parse(message.body);
            addMessage(newMsg);
          }
        });
      };

      stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      stompClient.activate();
    };

    connectAndSubscribe();

    return () => {
      setCurrentRoomId(null);
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [roomId, addMessage, setCurrentRoomId, setMessages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && roomId && stompClient.connected) {
      const messagePayload = {
        roomId,
        content: inputMessage,
        senderId: user?.id || 'anonymous',
      };

      stompClient.publish({
        destination: `/app/chat.send.${roomId}`,
        body: JSON.stringify(messagePayload),
      });
      setInputMessage('');
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center gap-3 border-b border-surface-200/50 bg-white/95 px-4 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => navigate('/rooms')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-surface-600 transition-colors hover:bg-surface-100 md:hidden"
          aria-label="채팅 목록으로"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-surface-900">
            {room?.name ?? `채팅방 ${roomId}`}
          </h1>
          <p className="text-xs text-surface-500">
            {room?.isSecret ? '🔒 비밀 채팅방' : `${room?.headCount ?? 0}명 참여 중`}
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-surface-500 hover:bg-surface-100"
          title="메뉴"
          aria-label="채팅방 메뉴"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </header>

      <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-surface-500/90">아직 메시지가 없어요. 첫 인사를 건네보세요!</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <MessageBubble key={msg.id ?? index} message={msg} isMe={msg.sender.id === user?.id} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="shrink-0 border-t border-surface-200/40 bg-white/95 px-3 py-3 backdrop-blur-md safe-bottom">
        <form onSubmit={sendMessage} className="mx-auto flex max-w-3xl items-end gap-2">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-surface-500 transition-colors hover:bg-surface-100"
            title="파일 첨부"
            aria-label="파일 첨부"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 4 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <div className="relative min-w-0 flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="w-full rounded-2xl border border-surface-200 bg-surface-50 px-4 py-3 pr-12 text-[15px] text-surface-900 placeholder:text-surface-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-400/20"
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-900 text-white transition-all hover:bg-surface-800 disabled:bg-surface-300 disabled:cursor-not-allowed"
            aria-label="메시지 보내기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatRoom;
