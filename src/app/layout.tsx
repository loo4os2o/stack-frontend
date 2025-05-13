'use client';

import { HeaderMenu } from "@/components/HeaderMenu";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import "./globals.css";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
  const isMainPage = pathname === '/';

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.dropdown') && activeDropdowns.length > 0) {
      setActiveDropdowns([]);
      // CustomEvent를 발생시켜서 페이지 컴포넌트에 알림
      document.dispatchEvent(new CustomEvent('close-all-dropdowns'));
    }
  }, [activeDropdowns]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {isMainPage ? (
          <MainHeader />
        ) : (
          <header className="bg-white shadow-sm">
            <div className="w-full">
              <HeaderMenu />
            </div>
          </header>
        )}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
