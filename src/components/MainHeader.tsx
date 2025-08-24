'use client';

import { useUserStore } from '@/utils/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MainHeader = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    if (user && user.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const clearUser = useUserStore((state) => state.updateUser);
  const clearAccessToken = useUserStore((state) => state.setAccessToken);
  const clearRefreshToken = useUserStore((state) => state.setRefreshToken);
  const { updateUser } = useUserStore();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    clearUser(null);
    updateUser(null);
    clearAccessToken(null);
    clearRefreshToken(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="transparent-header">
      <button
        onClick={isLoggedIn ? handleLogout : handleLogin}
        className="login-icon"
        aria-label={isLoggedIn ? '로그아웃' : '로그인'}
      >
        {isLoggedIn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MainHeader;
