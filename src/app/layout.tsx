'use client';

import { HeaderMenu } from '@/components/HeaderMenu';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TopButton from '@/components/common/TopButton';
import './globals.css';
import '@/css/main.css';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
  const isMainPage = pathname === '/';
  const isMain2Page = pathname === '/main2';
  const [showTopButton, setShowTopButton] = useState(false);

  // 로그인과 서비스 요청 페이지는 흰색 배경
  const isWhiteBackgroundPage =
    pathname === '/login' || pathname === '/service-request' || pathname === '/engineering';

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown') && activeDropdowns.length > 0) {
        setActiveDropdowns([]);
        // CustomEvent를 발생시켜서 페이지 컴포넌트에 알림
        document.dispatchEvent(new CustomEvent('close-all-dropdowns'));
      }
    },
    [activeDropdowns]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <html lang="ko">
      <head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body>
        {isMainPage ? (
          <MainHeader />
        ) : isMain2Page ? null : ( // main2 페이지에서는 헤더 표시하지 않음 (MainHeader2는 페이지 내에서 직접 렌더링)
          <header className="bg-white shadow-sm">
            <div className="w-full">
              <HeaderMenu />
            </div>
          </header>
        )}
        <main
          style={{
            backgroundColor: isWhiteBackgroundPage ? 'white' : 'var(--background-color)',
          }}
        >
          {children}
        </main>
        <Footer />
        <TopButton />

        {/* Top 버튼 */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition flex items-center justify-center shadow-lg"
            style={{ zIndex: 50 }}
          >
            ↑
          </button>
        )}
      </body>
    </html>
  );
}
