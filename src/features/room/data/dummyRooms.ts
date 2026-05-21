import type { RoomItem } from '@/features/room/components/RoomListItem';

export const dummyRooms: RoomItem[] = [
  {
    id: 1,
    name: '일반 채팅방 1',
    headCount: 5,
    isSecret: false,
    lastMessage: '내일 회의 시간 확인 부탁해요',
    lastMessageAt: '오후 2:30',
    unread: 2,
  },
  {
    id: 2,
    name: '비밀 채팅방 1',
    headCount: 2,
    isSecret: true,
    lastMessage: '비밀번호 입력 후 입장',
    lastMessageAt: '어제',
  },
  {
    id: 3,
    name: '팀 프로젝트 회의',
    headCount: 10,
    isSecret: false,
    lastMessage: 'PR 리뷰 부탁드립니다 🙏',
    lastMessageAt: '오전 11:20',
    unread: 5,
  },
  {
    id: 4,
    name: '나만의 비밀방',
    headCount: 1,
    isSecret: true,
    lastMessage: '메모장',
    lastMessageAt: '3/12',
  },
];

export const getRoomById = (id: string) => dummyRooms.find((r) => String(r.id) === id);
