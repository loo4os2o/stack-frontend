import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {/* 로고 영역 */}
            <div className="footer-logo">
              <div className="text-logo-footer">
                {/* <p>건물 연돌현상 분석 솔루션</p> */}
                <h2>S <span className="font-orange">T</span> A C K</h2>
              </div>
            </div>
            
            {/* 퀵 링크 영역 */}
            <div className="footer-links">
              <h3 className="footer-title">QUICK LINKS</h3>
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
              <h3 className="footer-title">CONTACT</h3>
              <ul className="footer-info">
                <li>전화번호 : +82 032 873 8747</li>
                <li>메일 : stackengineering@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* 저작권 */}
      <div className="copyright">
        <div className="container mx-auto px-4 py-4">
          <p>© 2025 STACK. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer; 