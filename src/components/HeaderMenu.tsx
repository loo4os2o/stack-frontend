'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function HeaderMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    const userRole = localStorage.getItem('userRole');
    const storedUserName = localStorage.getItem('userName');
    
    if (userLogin === 'true' && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setIsAdmin(userRole === 'admin');
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName('');
    }
  }, [pathname]); // 페이지 변경시 로그인 상태 확인

  const handleLogout = () => {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    router.push('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // 로그인 검사 후 리다이렉트 핸들러
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  // 드로어 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('drawer-menu');
      const hamburger = document.getElementById('hamburger-btn');
      
      if (drawer && hamburger && 
          !drawer.contains(event.target as Node) && 
          !hamburger.contains(event.target as Node) && 
          isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  // 페이지 변경 시 드로어 닫기
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="header-wrapper">
      {/* 첫번째 줄 - 로고와 계정 정보 */}
      <div className="top-bar">
        <div className="container mx-auto flex justify-between items-center py-2">
          <Link href="/" className="text-xl font-bold text-white">STACK</Link>
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link href="/mypage" className="hover:underline">
                  <span className="text-sm text-white">{userName} 님</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="top-menu-btn"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* <Link href="/login" className="top-menu-btn">
                  로그인
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 두번째 줄 - 메인 메뉴 */}
      <div className="main-nav-bar">
        <div className="container mx-auto flex justify-between items-center py-3">
          <div className="flex items-center space-x-6">
            {/* 햄버거 메뉴 아이콘 */}
            <button 
              id="hamburger-btn"
              className="hamburger-menu" 
              onClick={toggleDrawer}
              aria-label="메뉴 열기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            
            {/* 메인 메뉴 아이템들 */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6 items-center">
                <li>
                  <a 
                    href="#" 
                    className="nav-link"
                    onClick={(e) => handleNavigation(e, '/evaluation')}
                  >
                    연돌현상 평가
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="nav-link"
                    onClick={(e) => handleNavigation(e, '/engineering')}
                  >
                    엔지니어링 서비스
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="nav-link"
                    onClick={(e) => handleNavigation(e, '/projects')}
                  >
                    엔지니어링 프로젝트 실적
                  </a>
                </li>
                <li>
                  <Link href="/intro" className="nav-link">
                    연돌현상 소개
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* 오른쪽 메뉴 - 로그인/회원가입/서비스 요청 */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link href="/login" className="nav-btn-secondary">
                  로그인
                </Link>
                <Link href="/login" className="nav-btn-secondary">
                  회원가입
                </Link>
              </>
            )}
            <Link href="/service-request" className="nav-btn-primary">
              서비스 요청하기
            </Link>
            {isAdmin && (
              <Link href="/admin" className="nav-btn-secondary">
                관리자
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* 드로어 메뉴 */}
      <div id="drawer-menu" className={`drawer-menu ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3 className="drawer-title">메뉴</h3>
          <button 
            className="drawer-close"
            onClick={toggleDrawer}
            aria-label="메뉴 닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="drawer-content">
          <nav className="drawer-nav">
            <Link href="/about" className="drawer-link">
              About S<span className="font-orange">T</span>ACK
            </Link>
            <Link href="/intro" className="drawer-link">
              연돌현상이란
            </Link>
            {/* <div className="line"></div> */}
            <a 
              href="#" 
              className="drawer-link"
              onClick={(e) => handleNavigation(e, '/engineering')}
            >
              엔지니어링 서비스 살펴보기
            </a>
            <a 
              href="#" 
              className="drawer-link"
              onClick={(e) => handleNavigation(e, '/projects')}
            >
              엔지니어링 프로젝트 실적
            </a>
            <a 
              href="#" 
              className="drawer-link"
              onClick={(e) => handleNavigation(e, '/evaluation')}
            >
              연돌현상 평가
            </a>
            {/* <Link href="/service-request" className="drawer-link">
              서비스 요청하기
            </Link> */}
            {isLoggedIn && (
              <Link href="/my-project" className="drawer-link">
                마이 프로젝트
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="drawer-link">
                프로젝트관리
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/mypage" className="drawer-link">
                개인정보관리
              </Link>
            )}
          </nav>
          
          <div className="drawer-footer">
            {isLoggedIn ? (
              <div className="drawer-user-info">
                <p>{userName}님 환영합니다</p>
                <button 
                  onClick={handleLogout}
                  className="drawer-btn"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="drawer-login-btns">
                <Link href="/login" className="drawer-btn-primary">
                  로그인
                </Link>
                <Link href="/login" className="drawer-btn-secondary">
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 드로어 배경 오버레이 */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}
    </div>
  );
} 