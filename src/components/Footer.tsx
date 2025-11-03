import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoINHA from '@/assets/images/logo-INHA_University.png';
import logoMirae from '@/assets/images/logo-mirae.png';
import logoBTairTech from '@/assets/images/logo-BTairTech.png';

const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        {/* 링크바 있을때 */}
        <div className="footer-link-bar">
          <div className="inner">
            <Link href="https://www.inha.ac.kr/kr/4174/subview.do" target="_blank">
              <Image src={logoMirae} alt="미래 로고 바로가기" width={144} />
            </Link>
            <Link href="https://www.inha.ac.kr/kr/index.do" target="_blank">
              <Image src={logoINHA} alt="인하대학교 바로가기" width={144} />
            </Link>
            <Link href="https://btairtech.co.kr/" target="_blank">
              <Image src={logoBTairTech} alt="비티에어테크 바로가기" width={96} />
            </Link>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 lg:grid-cols-4 py-10">
            {/* 로고 영역 */}
            <div className="footer-logo col-span-1 lg:col-span-2">
              <div className="text-logo-footer">
                {/* <p>건물 연돌현상 분석 솔루션</p> */}
                <h2>
                  S <span className="font-orange">T</span> A C K
                </h2>
              </div>
            </div>

            {/* 퀵 링크 영역 */}
            <div className="footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                <li>
                  <Link href="/evaluation">연돌현상 예측평가</Link>
                </li>
                <li>
                  <Link href="/engineering">엔지니어링 서비스</Link>
                </li>
                <li>
                  <Link href="/projects">엔지니어링 프로젝트 실적</Link>
                </li>
              </ul>
            </div>

            {/* 연락처 영역 */}
            <div className="footer-contact">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-info">
                <li>
                  <span>Tel</span>
                  <a href="tel:+820328738747">+82 032 873 8747</a>
                </li>
                <li>
                  <span>E-Mail</span>
                  <a href="mailto:stackengineering@gmail.com">stackengineering@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* 저작권 */}
      <div className="copyright">
        <div className="container mx-auto py-4">
          <p>© 2025 STACK. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
