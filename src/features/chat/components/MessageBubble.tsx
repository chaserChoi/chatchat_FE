import React from 'react';
import type { ChatMessage } from '@/features/chat/store/useChatStore';

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
}

const formatTime = (timestamp: string) => {
  try {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  return (
    <div className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isMe && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-300 text-xs font-semibold text-surface-700">
          {message.sender.nickname.charAt(0)}
        </div>
      )}
      <div className={`flex max-w-[75%] flex-col gap-0.5 sm:max-w-[65%] ${isMe ? 'items-end' : 'items-start'}`}>
        {!isMe && (
          <span className="px-1 text-xs font-medium text-surface-600">{message.sender.nickname}</span>
        )}
        <div className="flex items-end gap-1.5">
          {isMe && (
            <time className="shrink-0 text-[10px] text-surface-500/80">
              {formatTime(message.timestamp)}
            </time>
          )}
          <div
            className={`rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed shadow-sm ${
              isMe
                ? 'rounded-tr-sm bg-chat-mine text-surface-950'
                : 'rounded-tl-sm border border-surface-200/60 bg-chat-other text-surface-900'
            }`}
          >
            <p className="break-words whitespace-pre-wrap">{message.content}</p>
          </div>
          {!isMe && (
            <time className="shrink-0 text-[10px] text-surface-500/80">
              {formatTime(message.timestamp)}
            </time>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
