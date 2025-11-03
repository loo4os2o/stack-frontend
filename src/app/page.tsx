'use client';

import ArrowRightOpacity from '@/assets/icons/icon-btn-more-bg-opacity.png';
import ArrowRight from '@/assets/icons/icon-btn-more.png';
import IconService from '@/assets/icons/icon-service.png';
// import Background from '@/assets/images/architecture-1867194_1920.png';
import Background from '@/assets/images/01_home _001.jpeg';
import LogoTagline from '@/assets/images/01_home _006.png';
import slideImg1 from '@/assets/images/01_home _005.png';
import slideImg2 from '@/assets/images/01_home _003.png';
import slideImg3 from '@/assets/images/01_home _004.png';
// import slideImg3 from '@/assets/images/acro.jpg';
// import slideImg4 from '@/assets/images/lusail.png';
import { useUserStore } from '@/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Home() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 슬라이드 이미지 배열
  const slides = [
    { src: slideImg1, alt: '메인 슬라이드 공유용 이미지-1' },
    { src: slideImg2, alt: '메인 슬라이드 공유용 이미지-2' },
    { src: slideImg3, alt: '메인 슬라이드 공유용 이미지-3' },
  ];

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    if (user && user.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
    if (
      !isLoggedIn &&
      path !== '/intro' &&
      path !== '/evaluation' &&
      path !== '/about' &&
      path !== '/engineering' &&
      path !== '/projects'
    ) {
      e.preventDefault();
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  return (
    <div className="container mx-auto home-page-wrapper">
      {/* 배경 이미지 섹션 */}
      <section className="stack-bg">
        <Image src={Background} alt="background-image" fill priority />
        <div className="bg-mask"></div>
      </section>

      {/* Section - 타이틀 */}
      <section className="bg-wrap">
        <div className="text-logo">
          <Image
            src={LogoTagline}
            alt="빠르고 정확한 연돌현상평가 로고"
            width={360}
            height={113}
            className="tagline-logo"
          />
          <h1>
            S <span>T</span> A C K
          </h1>
        </div>

        <div className="main-menu">
          <div className="menu-item">
            <a href="#" className="menu-link" onClick={(e) => handleNavigation(e, '/evaluation')}>
            연돌현상 예측평가
            </a>
          </div>

          <div className="menu-item">
            <a href="#" className="menu-link" onClick={(e) => handleNavigation(e, '/engineering')}>
              엔지니어링 서비스
            </a>
          </div>

          <div className="menu-item">
            <a href="#" className="menu-link" onClick={(e) => handleNavigation(e, '/projects')}>
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
              <a href="#" className="dropdown-item" onClick={(e) => handleNavigation(e, '/about')}>
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
      <section className="sys-features">
        <h2>
          <strong>
            S<span>T</span>ACK
          </strong>{' '}
          시스템 특징
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="card-features">
            <h3>신속·정확한 연돌현상 평가</h3>
            <p>
            STACK 으로 연돌현상을 정확하게 진단하고, 문제 예측부터 체계적 개선방향까지 검토
            </p>
            <div className="btn-primary mt-10">
              <a
                href="#"
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/evaluation')}
              >
                연돌현상 평가하기
              </a>
              <Image src={ArrowRight} alt="arrow-right" width={34} height={34} />
            </div>
          </div>
          <div className="card-features">
            <h3>최적의 대응전략 수립</h3>
            <p>
            연돌현상 예측평가 보고서 + 설계·시공·준공 단계 전 과정 엔지니어링 전략을 제공
            </p>
            <div className="btn-primary mt-10">
              <a
                href="#"
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/engineering')}
              >
                엔지니어링 결과물 살펴보기
              </a>
              <Image src={ArrowRight} alt="arrow-right" width={34} height={34} />
            </div>
          </div>
          <div className="card-features">
            <h3>최고의 엔지니어링 전문가</h3>
            <p>
            최고 전문가가 만든 STACK 은 80개 국내외  프로젝트·실증 데이터를 기반으로 개발
            </p>
            <div className="btn-primary mt-10">
              <a
                href="#"
                className="inline-block"
                onClick={(e) => handleNavigation(e, '/projects')}
              >
                지난 프로젝트 살펴보기
              </a>
              <Image src={ArrowRight} alt="arrow-right" width={34} height={34} />
            </div>
          </div>
        </div>
      </section>

      {/* 메인 소개 섹션 */}
      <section className="main-intro">
        <h2>Engineering Services</h2>

        <div className="flex flex-col md:flex-row gap-5 inner">
          <div className="w-full md:w-1/2">
            <div className="service-list">
              <div className="service-item">
                <Image src={IconService} alt="service-item" width={64} height={64} />
                <div className="flex flex-col">
                  <p className="text-sm mb-1">온라인 평가 / 전문가 검토</p>
                  <h3 className="text-xl font-bold">연돌현상 예측평가</h3>
                </div>
              </div>

              <div className="service-item">
                <Image src={IconService} alt="service-item" width={64} height={64} />
                <div className="flex flex-col">
                  <p className="text-sm mb-1">개선안 반영 도면</p>
                  <h3 className="text-xl font-bold">연돌현상 설계검토</h3>
                </div>
              </div>

              <div className="service-item">
                <Image src={IconService} alt="service-item" width={64} height={64} />
                <div className="flex flex-col">
                  <p className="text-sm mb-1">공기유동 시뮬레이션 분석</p>
                  <h3 className="text-xl font-bold">연돌현상 시뮬레이션</h3>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-full md:w-1/2 intro-image"> */}
          <div className="w-full md:w-1/2 intro-image">
            <div className="swiper-container p-5" style={{ height: '445px' }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Navigation 버튼 */}
                <div className="swiper-button-prev custom-swiper-button-prev"></div>
                <div className="swiper-button-next custom-swiper-button-next"></div>

                {/* Pagination */}
                <div className="swiper-pagination custom-swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="intro-buttons mt-10">
          <a
            href="#"
            className="btn-primary btn-50 rounded-xl
              flex items-center justify-between gap-2"
            style={{ width: '300px' }}
            onClick={(e) => handleNavigation(e, '/engineering')}
          >
            엔지니어링 서비스 더 알아보기
            <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
          </a>
        </div>
      </section>
    </div>
  );
}
