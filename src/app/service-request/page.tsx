'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function ServiceRequestPage() {
  const [activeTab, setActiveTab] = useState('pricing');

  return (
    <div className="container mx-auto px-4 pt-16 pb-32">
      <h1 className="text-3xl font-bold text-center mb-2">건물 연돌현상 엔지니어링 서비스</h1>
      <p className="text-center text-gray-600 mb-12">
        전문적인 연돌현상 평가 및 개선 서비스를 제공합니다
      </p>

      {/* 탭 메뉴 */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === 'pricing' ? 'login-active' : 'login-inactive'
            }`}
            onClick={() => setActiveTab('pricing')}
          >
            서비스 요금제
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === 'compare' ? 'login-active' : 'login-inactive'
            }`}
            onClick={() => setActiveTab('compare')}
          >
            서비스 비교
          </button>
        </div>
      </div>

      {/* 서비스 단계 그래프 */}
      <div className="mb-16 mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-center justify-between">
            <div className="w-full h-2 bg-gray-200 absolute"></div>
            <div className="w-1/3 h-2 bg-blue-500 absolute left-0"></div>
            
            <div className="relative z-10 flex justify-between w-full">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto"
                  style={{position: 'relative', top: '-20px'}}
                >
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="mt-2 font-semibold">Basic</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto"
                  style={{position: 'relative', top: '-20px'}}
                >
                  <span className="text-gray-600 font-bold">2</span>
                </div>
                <p className="mt-2 font-semibold">Professional</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto"
                  style={{position: 'relative', top: '-20px'}}
                >
                  <span className="text-gray-600 font-bold">3</span>
                </div>
                <p className="mt-2 font-semibold">Professional Plus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'pricing' ? (
        /* 요금제 카드 */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic 요금제 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-gray-500 font-medium mb-4">연돌현상 예측평가</p>
              <p className="text-lg font-semibold text-gray-800 mb-2">실시간 결과 확인</p>
              <p className="text-gray-600">
                건축계획을 기반으로 연돌현상이 건물에 미치는 영향을 평가하고, 개선안에 관한 방향을 제공합니다. 
                건물 공기유동 전문가가 연돌효과 평가 결과를 검토하여 개선안에 필요한 데이터를 제공합니다.
              </p>
            </div>
            <div className="p-8 pt-0 space-y-3">
              <Link href="/evaluation" className="w-full block text-center py-2 px-4 bg-white border border-primary text-primary rounded-md hover:bg-primary hover:text-white">
                연돌현상 평가하기 (무료)
              </Link>
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md">
                서비스 요청하기 (1~2일)
              </button>
            </div>
          </div>

          {/* Professional 요금제 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-gray-500 font-medium mb-4">연돌현상 설계검토</p>
              <p className="text-lg font-semibold text-gray-800 mb-2">개선안 도면 지원</p>
              <p className="text-gray-600">
                건축/설비도면 검토를 통해 맞춤형 해결방안을 마련하고, 적용가능성을 고려하여 개선안 도면을 제공합니다.
              </p>
            </div>
            <div className="p-8 pt-0">
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md">
                서비스 요청하기 <br/> (1~2주)
              </button>
            </div>
          </div>

          {/* Professional Plus 요금제 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-2">Professional Plus</h3>
              <p className="text-gray-500 font-medium mb-4">연돌현상 시뮬레이션</p>
              <p className="text-lg font-semibold text-gray-800 mb-2">정밀 시뮬레이션 분석</p>
              <p className="text-gray-600">
                공기유동 시뮬레이션 기반 연돌효과를 정밀 분석하여 층별/존별 데이터 및 관리 요소를 제공합니다.
              </p>
            </div>
            <div className="p-8 pt-0">
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md">
                서비스 요청하기 <br/> (2~3주 / 프로젝트 별 상이)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 서비스 비교 표 */
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-6 py-4 text-left">서비스 내용</th>
                <th className="border-b border-gray-200 px-6 py-4 text-center">Basic</th>
                <th className="border-b border-gray-200 px-6 py-4 text-center">Professional</th>
                <th className="border-b border-gray-200 px-6 py-4 text-center">Professional Plus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">연돌현상 위험도 평가</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">전문가 검토 보고서</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">맞춤형 개선 방안</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">도면 검토 및 개선안</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">시공 가능한 상세 도면</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">CFD 시뮬레이션 분석</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">층간 압력차 분석</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">계절별 분석 데이터</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">-</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">✓</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">기술지원 기간</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">7일</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">30일</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">90일</td>
              </tr>
              <tr>
                <td className="border-b border-gray-200 px-6 py-4 font-medium">소요 기간</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">1~2일</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">1~2주</td>
                <td className="border-b border-gray-200 px-6 py-4 text-center">2~3주</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 하단 CTA 섹션 */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">
          엔지니어링 서비스 요청 및 문의하기
        </h2>
        <p className="text-gray-600 mb-8">
          궁금한 점이 있으신가요? 전화나 메일로 문의하세요.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-primary text-white font-medium rounded-md">
            메일 요청하기
          </button>
          <a href="tel:+8203288747747" className="px-6 py-3 border border-gray-300 font-medium rounded-md">
            전화 문의하기
          </a>
        </div>
      </div>
    </div>
  );
} 