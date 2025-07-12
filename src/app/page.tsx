'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/assets/images/architecture-1867194_1920.jpg";
import slideImg1 from '@/assets/images/lotte-tower.jpg';
import slideImg2 from '@/assets/images/haeundae.jpg';
import slideImg3 from '@/assets/images/acro.jpg';
import slideImg4 from '@/assets/images/lusail.png';

export default function Home() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 슬라이드 이미지 배열
  const slides = [
    { src: slideImg1, alt: '슬라이드1' },
    { src: slideImg2, alt: '슬라이드2' },
    { src: slideImg3, alt: '슬라이드3' },
    { src: slideImg4, alt: '슬라이드4' },
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  const prevSlide = () => setSlideIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setSlideIdx((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

    document.addEventListener('close-all-dropdowns', handleCloseDropdowns);
    return () => {
      document.removeEventListener('close-all-dropdowns', handleCloseDropdowns);
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
    <div className="container mx-auto px-4 pb-8 home-page-wrapper">
      {/* 배경 이미지 섹션 */}
      <section className="stack-bg">
        <Image 
          src={Background} 
          alt="background-image"
          style={{objectFit: 'cover', objectPosition: 'center bottom'}}
          fill 
          priority
        />
        <div className="bg-mask"></div>
      </section>
      
      {/* Section - 타이틀 */}
      <section className="bg-wrap">
        <div className="text-logo">
          <p>건물 연돌현상 분석 솔루션</p>
          <h1>S <span className="font-orange">T</span> A C K</h1>
        </div>
        
        <div className="main-menu">
          <div className="menu-item">
            <a 
              href="#" 
              className="menu-link"
              onClick={(e) => handleNavigation(e, '/evaluation')}
            >
              연돌현상 평가
            </a>
          </div>
          
          <div className="menu-item">
            <a 
              href="#" 
              className="menu-link"
              onClick={(e) => handleNavigation(e, '/engineering')}
            >
              엔지니어링 서비스
            </a>
          </div>
          
          <div className="menu-item">
            <a 
              href="#" 
              className="menu-link"
              onClick={(e) => handleNavigation(e, '/projects')}
            >
              프로젝트 실적
            </a>
          </div>
          
          <div 
            className={`menu-item dropdown ${activeDropdown === 'info' ? 'active' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <a 
              href="#" 
              className="menu-link"
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown('info');
              }}
            >
              Information
            </a>
            <div className="dropdown-menu">
              <a 
                href="#" 
                className="dropdown-item"
                onClick={(e) => handleNavigation(e, '/about')}
              >
                About STACK
              </a>
              <Link href="/intro" className="dropdown-item">
                연돌현상 이란?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section - STACK 시스템 특징 */}
      <section className="py-8 mb-12 mt-64 md:mt-64 main-features">
        <h2 className="text-3xl font-bold mb-8 text-center font-white">
          STACK 시스템 특징
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-features">
            <h3 className="text-xl font-bold mb-2 text-center">
              빠르고 정확한 연돌현상평가
            </h3>
            <p className="text-center">
              온라인 도구를 사용하여 연돌현상 영향을 평가하고, 
              해결방안을 확인하여 대응전략 수립 방향을 마련하세요.
            </p>
            <div className="btn-primary mt-6">
              <a 
                href="#" 
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/evaluation')}
              >
                연돌현상 평가하기
              </a>
            </div>
          </div>
          <div className="card-features">
            <h3 className="text-xl font-bold mb-2 text-center">
              즉시 활용가능한 결과
            </h3>
            <p className="text-center">
              연돌예측검토 보고서부터 개선전략에 관한 설계도면,
              시뮬레이션 결과까지 다양하게 제공됩니다.
            </p>
            <div className="btn-primary mt-6">
              <a 
                href="#" 
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/engineering')}
              >
                엔지니어링 결과물 살펴보기
              </a>
            </div>
          </div>
          <div className="card-features">
            <h3 className="text-xl font-bold mb-2 text-center">
              최고의 엔지니어링 전문가
            </h3>
            <p className="text-center">
              국내 최고 연돌현상 전문가와 함께 솔루션을 제공받고,
              효과적인 개선 전략을 실행할 수 있습니다.
            </p>
            <div className="btn-primary mt-6">
              <a 
                href="#" 
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/projects')}
              >
                지난 프로젝트 살펴보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 소개 섹션 */}
      <section className="py-12 mb-12 main-intro">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/5 intro-text">
            <div className="title-wrap mb-8">
              <h5 className="title-line">ENGINEERING</h5>
              <h2 className="title-line">SERVICES</h2>
            </div>
            
            <div className="service-list">
              <div className="service-item mb-6">
                <p className="text-sm mb-1">온라인 평가 / 전문가 검토</p>
                <h3 className="text-xl font-bold">연돌현상 예측평가</h3>
              </div>
              
              <div className="service-item mb-6">
                <p className="text-sm mb-1">개선안 반영 도면</p>
                <h3 className="text-xl font-bold">연돌현상 설계검토</h3>
              </div>
              
              <div className="service-item mb-8">
                <p className="text-sm mb-1">공기유동 시뮬레이션 분석</p>
                <h3 className="text-xl font-bold">연돌현상 시뮬레이션</h3>
              </div>
            </div>
            
            <div className="intro-buttons">
              <a 
                href="#" 
                className="btn-primary btn-large mb-6 w-4/5 rounded-3xl text-center"
                onClick={(e) => handleNavigation(e, '/evaluation')}
              >
                연돌현상 평가하기
              </a>
              <a 
                href="#" 
                className="underline-link"
                onClick={(e) => handleNavigation(e, '/engineering')}
              >
                엔지니어링 서비스 더 알아보기
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 intro-image flex items-center justify-center">
            <div className="relative w-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden"
              style={{height: '508px'}}
            >
              {/* 슬라이드 이미지 */}
              <Image
                src={slides[slideIdx].src}
                alt={slides[slideIdx].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg transition-all duration-300"
                style={{ zIndex: 1 }}
              />
              {/* 좌우 화살표 */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 bg-white hover:bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow"
                onClick={prevSlide}
                style={{ zIndex: 2 }}
                aria-label="이전 슬라이드"
              >
                <span style={{transform: 'rotate(180deg)', marginTop: '4px'}}> ➜ </span>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 bg-white hover:bg-gray-200 text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow"
                onClick={nextSlide}
                style={{ zIndex: 2 }}
                aria-label="다음 슬라이드"
              >
                <span style={{marginTop: '-2px'}}> ➜ </span>
              </button>
              {/* 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-blue-500' : 'bg-white/70 border border-gray-400'}`}
                    onClick={() => setSlideIdx(i)}
                    aria-label={`슬라이드 ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
