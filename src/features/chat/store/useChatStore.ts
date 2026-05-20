import {create} from 'zustand';

export interface ChatMessage {
  id: string; // 메시지 ID
  roomId: string; // 채팅방 ID
  sender: {
    id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  content: string;
  timestamp: string;
}

interface ChatState {
  currentRoomId: string | null;
  messages: ChatMessage[];
  setCurrentRoomId: (roomId: string | null) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
}

const useChatStore = create<ChatState>((set) => ({
  currentRoomId: null,
  messages: [],
  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
}));

export default useChatStore;
