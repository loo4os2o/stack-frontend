'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EvaluationPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      setIsProcessing(true);
      // 실제로는 여기서 API 호출 등을 통해 평가를 진행
      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 평가</h1>
      
      {/* 진행 상태 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'active-process' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span>건물 정보 입력</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'active-process-bg' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'active-process' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span>결과 확인</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'active-process-bg' : 'bg-gray-200'}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'active-process' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span>해결방안</span>
          </div>
        </div>
      </div>
      
      {/* Step 1: 건물 정보 입력 */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">1단계: 건물 정보 입력</h2>
          
          <div className="wireframe-section mb-6">
            <h3 className="text-xl font-bold mb-4">건물 일반 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"
              style={{columnGap: '4rem'}}
            >
              <div>
                <label htmlFor="projectName" className="block mb-2">프로젝트명</label>
                <input 
                  type="text" 
                  id="projectName" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="예: OO 오피스 빌딩"
                />
              </div>
              <div>
                <label htmlFor="buildingPurpose" className="block mb-2">건물 용도</label>
                <select id="buildingPurpose" className="w-full px-4 py-2 border rounded-md">
                  <option value="">선택하세요</option>
                  <option value="office">오피스</option>
                  <option value="commercial">상업시설</option>
                  <option value="residential">주거시설</option>
                  <option value="mixed">복합시설</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block mb-2">위치</label>
                <input 
                  type="text" 
                  id="location" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="예: 서울시 강남구"
                />
              </div>
              <div>
                <label htmlFor="buildingHeight" className="block mb-2">높이 (m)</label>
                <input 
                  type="number" 
                  id="buildingHeight" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="예: 120"
                />
              </div>
              <div>
                <label htmlFor="floors" className="block mb-2">층수</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="aboveFloors" className="block mb-1 text-sm">지상</label>
                    <input 
                      type="number" 
                      id="aboveFloors" 
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="예: 30"
                    />
                  </div>
                  <div>
                    <label htmlFor="belowFloors" className="block mb-1 text-sm">지하</label>
                    <input 
                      type="number" 
                      id="belowFloors" 
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="예: 5"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="imageUpload" className="block mb-2">건물 이미지 업로드</label>
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                  <div className="placeholder h-24 flex items-center justify-center">
                    <div className="dev-note">이미지 업로드 영역</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-6">
            <h3 className="text-xl font-bold mb-4">엘리베이터 샤프트 계획</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              style={{columnGap: '4rem'}}
            >
              <div>
                <label htmlFor="elevatorZoning" className="block mb-2">수직 조닝</label>
                <select id="elevatorZoning" className="w-full px-4 py-2 border rounded-md">
                  <option value="">선택하세요</option>
                  <option value="single">싱글존</option>
                  <option value="double">투존</option>
                  <option value="multi">멀티존</option>
                </select>
              </div>
              <div>
                <label htmlFor="shuttleElevator" className="block mb-2">지하 셔틀 엘리베이터</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="shuttleElevator" value="yes" className="mr-2" />
                    <span>있음</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="shuttleElevator" value="no" className="mr-2" />
                    <span>없음</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="placeholder h-40 mt-4 flex items-center justify-center">
              <div className="wireframe-header">엘리베이터 샤프트 도식</div>
              <div className="design-note">
                디자이너: 사용자 입력에 따라 자동 표시되는 엘리베이터 샤프트 도식 이미지
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-6">
            <h3 className="text-xl font-bold mb-4 mt-10">입면 계획</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              style={{columnGap: '4rem'}}
            >
              <div>
                <label htmlFor="podium" className="block mb-2">포디움 유무</label>
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center">
                    <input type="radio" name="podium" value="yes" className="mr-2" />
                    <span>있음</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="podium" value="no" className="mr-2" />
                    <span>없음</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="podiumHeight" className="block mb-2">포디움 높이 (m)</label>
                <input 
                  type="number" 
                  id="podiumHeight" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="예: 24"
                />
              </div>
            </div>
            <div className="placeholder h-40 mt-4 flex items-center justify-center">
              <div className="wireframe-header">입면 이미지</div>
              <div className="design-note">
                디자이너: 사용자 입력에 따라 자동 표시되는 건물 입면 이미지
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12 mb-6">
            {isProcessing ? (
              <button 
                className="px-6 py-3 bg-gray-400 text-white rounded-md cursor-not-allowed"
                disabled
              >
                처리 중...
              </button>
            ) : (
              <button 
                onClick={handleNextStep}
                className="btn-large"
              >
                평가하기
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Step 2: 결과 확인 */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">2단계: 평가 결과</h2>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">분석 결과 요약</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-6 border rounded-md text-center">
                <div className="text-3xl font-bold mb-2 text-red-500">상</div>
                <div className="text-lg">연돌현상 위험도</div>
              </div>
              <div className="p-6 border rounded-md text-center">
                <div className="text-3xl font-bold mb-2 text-orange-500">중</div>
                <div className="text-lg">예상 하자 발생도</div>
              </div>
              <div className="p-6 border rounded-md text-center">
                <div className="text-3xl font-bold mb-2 text-[var(--primary-color)]">필요</div>
                <div className="text-lg">엔지니어링 권장도</div>
              </div>
            </div>
            
            <div className="placeholder p-4 mb-6">
              <div className="wireframe-header">결과 요약 텍스트</div>
              <div className="dev-note">
                개발자: 평가 결과에 대한 전반적인 요약 텍스트가 들어갈 위치입니다.
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">문제 및 하자 예상 결과</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="placeholder h-64">
                <div className="wireframe-header">건물 단면도</div>
                <div className="design-note">
                  디자이너: 문제 발생 가능 구간을 표시한 건물 단면도 이미지
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">예상 문제점</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div className="font-bold">상부층 엘리베이터 문 개폐 불량</div>
                    <div className="text-sm">심각도: 높음</div>
                  </div>
                  <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <div className="font-bold">로비 및 저층부 소음 발생</div>
                    <div className="text-sm">심각도: 중간</div>
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div className="font-bold">에너지 손실</div>
                    <div className="text-sm">심각도: 낮음</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">압력차 검토 데이터</h3>
            <div className="placeholder h-80">
              <div className="wireframe-header">압력차 그래프</div>
              <div className="design-note">
                디자이너: 층별 압력차를 보여주는 그래프
              </div>
              <div className="dev-note">
                개발자: 실제 구현 시 차트 라이브러리(Chart.js 등)를 사용해 구현
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={handlePrevStep}
              className="btn-large mr-4"
            >
              이전 단계로
            </button>
            <button 
              onClick={handleNextStep}
              className="btn-large"
            >
              해결방안 보기
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: 해결방안 */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">3단계: 해결방안</h2>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">해결방안 개요</h3>
            <div className="placeholder p-4 mb-6">
              <div className="wireframe-header">해결방안 개요 텍스트</div>
              <div className="dev-note">
                개발자: 해결방안에 대한 개요 텍스트가 들어갈 위치입니다.
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">해결방안 리스트</h3>
            <div className="space-y-6">
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="placeholder h-12 w-12 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">엘리베이터 샤프트 압력 균형 시스템 도입</h4>
                    <p>엘리베이터 샤프트 내 압력을 조절하여 압력차에 의한 문제 해결</p>
                    <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                      <span className="font-bold text-blue-700">효과:</span> 엘리베이터 문 개폐 불량 해소, 소음 감소
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="placeholder h-12 w-12 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">로비 및 공용부 에어커튼 설치</h4>
                    <p>출입구 및 로비 공간에 에어커튼을 설치하여 외부 공기 유입 차단</p>
                    <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                      <span className="font-bold text-blue-700">효과:</span> 에너지 손실 감소, 로비 환경 개선
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="placeholder h-12 w-12 mr-4"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">공용부 공기 유동 제어 시스템</h4>
                    <p>층간 연결 공간에 공기 유동을 제어하는 장치 설치</p>
                    <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                      <span className="font-bold text-blue-700">효과:</span> 공기 흐름 제어, 실내 공기질 개선
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="wireframe-section mb-8">
            <h3 className="text-xl font-bold mb-4">최적화 엔지니어링 제안</h3>
            <div className="bg-[var(--light-gray)] p-6 rounded-lg">
              <p className="mb-4">연돌현상 저감을 위한 최적화된 엔지니어링 서비스가 필요합니다.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <h4 className="font-bold mb-2">연돌현상 예측평가</h4>
                  <p className="text-sm mb-3">건축계획 기반 평가 및 보고서 제공</p>
                  <div className="font-bold text-[var(--primary-color)]">Basic</div>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm border-2 border-[var(--primary-color)]">
                  <h4 className="font-bold mb-2">연돌현상 개선설계</h4>
                  <p className="text-sm mb-3">연돌현상 저감을 위한 설계 가이드 제공</p>
                  <div className="font-bold text-[var(--primary-color)]">Professional</div>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <h4 className="font-bold mb-2">연돌현상 최적설계</h4>
                  <p className="text-sm mb-3">시뮬레이션 기반 최적 솔루션 설계</p>
                  <div className="font-bold text-[var(--primary-color)]">Professional Plus</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link
                  href="/engineering"
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-md transition"
                >
                  엔지니어링 서비스 요청
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={handlePrevStep}
              className="btn-large mr-4"
            >
              이전 단계로
            </button>
            <button 
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
            >
              보고서 다운로드 (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 