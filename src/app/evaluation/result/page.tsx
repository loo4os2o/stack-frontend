'use client';

import ArrowLeft from '@/assets/icons/icon-btn-more-bg.png';
import { default as ArrowRight, default as IconEx } from '@/assets/icons/icon-btn-more.png';
import iconDecrease from '@/assets/icons/icon-decrease.png';
import iconLightOn from '@/assets/icons/icon-result-light.png';
import resultChartEx1 from '@/assets/images/evaluation/08_result_001.png';
import resultChartEx2 from '@/assets/images/evaluation/09_solution _001.png';
import resultChartEx3 from '@/assets/images/evaluation/09_solution _002.png';
import DonutGauge from '@/components/charts/DonutGauge';
import GradientGaugeBar from '@/components/charts/GradientGaugeBar';
import HorizontalBarWithBullet from '@/components/charts/HorizontalBarWithBullet';
import HorizontalGaugeBar from '@/components/charts/HorizontalGaugeBar';
import NestedHalfDonutGauge from '@/components/charts/NestedHalfDonutGauge';
import RangeBarWithBullet from '@/components/charts/RangeBarWithBullet';
import StackedRangeBar from '@/components/charts/StackedRangeBar';
import VerticalRangeBar from '@/components/charts/VerticalRangeBar';
import '@/css/evaluation.css';
import type { Project } from '@/utils/commonInterface';
import { useUserStore } from '@/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  getIssueForecast,
  getPressureDiffrentials,
  getSolutionOverview,
  getSolutionRecommendations,
  getSolutionSimulation,
  getStackEffectForecast,
  getSummary,
} from '@/api/api';
import ImageChart1 from '@/assets/images/03_input _000.png';
import ImageChart2 from '@/assets/images/03_input _002.png';
import HorizontalFillWithMarker from '@/components/charts/HorizontalFillWithMarker';

