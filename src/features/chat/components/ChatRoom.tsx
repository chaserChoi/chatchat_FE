import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { stompClient } from '../api/stompClient';
import useChatStore, {type ChatMessage } from '../store/useChatStore';
import useAuthStore from '@/features/auth/store/useAuthStore';

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { messages, addMessage, setCurrentRoomId, setMessages } = useChatStore();
  const { user } = useAuthStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;

    // 방에 들어왔을 때 초기화
    setCurrentRoomId(roomId);
    setMessages([]); // 실제로는 과거 메시지를 fetch 해와야 함

    // STOMP 연결 및 구독
    const connectAndSubscribe = () => {
      stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);

        // 해당 채팅방 구독
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
      // 컴포넌트 언마운트 시 구독 해제 및 상태 초기화
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
      
      // 메시지 전송
      stompClient.publish({
        destination: `/app/chat.send.${roomId}`,
        body: JSON.stringify(messagePayload),
      });
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/rooms')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Room {roomId}</h2>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => {
            const isMe = msg.sender.id === user?.id;
            return (
              <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {!isMe && <span className="block mb-1 text-xs font-semibold text-gray-500">{msg.sender.nickname}</span>}
                  <p className="text-sm break-words">{msg.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 shrink-0 rounded-b-xl">
        <form onSubmit={sendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || !stompClient.connected}
            className="p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
