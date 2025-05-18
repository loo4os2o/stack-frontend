'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Background from "@/assets/images/man-architect-working-project-with-vr-glasses-new-technologies-3d.jpg";
import MainHeader2 from "@/components/MainHeader2";
import "@/css/main.css";

export default function Main2() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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
    <div className="container mx-auto px-4 home-page-wrapper"
      style={{backgroundColor: '#fff', width: '100%'}}
    >
      {/* MainHeader2 컴포넌트 추가 */}
      <MainHeader2 />
      
      {/* 배경 이미지 섹션 */}
      <section className="stack-bg" 
        style={{height: '800px', width: '100%', zIndex: 0}}
      >
        <Image 
          src={Background} 
          alt="background-image"
          style={{objectFit: 'cover', objectPosition: 'center 80%'}}
          fill 
          priority
        />
        {/* 전체적인 어두운 마스크 */}
        <div className="bg-mask" style={{opacity: 0.2}}></div>
        {/* 원형 그라데이션 마스크 */}
        <div className="bg-mask-circle"></div>
      </section>
      
      {/* Section - bg 텍스트 영역 */}
      <section className="main2-bg-wrap">
        <div className="text-logo">
          <h1>
            연돌현상 평가 알고리즘<br/> 고도화 및 시뮬레이션
          </h1>
          <p>건축 설계자, 건물 소유자, 시설 관리자를 대상으로, 건물 내 연돌현상을<br/>
           평가하고 그에 따른 해결방안을 제시하는 웹 기반 시스템</p>
          <a 
            href="#" 
            className="btn-primary inline-block mt-8"
            onClick={(e) => handleNavigation(e, '/evaluation')}
          >
            연돌현상 평가하기
          </a>
        </div>
      </section>

      {/* Section - STACK 소개 */}
      <section className="stack-intro-section">
        <div className="flex flex-col md:flex-row gap-12">
          {/* 왼쪽 영역 */}
          <div className="w-full md:w-1/2 stack-intro-left">
            <h3>ABOUT US</h3>
            <div className="intro-logo">
              <p>건물 연돌현상 분석 솔루션</p>
              S <span>T</span> A C K
            </div>
          </div>
          
          {/* 오른쪽 영역 */}
          <div className="w-full md:w-1/2 stack-intro-right">
            <div className="purple-line"></div>
            <p>
              STACK은 건물 내 연돌현상을 평가하고 해결하기 위한 종합적인 솔루션을 제공합니다.
              <br/>
              최신 기술과 전문가의 노하우를 결합하여 건물 소유자, 설계자, 시설 관리자에게 최적의 결과를 제공합니다.
              <br/>
              연돌현상으로 인한 에너지 손실, 실내 공기질 저하, 소음 문제를 효과적으로 해결하여 건물의 가치를 높이고 사용자 만족도를 향상시킵니다.
              <br/>
              온라인 평가 도구부터 전문적인 엔지니어링 서비스까지, STACK과 함께 더 효율적이고 쾌적한 건물 환경을 만들어보세요.
              <br/>
              국내 최고의 연돌현상 전문가와 함께 건물의 문제를 진단하고 맞춤형 솔루션을 제공받으세요.
            </p>
            
            <a 
              href="#" 
              onClick={(e) => handleNavigation(e, '/intro')}
              className="stack-intro-button"
            >
              연돌현상 소개
            </a>
          </div>
        </div>
      </section>

      {/* Section - SERVICES */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">SERVICES</h2>
            <p>STACK이 제공하는 다양한 서비스를 확인하세요</p>
          </div>
          
          <div className="service-grid">
            {/* 01. ABOUT STACK */}
            <div className="service-item">
              <div className="service-number">01</div>
              <h3>ABOUT STACK</h3>
              <p>
                STACK은 건물 연돌현상 문제 해결을 위한 통합 솔루션 플랫폼입니다.
                전문적인 기술과 경험을 바탕으로 효과적인 연돌현상 개선 방법을 제시합니다.
                저희와 함께 건물의 에너지 효율과 쾌적한 실내 환경을 달성하세요.
              </p>
              <Link href="/about" className="service-link">
                자세히 알아보기
              </Link>
            </div>
            
            {/* 02. 연돌현상이란 */}
            <div className="service-item">
              <div className="service-number">02</div>
              <h3>연돌현상이란</h3>
              <p>
                연돌현상은 건물 내 온도 차이로 인해 발생하는 공기의 수직 이동 현상입니다.
                이로 인해 에너지 손실, 불쾌한 냄새, 소음 등 다양한 문제가 발생할 수 있습니다.
                건물의 설계 단계에서부터 적절한 대응이 필요한 중요한 현상입니다.
              </p>
              <Link href="/intro" className="service-link">
                자세히 알아보기
              </Link>
            </div>
            
            {/* 03. 엔지니어링 실적 */}
            <div className="service-item">
              <div className="service-number">03</div>
              <h3>엔지니어링 실적</h3>
              <p>
                STACK은 다양한 건물 유형에서 연돌현상 문제를 성공적으로 해결했습니다.
                고층 아파트, 상업 건물, 공공 시설 등 다양한 프로젝트 포트폴리오를 보유하고 있습니다.
                실제 사례를 통해 STACK의 전문성과 효과를 확인하세요.
              </p>
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/projects')}
                className="service-link"
              >
                자세히 알아보기
              </a>
            </div>
            
            {/* 04. 연돌현상 평가 */}
            <div className="service-item">
              <div className="service-number">04</div>
              <h3>연돌현상 평가</h3>
              <p>
                건물의 연돌현상 위험도를 온라인으로 신속하게 평가할 수 있습니다.
                간단한 건물 정보 입력만으로 전문적인 연돌현상 평가 결과를 받아보세요.
                평가 결과를 바탕으로 맞춤형 해결책을 제안해 드립니다.
              </p>
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/evaluation')}
                className="service-link"
              >
                자세히 알아보기
              </a>
            </div>
            
            {/* 05. 엔지니어링 서비스 */}
            <div className="service-item">
              <div className="service-number">05</div>
              <h3>엔지니어링 서비스</h3>
              <p>
                STACK의 전문 엔지니어가 연돌현상 해결을 위한 맞춤형 서비스를 제공합니다.
                설계 검토부터 시뮬레이션, 현장 측정, 개선안 제시까지 종합적인 서비스를 경험하세요.
                연돌현상 문제를 근본적으로 해결하기 위한 최적의 파트너입니다.
              </p>
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/engineering')}
                className="service-link"
              >
                자세히 알아보기
              </a>
            </div>
            
            {/* 06. 서비스 요청 */}
            <div className="service-item">
              <div className="service-number">06</div>
              <h3>서비스 요청</h3>
              <p>
                STACK의 다양한 서비스에 대한 상담 및 견적을 요청하실 수 있습니다.
                프로젝트의 규모와 요구사항에 맞는 맞춤형 서비스 계획을 제안해 드립니다.
                간편한 양식 작성을 통해 신속하게 전문가와 상담을 시작하세요.
              </p>
              <Link href="/service-request" className="service-link">
                자세히 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section - 바로가기 */}
      <section className="shortcuts-section">
        <div className="shortcuts-container">
          {/* 왼쪽 영역 */}
          <div className="shortcuts-left">
            <h2 className="shortcuts-title">
              We all need help to realize<br />
              What we want most
            </h2>
            <Link href="/service-request" className="service-request-link">
              서비스 요청하기
            </Link>
          </div>
          
          {/* 오른쪽 영역 */}
          <div className="shortcuts-right">
            <div className="shortcut-links">
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/evaluation')}
                className="shortcut-link"
              >
                <span>연돌현상 예측평가</span>
                <span className="arrow">→</span>
              </a>
              
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/engineering')}
                className="shortcut-link"
              >
                <span>연돌현상 설계검토</span>
                <span className="arrow">→</span>
              </a>
              
              <a 
                href="#" 
                onClick={(e) => handleNavigation(e, '/engineering')}
                className="shortcut-link"
              >
                <span>연돌현상 시뮬레이션</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section - 문의하기 */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="text-center">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
              </svg>
            </div>
            <h2 className="contact-title">
              엔지니어링 서비스 요청 및 문의하기
            </h2>
            <p className="contact-description">
              STACK의 전문 엔지니어가 연돌현상 해결을 위한 맞춤형 서비스를 제공합니다.
              <br />프로젝트의 규모와 요구사항에 맞는 서비스 계획을 제안해 드립니다.
              <br />지금 바로 문의하셔서 건물 환경을 개선하세요.
            </p>
            <div className="contact-buttons">
              <Link href="/service-request" className="contact-button contact-primary">
                <span>서비스 요청하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="button-icon">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </Link>
              <a href="tel:+8203288747747" className="contact-button contact-secondary">
                <span>전화 문의하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="button-icon">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 