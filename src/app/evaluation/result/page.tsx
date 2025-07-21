'use client';

import { useEffect, useState } from 'react';
import '@/css/evaluation.css';
import Link from 'next/link';
import RangeBarWithBullet from '@/components/charts/RangeBarWithBullet';
import VerticalRangeBar from '@/components/charts/VerticalRangeBar';
import NestedHalfDonutGauge from '@/components/charts/NestedHalfDonutGauge';
import HorizontalGaugeBar from '@/components/charts/HorizontalGaugeBar';
import HorizontalBarWithBullet from '@/components/charts/HorizontalBarWithBullet';
import GradientGaugeBar from '@/components/charts/GradientGaugeBar';
import DonutGauge from '@/components/charts/DonutGauge';

export default function EvaluationResultPage() {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' | 'solution'
  const [isLoading, setIsLoading] = useState(true);

  // 차트 데이터
  const chartData: {
    ranges: { x: number; start: number; end: number }[];
    bullets: { x: number; y: number }[];
    blocks: { start: number; end: number; type: "danger" | "warning" }[];
  } = {
    ranges: [
      { x: 1, start: 0, end: 50 },
      { x: 2, start: 20, end: 80 },
      { x: 3, start: 40, end: 120 },
      { x: 4, start: 60, end: 140 }
    ],
    bullets: [
      { x: 1, y: 25 },
      { x: 2, y: 50 },
      { x: 3, y: 80 },
      { x: 4, y: 100 }
    ],
    blocks: [
      { start: 0, end: 30, type: "danger" },
      { start: 30, end: 60, type: "warning" },
      { start: 60, end: 90, type: "danger" },
      { start: 90, end: 100, type: "warning" }
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto pt-16 pb-24">
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

                      <div className="comm-border">
                        <div className="text-xl font-semibold mb-4">연돌현상 영향도</div>
                        <div className='chart-wrap' style={{height: '160px'}}>
                          {/* 차트 - 연돌현상 영향도 */}
                          <GradientGaugeBar leftLabel="최상층" leftPosition={40} rightLabel="최하층" rightPosition={70} />
                        </div>
                        <div className="flex flex-row gap-4 mt-8 justify-between">
                          <div className='flex-row-center' style={{width: "100px", height: "100px", background: "#F4F4F4CC", borderRadius: "50%"}}>아이콘1</div>
                          <div className='flex-row-center' style={{width: "100px", height: "100px", background: "#F4F4F4CC", borderRadius: "50%"}}>아이콘2</div>
                          <div className='flex-row-center' style={{width: "100px", height: "100px", background: "#F4F4F4CC", borderRadius: "50%"}}>아이콘3</div>
                          <div className='flex-row-center' style={{width: "100px", height: "100px", background: "#F4F4F4CC", borderRadius: "50%"}}>아이콘4</div>
                          <div className='flex-row-center' style={{width: "100px", height: "100px", background: "#F4F4F4CC", borderRadius: "50%"}}>아이콘5</div>
                        </div>
                      </div>

                      <div className="comm-border">
                        <div className="text-xl font-semibold mb-6">프로젝트 이름</div>
                        <div className="text-lg">
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                        </div>
                        <div className="dev-note">
                          개발자: 평가 결과에 대한 전반적인 요약 텍스트가 들어갈 위치입니다.
                        </div>
                      </div>

                      <div className="comm-border">
                        <div className="text-xl font-semibold">문제발생 예상층</div>
                        <div className='flex flex-row'>
                          <div className='flex flex-col gap-3 justify-center w-1/2'>
                            <p>기준압력차를 초과하는 층의 비율</p>
                            <h2 className='data-box'>29개층
                              <span className='ml-2.5'>/&nbsp; 60개층</span>
                            </h2>
                          </div>
                          <div className='chart-wrap w-1/2' style={{height: '200px', background: "#fff", padding: 0 }}>
                            {/* 차트 - 문제발생 예상층 */}
                            <DonutGauge percentage={40} />
                          </div>
                        </div>
                      </div>

                      <div className="comm-border">
                        <div className="text-xl font-semibold mb-3">최대 연돌 압력차(PA)</div>
                        <div className='flex flex-row items-center'>
                          <div className='flex flex-col gap-2 w-1/2'>
                            <h2 className='data-box'>
                              <span className='mr-4'>최저층</span>
                              145 - 150 Pa
                            </h2>
                            <h2 className='data-box'>
                              <span className='mr-4'>최고층</span>
                              230 - 240 Pa
                            </h2>
                          </div>
                          <div className='chart-wrap w-1/2' style={{height: '180px', background: "#fff", padding: 0}}>
                            {/* 차트 - 최대 연돌 압력차 */}
                            <HorizontalBarWithBullet />
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
                    <div className='flex flex-row gap-8' style={{height: '400px'}}>
                      <div className='chart-wrap w-1/6'>
                        {/* 차트 - 문제 발생 예상층 */}
                        <VerticalRangeBar blocks={chartData.blocks} />
                      </div>
                      <div className='chart-wrap w-2/6' style={{paddingBottom: 0}}>
                        {/* 차트 - 중성대 위치 */}
                        <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
                      </div>
                      <div className='chart-wrap w-3/6' style={{paddingBottom: 0}}>
                        {/* 차트 - 압력분포 프로파일 */}
                        <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
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

                        <div className='comm-border flex flex-row gap-4' style={{height: '400px'}}>
                          <div className='chart-wrap w-1/3'>
                            {/* 차트 - 문제 발생 예상층 */}
                            <VerticalRangeBar blocks={chartData.blocks} />
                          </div>
                          <div className='chart-wrap w-2/3'>
                            {/* 차트 - 문제 발생 예상층 */}
                            <NestedHalfDonutGauge dangerPercent={0.49} warningPercent={0.68} />
                          </div>
                        </div>

                        <div className='flex flex-col gap-5'>
                          <div className='flex flex-row gap-5'>
                            <div className='box-wrap w-1/2'>
                              <div className='box-title'>문제 발생층</div>
                              <div className='data-box'>29개층<span className='ml-2.5'>/&nbsp; 60개층</span></div>
                            </div>
                            <div className='box-wrap w-1/2'>
                              <div className='box-title'>문제 주의층</div>
                              <div className='data-box'>42개층<span className='ml-2.5'>/&nbsp; 60개층</span></div>
                            </div>
                          </div>
                          <div className='box-wrap-bg'>
                            200m 규모의 건물에서의 적정 평균 압력은 00Pa 이며, 최대 압력차가 000Pa을 넘어가면 문제 발생 가능성이 증가합니다. 해당 건물은 적정 최대 압력차인 000Pa에 대해 149% 수준의 압력차가 발생할 것입니다.
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className='comm-border flex flex-row gap-4 col-span-2' style={{height: '530px'}}>
                          <div className='chart-wrap w-1/3'>
                            {/* 차트 - 중성대 위치 */}
                            <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
                          </div>
                          <div className='chart-wrap w-2/3'>
                            {/* 차트 - 압력분포 프로파일 */}
                            <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
                          </div>
                        </div>
                        
                        <div className='flex flex-col gap-5 col-span-1'>
                          <div className='box-wrap'>
                            <div className='box-title'>저층존 샤프트 중성대</div>
                            <div className='data-box'>13F (42m)<span className='ml-2.5'>/&nbsp; 60개층</span></div>
                          </div>
                          <div className='box-wrap'>
                            <div className='box-title'>중층존 샤프트 중성대</div>
                            <div className='data-box'>25F (78m)<span className='ml-2.5'>/&nbsp; 60개층</span></div>
                          </div>
                          <div className='box-wrap'>
                            <div className='box-title'>고층존 샤프트 중성대</div>
                            <div className='data-box'>43F (135m)<span className='ml-2.5'>/&nbsp; 60개층</span></div>
                          </div>
                          <div className='box-wrap-bg'>
                            200m 규모의 건물에서의 적정 평균 압력은 00Pa 이며, 최대 압력차가 000Pa을 넘어가면 문제 발생 가능성이 증가합니다.
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className='mb-6'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        주요층 압력차
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className='comm-border flex flex-row gap-4 col-span-2'>
                          <div className='chart-wrap w-1/4'>
                            {/* 차트 - 문제 발생 예상층 */}
                            <VerticalRangeBar blocks={chartData.blocks} />
                          </div>
                          <div className='chart-wrap w-3/4'>
                            {/* 차트 - 주요층 압력차 */}
                            <HorizontalGaugeBar value={149} />
                            <HorizontalGaugeBar value={160} />
                          </div>
                        </div>

                        <div className='flex flex-col gap-5 col-span-1'>
                          <div className='box-wrap'>
                            <div className='box-title'>최상층 최대 압력차</div>
                            <div className='data-box'>145 - 150 Pa</div>
                            <div className='detail-info'><span>엘리베이터 도어 압력차</span> 62 - 72 Pa</div>
                          </div>
                          <div className='box-wrap'>
                            <div className='box-title'>로비층 최대 압력차</div>
                            <div className='data-box'>230 - 240 Pa</div>
                            <div className='detail-info'><span>엘리베이터 도어 압력차</span> 62 - 72 Pa</div>
                            <div className='detail-info'><span>외부 출입문 압력차</span> 62 - 72 Pa</div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className=''>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        난방시즌 압력차 변화
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className='comm-border flex flex-col items-center justify-center gap-4 col-span-2'>
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        
                        <div className='flex flex-col gap-5 col-span-1'>
                          <div className='box-wrap'>
                            <div className='box-title'>기준 압력 초과일수 - 최상층</div>
                            <div className='data-box'>34-41일<span className='ml-2.5'>/&nbsp; 120일</span></div>
                          </div>
                          <div className='box-wrap'>
                            <div className='box-title'>기준 압력 초과일수 - 로비층</div>
                            <div className='data-box'>42일-48일<span className='ml-2.5'>/&nbsp; 120일</span></div>
                          </div>
                          <div className='box-wrap-bg'>
                            200m 규모의 건물에서의 적정 평균 압력은 00Pa 이며, 최대 압력차가 000Pa을 넘어가면 문제 발생 가능성이 증가합니다.
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
                      <div className='chart-wrap'>
                        <div className="wireframe-header">연돌현상 영향도</div>
                        {/* 차트 - 연돌현상 영향도 */}
                        <GradientGaugeBar leftLabel="최상층" leftPosition={40} rightLabel="최하층" rightPosition={70} />
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