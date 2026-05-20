import React from 'react';
import { useNavigate } from 'react-router';

// 더미 데이터
const dummyRooms = [
  { id: 1, name: '일반 채팅방 1', headCount: 5, isSecret: false },
  { id: 2, name: '비밀 채팅방 1', headCount: 2, isSecret: true },
  { id: 3, name: '팀 프로젝트 회의', headCount: 10, isSecret: false },
  { id: 4, name: '나만의 비밀방', headCount: 1, isSecret: true },
];

const RoomList: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterRoom = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">채팅방 목록</h2>
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          방 만들기
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dummyRooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col justify-between p-4 transition-shadow bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
            onClick={() => handleEnterRoom(room.id)}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{room.name}</h3>
              {room.isSecret && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{room.headCount}명 참여 중</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800">입장</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
