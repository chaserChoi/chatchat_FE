import {create} from 'zustand';

interface User {
  id: string;
  nickname: string;
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  logout: () => {
    set({ user: null, isAuth: false });
    localStorage.removeItem('token');
  },
}));

export default useAuthStore;
