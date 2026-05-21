import React from 'react';
import { useParams, useNavigate } from 'react-router';

export interface RoomItem {
  id: number;
  name: string;
  headCount: number;
  isSecret: boolean;
  lastMessage?: string;
  lastMessageAt?: string;
  unread?: number;
}

interface RoomListItemProps {
  room: RoomItem;
}

const RoomListItem: React.FC<RoomListItemProps> = ({ room }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const isActive = roomId === String(room.id);

  return (
    <button
      type="button"
      onClick={() => navigate(`/rooms/${room.id}`)}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
        isActive ? 'bg-brand-100/80' : 'hover:bg-surface-200/70 active:bg-surface-200'
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
          room.isSecret
            ? 'bg-surface-800 text-brand-300'
            : 'bg-linear-to-br from-brand-300 to-brand-500 text-surface-950'
        }`}
      >
        {room.isSecret ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          room.name.charAt(0)
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-semibold text-surface-900">{room.name}</span>
          {room.lastMessageAt && (
            <span className="shrink-0 text-[11px] text-surface-400">{room.lastMessageAt}</span>
          )}
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-surface-500">
            {room.lastMessage ?? `${room.headCount}명 참여 중`}
          </p>
          {room.unread ? (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[11px] font-bold text-surface-950">
              {room.unread}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default RoomListItem;
