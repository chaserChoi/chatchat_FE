import React, { useState } from 'react';
import RoomListItem from '@/features/room/components/RoomListItem';
import { dummyRooms } from '@/features/room/data/dummyRooms';
import Button from '@/components/ui/Button';

const RoomList: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = dummyRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 space-y-3 px-4 pb-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-surface-900">채팅</h2>
          <Button variant="secondary" size="sm" className="shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            새 방
          </Button>
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="채팅방 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border-0 bg-surface-200/80 py-2.5 pr-3 pl-10 text-sm text-surface-900 placeholder:text-surface-400 focus:bg-white focus:ring-2 focus:ring-brand-400/30 focus:outline-none"
          />
        </div>
      </div>

      <ul className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-surface-400">검색 결과가 없습니다</li>
        ) : (
          filtered.map((room) => (
            <li key={room.id}>
              <RoomListItem room={room} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RoomList;
