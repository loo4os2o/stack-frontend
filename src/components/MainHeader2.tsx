'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const MainHeader2 = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    const storedUserName = localStorage.getItem('userName');
    
    if (userLogin === 'true') {
      setIsLoggedIn(true);
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      setIsLoggedIn(false);
      setUserName('');
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  const toggleDropdown = (dropdownId: string) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleCloseDropdowns = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        handleCloseDropdowns();
      }
      
      // 모바일 메뉴 외부 클릭 시 닫기
      if (isMobileMenuOpen && !target.closest('.header-container') && !target.closest('.mobile-menu-button') && window.innerWidth <= 1130) {
        setIsMobileMenuOpen(false);
      }
    });

    return () => {
      document.removeEventListener('click', handleCloseDropdowns);
    };
  }, [isMobileMenuOpen]);

  // 로그인 검사 후 리다이렉트 핸들러
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn && path !== '/intro') {
      e.preventDefault();
      router.push('/login');
    } else {
      router.push(path);
      // 모바일 메뉴가 열려있으면 닫기
      if (window.innerWidth <= 1130) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="main-header2">
      {/* 모바일 메뉴 버튼 - 1130px 이하에서만 표시 */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>
      
      <div className={`header-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo">
          <Link href="/main2">
            <h1>S <span className="logo-accent">T</span> A C K</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-menu">
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
                프로젝트 실적
              </a>
            </li>
            
            <li 
              className={`dropdown ${activeDropdown === 'info' ? 'active' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href="#" 
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown('info');
                }}
              >
                Information
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a 
                    href="#" 
                    className="dropdown-item"
                    onClick={(e) => handleNavigation(e, '/about')}
                  >
                    About STACK
                  </a>
                </li>
                <li>
                  <Link href="/intro" className="dropdown-item">
                    연돌현상 이란?
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link href="/" className="main1-link">
            메인 시안1 바로가기
          </Link>
          
          {isLoggedIn ? (
            <div className="user-info">
              <span className="user-name">{userName} 님</span>
              <button 
                onClick={handleLogin} 
                className="login-button"
                aria-label="로그아웃"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className="login-button"
              aria-label="로그인"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader2; 