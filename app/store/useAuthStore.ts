import {create} from 'zustand'
import {persist} from 'zustand/middleware'
interface User {
  id: string;
  email: string;
  phone:string;
  role: string;
  name?:string;
  facilitatorId?:string
  seekerId?:string
  token:string,
  profileImage?:string
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);