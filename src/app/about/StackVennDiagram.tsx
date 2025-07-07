import React from 'react';

export default function StackVennDiagram() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
      <svg width="800" height="600" viewBox="-100 -10 600 400">
        {/* 원 1 */}
        <ellipse cx="100" cy="180" rx="120" ry="120" fill="#ffe5b4" fillOpacity="0.7" stroke="#ff9900" strokeWidth="3" />
        {/* 원 2 */}
        <ellipse cx="300" cy="180" rx="120" ry="120" fill="#e0f7fa" fillOpacity="0.7" stroke="#00bcd4" strokeWidth="3" />
        {/* 원 3 */}
        <ellipse cx="210" cy="280" rx="100" ry="100" fill="#e1bee7" fillOpacity="0.7" stroke="#8e24aa" strokeWidth="3" />
        {/* 중앙 원 */}
        <ellipse cx="210" cy="230" rx="60" ry="40" fill="#c8e6c9" fillOpacity="0.85" stroke="#388e3c" strokeWidth="3" />
        {/* 텍스트 */}
        <text x="90" y="160" fontSize="20" fontWeight="bold" fill="#b26a00" textAnchor="middle">연돌현상 평가</text>
        <text x="310" y="160" fontSize="20" fontWeight="bold" fill="#0097a7" textAnchor="middle">엔지니어링 서비스</text>
        <text x="210" y="330" fontSize="20" fontWeight="bold" fill="#6a1b9a" textAnchor="middle">프로젝트 실적</text>
        <text x="210" y="235" fontSize="14" fontWeight="bold" fill="#388e3c" textAnchor="middle">
          전문가 네트워크
        </text>
        {/* STACK 타이틀 */}
        <text fill="#000" fontSize="28" fontWeight="bold" textAnchor="middle" x="140" y="25">S</text>
        <text fill="#ff4500" fontSize="28" fontWeight="bold" textAnchor="middle" x="170" y="25">T</text>
        <text fill="#000" fontSize="28" fontWeight="bold" textAnchor="middle" x="200" y="25">A</text>
        <text fill="#000" fontSize="28" fontWeight="bold" textAnchor="middle" x="230" y="25">C</text>
        <text fill="#000" fontSize="28" fontWeight="bold" textAnchor="middle" x="260" y="25">K</text>
        <text fill="#000" fontSize="12" fontWeight="semibold" textAnchor="middle" x="200" y="45">Core algorithm</text>
      </svg>
    </div>
  );
}
