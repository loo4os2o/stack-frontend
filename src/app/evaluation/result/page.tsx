'use client';

import { useEffect, useState } from 'react';
import '@/css/evaluation.css';
import Link from 'next/link';

export default function EvaluationResultPage() {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' | 'solution'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 예측평가 결과</h1>

      {isLoading ? (
        <div className="animate-pulse">
          {/* 탭 메뉴 스켈레톤 */}
          <div className="flex gap-6 mb-8">
            <div className="h-10 w-1/2 bg-gray-200 rounded" />
            <div className="h-10 w-1/2 bg-gray-200 rounded" />
          </div>
          {/* 결과 스켈레톤 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="h-48 bg-gray-200 rounded mb-8" />
          <div className="h-10 w-1/3 bg-gray-200 rounded mb-4" />
          <div className="h-48 bg-gray-200 rounded mb-8" />
        </div>
      ) : (
        <>
          {/* 탭 메뉴 */}
          <div className="flex mb-8">
            <button 
              className={`px-4 py-2 font-medium ${
                activeTab === "analysis" 
                ? "bg-blue-900 text-white" 
                : "border-b-2 text-gray-500"}`} 
              onClick={() => setActiveTab('analysis')}
              style={{width: "50%"}}
            >
              연돌효과 분석결과
            </button>
            <button 
              className={`px-4 py-2 font-medium ${
                activeTab === 'solution'
                ? "bg-blue-900 text-white" 
                : "border-b-2 text-gray-500"}`} 
              onClick={() => setActiveTab('solution')}
              style={{width: "50%"}}  
            >
              해결방안 및 저감효과
            </button>
          </div>

          {/* 분석 결과 */}
          {activeTab === 'analysis' && (
            <div className='cppe-explain' style={{marginBottom: '0px'}}>
              {/* 1. 분석 결과 요약 */}
              <section>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      1. 분석 결과 요약
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border rounded-md text-center">
                        <div className="text-xl font-semibold mb-8">연돌현상 영향도</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-red-500">상</div>
                            <div className="text-lg">연돌현상<br/>위험도</div>
                          </div>
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-orange-500">중</div>
                            <div className="text-lg">예상 하자<br/>발생도</div>
                          </div>
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-[var(--primary-color)]">필요</div>
                            <div className="text-lg">엔지니어링<br/>권장도</div>
                          </div>
                        </div>
                        <div className="design-note text-left">
                          디자이너: 연돌현상 영향도 아이콘
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">프로젝트 이름</div>
                        <div className="text-lg">
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                        </div>
                        <div className="dev-note">
                          개발자: 평가 결과에 대한 전반적인 요약 텍스트가 들어갈 위치입니다.
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">문제발생 예상층</div>
                        <p>본 건물은 실내외 온도 차 및 수직 높이에 따른 압력차로 인해 연돌현상이 발생할 수 있는 구조적 특성을 갖고 있으며, 특히 겨울철에는 하층부 외부 공기 유입과 상층부의 과도한 공기 배출 경향이 확인되었습니다. 이에 따라 환기 설비 및 샤프트 차압 제어가 필요한 것으로 평가됩니다.</p>
                        <div className='flex gap-8 mt-4'>
                          <div className="design-note flex-1">
                            디자이너: 
                          </div>
                          <div className="dev-note flex-1">
                            개발자: 차트
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">최대 연돌 압력차(PA)</div>
                        <p>CFD 시뮬레이션 결과, 외기와 실내의 온도차가 20℃ 이상일 경우 연돌 압력차가 최대 25Pa까지 증가하며, 이로 인해 계단실 및 엘리베이터 샤프트를 통한 공기 흐름이 상·하층 간 불균형을 유발하는 것으로 분석되었습니다.</p>
                        <div className='flex gap-8 mt-auto'>
                          <div className="design-note flex-1">
                            디자이너: 
                          </div>
                          <div className="dev-note flex-1">
                            개발자: 차트
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. 문제 및 하자 예상 결과 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      2. 연돌현상 예측 결과
                    </h2>
                    <div className='flex flex-col items-center justify-center'
                      style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                    >
                      <div className="text-xl font-medium">차트</div>
                      <div className="dev-note">
                        개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 문제/하자 예상 결과 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      3. 문제/하자 예상 결과
                    </h2>
                    <div className='mb-8'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        주요 문제 및 하자
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col gap-4'>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 1</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 2</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 3</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 4</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '100%', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        문제 발생 예상 층
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용 4</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. 압력차 검토 데이터 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      4. 압력차 검토 데이터
                    </h2>
                    <div className='mb-6'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        중서대 위치 및 압력분포 프로파일
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mb-6'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        주요층 압력차
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        난방시즌 압력차 변화
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 해결방안 확인하기 버튼 */}
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => {
                    setActiveTab('solution');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-secondary btn-large"
                  style={{ textUnderlineOffset: '4px', maxWidth: '200px' }}
                >
                  해결방안 확인하기 ≫
                </button>
              </div>

            </div>
          )}

          {/* 해결 방안 */}
          {activeTab === 'solution' && (
            <div className='cppe-explain' style={{marginBottom: '0px'}}>
              {/* 1. 해결방안 개요 */}
              <section>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      1. 해결방안 개요
                    </h2>
                    <div className="wireframe-section">
                      <div className="placeholder p-4 mb-6 flex flex-col justify-between">
                        <div className="wireframe-header">연돌현상 영향도</div>
                        <div className="dev-note">
                          개발자: 프로젝트 이름 및 설명
                        </div>
                      </div>
                    </div>
                    <div className="wireframe-section">
                      <div className="placeholder p-4 mb-6 flex flex-col justify-between">
                        <div className="wireframe-header">연돌현상 해결방안</div>
                        <div className="dev-note">
                          개발자: 해결방안에 대한 개요 텍스트가 들어갈 위치입니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. 개선안 리스트 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      2. 개선안 리스트
                    </h2>
                    <div className="wireframe-section">
                      <div className="placeholder p-4 mb-6 flex flex-col justify-between h-80">
                        <div className="wireframe-header">개선안 리스트</div>
                        <div className="dev-note">
                          개발자: 개선안에 대한 리스트 나열와 특수 방안에 대해 표현 될 위치입니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 연돌현상 설계검토 및 시뮬레이션 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      3. 연돌현상 설계검토 및 시뮬레이션
                    </h2>
                    <div className="wireframe-section">
                      <div className="placeholder p-4 mb-6 flex flex-col justify-between h-80">
                        <div className="wireframe-header">연돌현상 설계검토 및 시뮬레이션</div>
                        <div className="dev-note">
                          개발자: 연돌현상 설계검토 / 연돌현상 시뮬레이션에 관한 내용과 차트가 표현 될 위치입니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setActiveTab('analysis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-secondary btn-large"
                >
                  ≪ 분석결과 다시보기
                </button>
                <Link 
                  href="/engineering"
                  className="btn-primary btn-large"
                >
                  연돌현상 검토보고서 요청하기 (엔지니어링 서비스 문의하기)
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 