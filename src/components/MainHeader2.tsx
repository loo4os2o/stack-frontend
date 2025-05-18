'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const MainHeader2 = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      setIsLoggedIn(false);
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

  useEffect(() => {
    const handleCloseDropdowns = () => {
      setActiveDropdown(null);
    };

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        handleCloseDropdowns();
      }
    });

    return () => {
      document.removeEventListener('click', handleCloseDropdowns);
    };
  }, []);

  // 로그인 검사 후 리다이렉트 핸들러
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn && path !== '/intro') {
      e.preventDefault();
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  return (
    <header className="main-header2">
      <div className="header-container">
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
          
          <button 
            onClick={handleLogin} 
            className="login-button"
            aria-label={isLoggedIn ? "로그아웃" : "로그인"}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader2; 