export default function EvaluationResultPage() {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' | 'solution'
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [stackEffectForecast, setStackEffectForecast] = useState<any>(null);
  const [issueForecast, setIssueForecast] = useState<any>(null);
  const [pressureDiffrentials, setPressureDiffrentials] = useState<any>(null);
  const [solutionOverview, setSolutionOverview] = useState<any>(null);
  const [solutionRecommendations, setSolutionRecommendations] = useState<any>(null);
  const [solutionSimulation, setSolutionSimulation] = useState<any>(null);
  const { user, accessToken, refreshToken } = useUserStore();

  useEffect(() => {
    if (user && accessToken && refreshToken) {
      console.log('user', user);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
    }
  }, [user, accessToken, refreshToken]);

  const fetchSummary = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const summary = await getSummary(selectedProject?.id, accessToken);
    console.log('summary', summary);
    setSummary(summary);
  };

  const fetchStackEffectForecast = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const stackEffectForecast = await getStackEffectForecast(selectedProject?.id, accessToken);
    console.log('stackEffectForecast', stackEffectForecast);
    setStackEffectForecast(stackEffectForecast);
  };

  const fetchIssueForecast = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const issueForecast = await getIssueForecast(selectedProject?.id, accessToken);
    console.log('issueForecast', issueForecast);
    setIssueForecast(issueForecast);
  };

  const fetchPressureDiffrentials = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const pressureDiffrentials = await getPressureDiffrentials(selectedProject?.id, accessToken);
    console.log('pressureDiffrentials', pressureDiffrentials);
    setPressureDiffrentials(pressureDiffrentials);
  };

  const fetchSolutionOverview = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const solutionOverview = await getSolutionOverview(selectedProject?.id, accessToken);
    console.log('solutionOverview', solutionOverview);
    setSolutionOverview(solutionOverview);
  };

  const fetchSolutionRecommendations = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const solutionRecommendations = await getSolutionRecommendations(
      selectedProject?.id,
      accessToken
    );
    console.log('solutionRecommendations', solutionRecommendations);
    setSolutionRecommendations(solutionRecommendations);
  };

  const fetchSolutionSimulation = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const solutionSimulation = await getSolutionSimulation(selectedProject?.id, accessToken);
    console.log('solutionSimulation', solutionSimulation);
    setSolutionSimulation(solutionSimulation);
  };

  useEffect(() => {
    if (selectedProject) {
      fetchSummary();
      fetchStackEffectForecast();
      fetchIssueForecast();
      fetchPressureDiffrentials();
      fetchSolutionOverview();
      fetchSolutionRecommendations();
      fetchSolutionSimulation();
    }
  }, [selectedProject]);

  // 차트 데이터
  const chartData: {
    ranges: { x: number; start: number; end: number }[];
    bullets: { x: number; y: number }[];
    blocks: { start: number; end: number; type: 'danger' | 'warning' }[];
  } = {
    ranges: [
      { x: 1, start: 0, end: 50 },
      { x: 2, start: 20, end: 80 },
      { x: 3, start: 40, end: 120 },
      { x: 4, start: 60, end: 140 },
    ],
    bullets: [
      { x: 1, y: 25 },
      { x: 2, y: 50 },
      { x: 3, y: 80 },
      { x: 4, y: 100 },
    ],
    blocks: [
      { start: 0, end: 30, type: 'danger' },
      { start: 30, end: 60, type: 'warning' },
      { start: 60, end: 90, type: 'danger' },
      { start: 90, end: 100, type: 'warning' },
    ],
  };

  return (
    <div className="container mx-auto py-10 ev-result-page">
      <h1 className="text-3xl font-bold mb-5">연돌현상 예측평가 결과</h1>

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
          <div className="tab-ev">
            <button
              className={`${activeTab === 'analysis' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              연돌현상 분석결과
            </button>
            <button
              className={`${activeTab === 'solution' ? 'active-tab' : ''}`}
              onClick={() => setActiveTab('solution')}
            >
              연돌현상 해결방안
            </button>
          </div>

          {/* 분석 결과 */}
          {activeTab === 'analysis' && (
            <div className="cppe-explain" style={{ marginBottom: '0px' }}>
              <h2>
                <span className="num">1</span> 분석 결과 요약
              </h2>
              {/* 1. 분석 결과 요약 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="comm-border">
                        <h3>연돌현상 영향도</h3>
                        <div className="chart-wrap" style={{ height: '160px' }}>
                          {/* 차트 - 연돌현상 영향도 */}
                          {/* <GradientGaugeBar
                            leftLabel="최상층"
                            leftPosition={40}
                            rightLabel="최하층"
                            rightPosition={70}
                          /> */}
                          <HorizontalFillWithMarker
                            fillValue={summary?.optimization?.currentProj}
                            fillLabel="Before"
                            markerValue={summary?.optimization?.solutionOptimization}
                            markerLabel="After Professional Plus"
                            max={100}
                            height={64}
                            showTooltip={false}
                          />
                        </div>
                        <div className="flex flex-row gap-4 mt-6 justify-between">
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon1" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon2" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon3" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon4" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon5" width={60} height={60} />
                          </div>
                        </div>
                      </div>

                      <div className="comm-border border-0">
                        <h3>프로젝트 이름</h3>
                        <div className="border-0">
                          <p>
                            건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                            에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          </p>
                          <p>
                            건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                            에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          </p>
                        </div>
                      </div>

                      <div className="comm-border">
                        <h3>문제발생 예상층</h3>
                        <div className="flex flex-row">
                          <div className="flex flex-col gap-3 justify-center w-1/2">
                            <p>기준압력차를 초과하는 층의 비율</p>
                            <h2 className="data-box">
                              {summary?.problem?.exceededFloors}개층
                              <span className="ml-2.5">
                                /&nbsp; {summary?.problem?.totalFloors}개층
                              </span>
                            </h2>
                          </div>
                          <div
                            className="chart-wrap w-1/2"
                            style={{ height: '200px', background: '#fff', padding: 0 }}
                          >
                            {/* 차트 - 문제발생 예상층 */}
                            <DonutGauge
                              percentage={
                                summary?.problem?.exceededFloors && summary?.problem?.totalFloors
                                  ? Math.round(
                                      (summary?.problem?.exceededFloors /
                                        summary?.problem?.totalFloors) *
                                        100
                                    )
                                  : 0
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="comm-border">
                        <h3>최대 연돌 압력차(Pa)</h3>
                        <div className="flex flex-row items-center">
                          <div className="flex flex-col gap-2 w-1/2">
                            <h2 className="data-box">
                              <span className="mr-4">최상층</span>
                              {summary?.pressure?.minLowestFloor
                                ? Math.floor(summary?.pressure?.minLowestFloor)
                                : 0}{' '}
                              -{' '}
                              {summary?.pressure?.maxLowestFloor
                                ? Math.floor(summary?.pressure?.maxLowestFloor)
                                : 0}{' '}
                              Pa
                            </h2>
                            <h2 className="data-box">
                              <span className="mr-4">로비층</span>
                              {summary?.pressure?.minHighestFloor
                                ? Math.floor(summary?.pressure?.minHighestFloor)
                                : 0}{' '}
                              -{' '}
                              {summary?.pressure?.maxHighestFloor
                                ? Math.floor(summary?.pressure?.maxHighestFloor)
                                : 0}{' '}
                              Pa
                            </h2>
                          </div>
                          <div
                            className="chart-wrap w-1/2"
                            style={{ height: '180px', background: '#fff', padding: 0 }}
                          >
                            {/* 차트 - 최대 연돌 압력차 */}
                            <HorizontalBarWithBullet
                              highestFloor={Math.floor(summary?.pressure?.highestFloor)}
                              lowestFloor={Math.floor(summary?.pressure?.Lobby)}
                              median={summary?.pressure?.Median}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <h2 className="mt-8">
                <span className="num">2</span> 연돌현상 예측결과
              </h2>
              {/* 2. 연돌현상 예측결과 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    <div className="flex flex-row gap-8" style={{ height: '400px' }}>
                      <div className="chart-wrap w-2/6">
                        {/* 차트 - 문제 발생 예상층 */}
                        {/* <VerticalRangeBar blocks={chartData.blocks} /> */}
                        <StackedRangeBar />
                      </div>
                      <div className="chart-wrap w-2/6" style={{ paddingBottom: 0 }}>
                        {/* 차트 - 중성대 위치 */}
                        <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
                      </div>
                      <div className="chart-wrap w-2/6" style={{ paddingBottom: 0 }}>
                        {/* 차트 - 압력분포 프로파일 */}
                        <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <h2 className="mt-8">
                <span className="num">3</span> 문제/하자 예상 결과
              </h2>
              {/* 3. 문제/하자 예상 결과 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    {/* 주요 문제 및 하자 */}
                    <div className="mb-8">
                      <h3 className="icon">주요 문제 및 하자</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* 리스트 */}
                        <div className="flex flex-col gap-4 col-span-2">
                          {issueForecast?.MajorIssuesAndDefects?.fireEvacuationSafety && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘1" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">화재 및 피난 안전</div>
                                <div className="desc">화재 및 피난 안전 화재 및 피난 안전 화재</div>
                                <div className="sub">개선안 설계도서 반영 필요</div>
                              </div>
                            </div>
                          )}
                          {issueForecast?.MajorIssuesAndDefects?.constructionDefect && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘2" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">건축 요소/자재 하자</div>
                                <div className="desc">
                                  건축 요소/자재 하자건축요소 자재하자 건축
                                </div>
                                <div className="sub">시뮬레이션 검토 필요</div>
                              </div>
                            </div>
                          )}
                          {issueForecast?.MajorIssuesAndDefects?.elevatorDoorFailure && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘3" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">엘리베이터 도어 오작동 및 고장</div>
                                <div className="desc">
                                  화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난
                                  화재 및 피난
                                </div>
                              </div>
                            </div>
                          )}
                          {issueForecast?.MajorIssuesAndDefects?.doorNoise && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘4" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">도어 소음 (휘슬링)</div>
                                <div className="desc">도어 소음 (휘슬링)</div>
                              </div>
                            </div>
                          )}
                          {issueForecast?.MajorIssuesAndDefects?.energySystemError && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘5" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">에너지 및 HYAC 시스템 설계 오류</div>
                                <div className="desc">에너지 및 HYAC 시스템 설계 오류 설명</div>
                                <div className="sub">시뮬레이션 검토 필요</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 차트 */}
                        <div className="image-wrap" style={{ height: '680px' }}>
                          <Image
                            src={resultChartEx1}
                            alt="주요 문제 및 하자 차트1"
                            style={{ objectFit: 'contain', height: '100%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 문제 발생 예상층 */}
                    <div className="">
                      <h3 className="icon">문제 발생 예상층</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div
                          className="comm-border flex flex-row gap-4"
                          style={{ height: '400px' }}
                        >
                          <div className="chart-wrap w-1/3">
                            {/* 차트 - 문제 발생 예상층 */}
                            <VerticalRangeBar
                              data={
                                issueForecast?.problemFloorChart
                                  ? issueForecast?.problemFloorChart
                                  : []
                              }
                            />
                          </div>
                          <div className="chart-wrap w-2/3">
                            {/* 차트 - 문제 발생 예상층 */}
                            <NestedHalfDonutGauge
                              dangerPercent={
                                issueForecast?.problemFloorSummary?.problemOccurFloor &&
                                issueForecast?.problemFloorSummary?.totalProblemOccurFloor > 0
                                  ? Math.round(
                                      (issueForecast?.problemFloorSummary?.problemOccurFloor /
                                        issueForecast?.problemFloorSummary
                                          ?.totalProblemOccurFloor) *
                                        100
                                    ) / 100
                                  : 0
                              }
                              warningPercent={
                                issueForecast?.problemFloorSummary?.problemAttentionFloor &&
                                issueForecast?.problemFloorSummary?.totalProblemAttentionFloor > 0
                                  ? Math.round(
                                      (issueForecast?.problemFloorSummary?.problemAttentionFloor /
                                        issueForecast?.problemFloorSummary
                                          ?.totalProblemAttentionFloor) *
                                        100
                                    ) / 100
                                  : 0
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-5">
                          <div className="flex flex-row gap-5">
                            <div className="box-wrap w-1/2">
                              <div className="box-title">문제 발생층</div>
                              <div className="data-box">
                                {issueForecast?.problemFloorSummary?.problemOccurFloor
                                  ? issueForecast?.problemFloorSummary?.problemOccurFloor
                                  : 0}
                                개층
                                <span className="ml-2.5">
                                  /&nbsp;{' '}
                                  {issueForecast?.problemFloorSummary?.totalProblemOccurFloor
                                    ? issueForecast?.problemFloorSummary?.totalProblemOccurFloor
                                    : 0}
                                  개층
                                </span>
                              </div>
                            </div>
                            <div className="box-wrap w-1/2">
                              <div className="box-title">문제 주의층</div>
                              <div className="data-box">
                                {issueForecast?.problemFloorSummary?.problemAttentionFloor
                                  ? issueForecast?.problemFloorSummary?.problemAttentionFloor
                                  : 0}
                                개층
                                <span className="ml-2.5">
                                  /&nbsp;{' '}
                                  {issueForecast?.problemFloorSummary?.totalProblemAttentionFloor
                                    ? issueForecast?.problemFloorSummary?.totalProblemAttentionFloor
                                    : 0}
                                  개층
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="box-wrap-bg">
                            {issueForecast?.problemFloorSummary?.problemDesc
                              ? issueForecast?.problemFloorSummary?.problemDesc
                              : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <h2 className="mt-8">
                <span className="num">4</span> 압력차 검토 데이터
              </h2>
              {/* 4. 압력차 검토 데이터 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    {/* 중성대 위치 및 압력분포 프로파일 */}
                    <div className="mb-8">
                      <h3 className="icon">중성대 위치 및 압력분포 프로파일</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div
                          className="comm-border flex flex-row gap-4 col-span-2"
                          style={{ height: '560px' }}
                        >
                          <div className="chart-wrap w-1/3">
                            {/* 차트 - 중성대 위치 */}
                            <RangeBarWithBullet
                              ranges={chartData.ranges}
                              bullets={chartData.bullets}
                            />
                          </div>

                          {/* 차트 - 압력분포 프로파일 */}
                          {/* <div className="chart-wrap w-2/3">
                            <RangeBarWithBullet
                              ranges={chartData.ranges}
                              bullets={chartData.bullets}
                            />
                          </div> */}

                          {/* 퍼블리싱 - 압력분포 차트영역 이미지로 대체 */}
                          <div className="image-wrap">
                            <Image src={ImageChart1} alt="차트 대용 이미지" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 col-span-1">
                          <div className="box-wrap">
                            <div className="box-title">저층존 샤프트 중성대</div>
                            <div className="data-box">
                              {pressureDiffrentials?.neutralZoneProfile?.lowRiseShaftFloor}F (
                              {pressureDiffrentials?.neutralZoneProfile?.lowRiseShaftHeight}m)
                              <span className="ml-2.5">
                                {pressureDiffrentials?.neutralZoneProfile?.totalFloor}개층
                              </span>
                            </div>
                          </div>
                          <div className="box-wrap">
                            <div className="box-title">중층존 샤프트 중성대</div>
                            <div className="data-box">
                              {pressureDiffrentials?.neutralZoneProfile?.middleLayerShaftFloor}F (
                              {pressureDiffrentials?.neutralZoneProfile?.middleLayerShaftHeight}
                              m)
                              <span className="ml-2.5">
                                {pressureDiffrentials?.neutralZoneProfile?.totalFloor}개층
                              </span>
                            </div>
                          </div>
                          <div className="box-wrap">
                            <div className="box-title">고층존 샤프트 중성대</div>
                            <div className="data-box">
                              {pressureDiffrentials?.neutralZoneProfile?.highRiseShaftFloor}F (
                              {pressureDiffrentials?.neutralZoneProfile?.highRiseShaftHeight}m)
                              <span className="ml-2.5">
                                {pressureDiffrentials?.neutralZoneProfile?.totalFloor}개층
                              </span>
                            </div>
                          </div>
                          <div className="box-wrap-bg">
                            {pressureDiffrentials?.neutralZoneProfile?.shaftResultDesc}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 주요층 압력차 */}
                    <div className="mb-8">
                      <h3 className="icon">주요층 압력차</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="comm-border flex flex-row gap-4 col-span-2">
                          <div className="chart-wrap w-1/4">
                            {/* 차트 - 문제 발생 예상층 */}
                            <VerticalRangeBar
                              data={pressureDiffrentials?.pressureDifferentialChart ?? []}
                            />
                          </div>
                          <div className="chart-wrap w-3/4">
                            {/* 차트 - 주요층 압력차 */}
                            <HorizontalGaugeBar
                              value={
                                pressureDiffrentials?.pressureDifferentials
                                  ?.topFloorPressureValue ?? 0
                              }
                              label="최상층"
                            />
                            <HorizontalGaugeBar
                              value={
                                pressureDiffrentials?.pressureDifferentials?.lobbyPressureValue ?? 0
                              }
                              label="로비층"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 col-span-1">
                          <div className="box-wrap">
                            <div className="box-title">최상층 최대 압력차</div>
                            <div className="data-box">
                              {pressureDiffrentials?.pressureDifferentials?.topFloorPressureMin ??
                                0}{' '}
                              -{' '}
                              {pressureDiffrentials?.pressureDifferentials?.topFloorPressureMax ??
                                0}
                              Pa
                            </div>
                            <div className="detail-info">
                              <span>엘리베이터 도어 압력차</span>
                              {pressureDiffrentials?.pressureDifferentials
                                ?.topFloorElevatorDoorPressureMin ?? 0}
                              -
                              {pressureDiffrentials?.pressureDifferentials
                                ?.topFloorElevatorDoorPressureMax ?? 0}
                              Pa
                            </div>
                          </div>
                          <div className="box-wrap">
                            <div className="box-title">로비층 최대 압력차</div>
                            <div className="data-box">
                              {pressureDiffrentials?.pressureDifferentials?.lobbyPressureMin ?? 0}-
                              {pressureDiffrentials?.pressureDifferentials?.lobbyPressureMax ?? 0}
                              Pa
                            </div>
                            <div className="detail-info">
                              <span>엘리베이터 도어 압력차</span>
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyElevatorDoorPressureMin ?? 0}
                              -
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyElevatorDoorPressureMax ?? 0}
                              Pa
                            </div>
                            <div className="detail-info">
                              <span>외부 출입문 압력차</span>
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyExternalDoorPressureMin ?? 0}
                              -
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyExternalDoorPressureMax ?? 0}
                              Pa
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 난방시즌 압력차 변화 */}
                    <div className="">
                      <h3 className="icon">난방시즌 압력차 변화</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* 차트 */}
                        <div className="comm-border flex flex-col items-center justify-center gap-4 col-span-2">
                          {/* 퍼블리싱 - 차트영역 이미지로 대체 */}
                          <div className="image-wrap">
                            <Image src={ImageChart2} alt="난방시즌 차트 대용 이미지" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 col-span-1">
                          <div className="box-wrap">
                            <div className="box-title">기준 압력 초과일수 - 최상층</div>
                            <div className="data-box">
                              34-41일<span className="ml-2.5">/&nbsp; 120일</span>
                            </div>
                          </div>
                          <div className="box-wrap">
                            <div className="box-title">기준 압력 초과일수 - 로비층</div>
                            <div className="data-box">
                              42일-48일<span className="ml-2.5">/&nbsp; 120일</span>
                            </div>
                          </div>
                          <div className="box-wrap-bg">
                            200m 규모의 건물에서의 적정 평균 압력은 00Pa 이며, 최대 압력차가 000Pa을
                            넘어가면 문제 발생 가능성이 증가합니다.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 해결방안 확인하기 버튼 */}
              <div className="flex justify-end mt-7 mb-10">
                <button
                  className="btn-primary w-full btn-50 rounded-xl
                  flex items-center justify-between gap-2"
                  style={{ maxWidth: '240px' }}
                  onClick={() => {
                    setActiveTab('solution');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  해결방안 확인하기
                  <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
                </button>
              </div>
            </div>
          )}

          {/* 해결 방안 */}
          {activeTab === 'solution' && (
            <div className="cppe-explain" style={{ marginBottom: '0px' }}>
              <h2>
                <span className="num">1</span> 해결방안 개요
              </h2>

              {/* 1. 해결방안 개요 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="comm-border">
                        <h3>연돌현상 영향도</h3>
                        <div className="chart-wrap" style={{ height: '160px' }}>
                          {/* 차트 - 연돌현상 영향도 */}
                          <GradientGaugeBar
                            leftLabel="최상층"
                            leftPosition={40}
                            rightLabel="최하층"
                            rightPosition={70}
                          />
                        </div>
                        <div className="flex flex-row gap-4 mt-6 justify-between">
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon1" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon2" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon3" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon4" width={60} height={60} />
                          </div>
                          <div className="flex-row-center border-2 rounded-full">
                            <Image src={IconEx} alt="icon5" width={60} height={60} />
                          </div>
                        </div>
                      </div>

                      <div className="comm-border border-0">
                        <h3>프로젝트 이름</h3>
                        <div className="border-0">
                          <p>
                            건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                            에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          </p>
                          <p>
                            건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                            에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
                      <div className="comm-border">
                        <h3>연돌현상 해결방안</h3>
                        <div className="flex flex-row gap-4 mb-4">
                          <div className="icon-box-col">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘1" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘2" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘3" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col disabled">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘4" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘5" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘6" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col disabled">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘7" />
                            </div>
                            아이콘
                          </div>
                          <div className="icon-box-col disabled">
                            <div className="icon-box">
                              <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘8" />
                            </div>
                            아이콘
                          </div>
                        </div>

                        <ul className="mt-3">
                          <li>엔지니어링 관련 설명 엔지니어링 관련 설명 엔지니어링 관련 설명</li>
                          <li>엔지니어링 관련 설명 엔지니어링 관련 설명 엔지니어링 관련 설명</li>
                          <li>엔지니어링 관련 설명 엔지니어링 관련 설명 엔지니어링 관련 설명</li>
                          <li>엔지니어링 관련 설명 엔지니어링 관련 설명 엔지니어링 관련 설명</li>
                          <li>엔지니어링 관련 설명 엔지니어링 관련 설명 엔지니어링 관련 설명</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-5 mt-8">
                <h2>
                  <span className="num">2</span> 개선안 리스트
                </h2>
                <div className="title-sub mb-3">
                  <Image src={iconDecrease} alt="절감 아이콘" width={14} height={14} />
                  <strong>32%</strong> 절감
                </div>
              </div>
              {/* 2. 개선안 리스트 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    {/* 리스트 */}
                    <div className="flex flex-col gap-4 col-span-2">
                      <div className="icon-list">
                        <div className="icon-box">
                          <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘1" />
                        </div>
                        <div className="text-wrap">
                          <div className="title">화재 및 피난 안전</div>
                          <div className="desc">화재 및 피난 안전 화재 및 피난 안전 화재</div>
                          <div className="sub"># 개선안이 반영된 설계도면 필요 </div>
                          <div className="sub"># 공기유동 상세 시뮬레이션 검토 후 설치층 체크 </div>
                        </div>
                      </div>

                      <div className="icon-list disabled">
                        <div className="icon-box">
                          <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘2" />
                        </div>
                        <div className="text-wrap">
                          <div className="title">건축 요소/자재 하자</div>
                          <div className="desc">건축 요소/자재 하자건축요소 자재하자 건축</div>
                          <div className="sub">시뮬레이션 검토 필요</div>
                        </div>
                      </div>

                      <div className="icon-list">
                        <div className="icon-box">
                          <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘3" />
                        </div>
                        <div className="text-wrap">
                          <div className="title">엘리베이터 도어 오작동 및 고장</div>
                          <div className="desc">
                            화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난 화재 및
                            피난
                          </div>
                        </div>
                      </div>

                      <div className="icon-list">
                        <div className="icon-box">
                          <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘4" />
                        </div>
                        <div className="text-wrap">
                          <div className="title">도어 소음 (휘슬링)</div>
                          <div className="desc">도어 소음 (휘슬링)</div>
                        </div>
                      </div>

                      <div className="icon-list">
                        <div className="icon-box">
                          <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘5" />
                        </div>
                        <div className="text-wrap">
                          <div className="title">에너지 및 HYAC 시스템 설계 오류</div>
                          <div className="desc">에너지 및 HYAC 시스템 설계 오류 설명</div>
                          <div className="sub">시뮬레이션 검토 필요</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-5 mt-8">
                <h2>
                  <span className="num">3</span> 연돌현상 설계검토 및 시뮬레이션
                </h2>
                <div className="title-sub mb-3">
                  <Image src={iconDecrease} alt="절감 아이콘" width={14} height={14} />
                  <strong>53%</strong> 절감
                </div>
              </div>
              {/* 3. 연돌현상 설계검토 및 시뮬레이션 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    {/* 연돌현상 설계검토 */}
                    <div className="mb-8">
                      <h3 className="icon">연돌현상 설계검토</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="comm-border border-0">
                          건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                          에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                          에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          <div className="text-box">
                            <ul>
                              <li>건축/설비 도면 검토를 통한 맞춤형 개선전략</li>
                              <li>개선전략 별 상세 데이터 제시</li>
                              <li>층별 수정사항이 반영된 설계도면</li>
                              <li>기밀화라인이 표현된 기밀화구획도</li>
                            </ul>
                          </div>
                        </div>

                        <div className="comm-border-none">
                          <div className="image-wrap">
                            <Image src={resultChartEx2} alt="연돌현상 설계검토" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 연돌현상 시뮬레이션 */}
                    <div className="">
                      <h3 className="icon">연돌현상 시뮬레이션</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="comm-border border-0">
                          건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                          에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며,
                          에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.
                          <div className="text-box">
                            <ul>
                              <li>층별/존별 공기유동 및 압력차 분석</li>
                              <li>세부 건축요소의 문제발생 여부 검토</li>
                              <li>개선전략 케이스 별 저감효과 비교 분석</li>
                              <li>개선전략 우선순위 분석을 통한 최적화</li>
                            </ul>
                          </div>
                        </div>

                        <div className="comm-border-none">
                          <div className="image-wrap">
                            <Image src={resultChartEx3} alt="연돌현상 시뮬레이션" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-between space-x-4 mt-8">
                <button
                  onClick={() => {
                    setActiveTab('analysis');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-secondary w-full btn-50 rounded-xl
                    flex items-center justify-start gap-3"
                  style={{ maxWidth: '240px', backgroundColor: 'transparent' }}
                >
                  <Image src={ArrowLeft} alt="arrow-left" width={24} height={24} />
                  분석결과 다시보기
                </button>
                <Link
                  href="/engineering"
                  className="btn-primary w-full btn-50 rounded-xl
                    flex items-center justify-between gap-2"
                  style={{ maxWidth: '280px' }}
                >
                  연돌현상 검토보고서 요청하기
                  <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
