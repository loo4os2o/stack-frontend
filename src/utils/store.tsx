import { UserStateType, UserType } from '@/utils/storeInterface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist<UserStateType>(
    (set) => ({
      user: {},
      isLoading: false,
      error: null,
      accessToken: null,
      refreshToken: null,
      updateUser: (user: UserType | null) =>
        set((prev) => ({ ...prev, user: user ? { ...prev.user, ...user } : null })),
      setAccessToken: (token: string | null) => set((prev) => ({ ...prev, accessToken: token })),
      setRefreshToken: (token: string | null) => set((prev) => ({ ...prev, refreshToken: token })),
    }),
    {
      name: 'user',
    }
  )
);
