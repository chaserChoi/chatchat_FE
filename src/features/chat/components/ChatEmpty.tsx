import React from 'react';

const ChatEmpty: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-200/80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-surface-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-surface-800">대화를 시작해 보세요</h2>
        <p className="mt-1 max-w-xs text-sm text-surface-400">
          왼쪽 목록에서 채팅방을 선택하거나 새 방을 만들어 메시지를 보낼 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default ChatEmpty;
