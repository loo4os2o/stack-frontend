'use client';

import type { Project } from '@/utils/commonInterface';
// import "@/css/myproject.css";
import { default as ArrowRight, default as IconEx } from '@/assets/icons/icon-btn-more.png';
import RangeBarWithBullet from '@/components/charts/RangeBarWithBullet';
import humps from 'humps';
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
import ArrowLeft from '@/assets/icons/icon-btn-more-bg.png';
import iconDecrease from '@/assets/icons/icon-decrease.png';
import iconIncrease from '@/assets/icons/icon-plus.png';
import iconLightOn from '@/assets/icons/icon-result-light.png';
import resultChartEx1 from '@/assets/images/evaluation/08_result_001.png';
import resultChartEx2 from '@/assets/images/evaluation/09_solution _001.png';
import resultChartEx3 from '@/assets/images/evaluation/09_solution _002.png';
import DonutGauge from '@/components/charts/DonutGauge';
import ElevatorStackedBarChart from '@/components/charts/ElevatorStackedBarChart';
import HorizontalBarWithBullet from '@/components/charts/HorizontalBarWithBullet';
import HorizontalGaugeBar from '@/components/charts/HorizontalGaugeBar';
import NestedHalfDonutGauge from '@/components/charts/NestedHalfDonutGauge';
import SectionStackedBarChart from '@/components/charts/SectionStackedBarChart';
import VerticalRangeBar from '@/components/charts/VerticalRangeBar';
import LoadingComponent from '@/components/common/loading';
import '@/css/evaluation.css';
import { generateSectionDataArray } from '@/lib/buildingSection';
import { analyzeElevatorShaftSystem } from '@/lib/elevatorCalc';

import ImageChart1 from '@/assets/images/03_input _000.png';
import ImageChart2 from '@/assets/images/03_input _005.png';
import HorizontalFillWithMarkers from '@/components/charts/HorizontalFillWithMarker';
import { useUserStore } from '@/utils/store';
import { createClient } from '@supabase/supabase-js';

// 차트 데이터
const chartData: {
  ranges: { x: number; start: number; end: number }[];
  bullets: { x: number; y: number }[];
  blocksData: {
    name: string;
    blocks: { start: number; end: number; type: 'danger' | 'warning' | 'normal' }[];
  }[];
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
  blocksData: [
    {
      name: 'a',
      blocks: [
        { start: 0, end: 3, type: 'warning' },
        { start: 3, end: 6, type: 'normal' },
        { start: 6, end: 10, type: 'warning' },
        { start: 10, end: 16, type: 'normal' },
        { start: 16, end: 20, type: 'danger' },
        { start: 20, end: 25, type: 'warning' },
      ],
    },
    {
      name: 'b',
      blocks: [
        { start: 0, end: 3, type: 'warning' },
        { start: 3, end: 6, type: 'normal' },
        { start: 6, end: 10, type: 'warning' },
        { start: 10, end: 16, type: 'normal' },
        { start: 16, end: 20, type: 'danger' },
        { start: 20, end: 25, type: 'warning' },
      ],
    },
    {
      name: 'c',
      blocks: [
        { start: 0, end: 3, type: 'warning' },
        { start: 3, end: 6, type: 'normal' },
        { start: 6, end: 10, type: 'warning' },
        { start: 10, end: 16, type: 'normal' },
        { start: 16, end: 20, type: 'danger' },
        { start: 20, end: 25, type: 'warning' },
      ],
    },
  ],
};

export default function EvaluationResultPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tab, setTab] = useState(0);
  const [showNoProject, setShowNoProject] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);
  const [cameFromList, setCameFromList] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [projects, setProjects] = useState<any[]>([]);
  const { user, accessToken, refreshToken } = useUserStore();

  const buildingGeneralUsageOptions: Array<{ key: keyof Project; label: string }> = [
    { key: 'buildingGeneralPlanResidentialGeneral', label: '공동주택(일반)' },
    { key: 'buildingGeneralPlanResidentialMixed', label: '공동주택(주상복합)' },
    { key: 'buildingGeneralPlanOffice', label: '업무시설' },
    { key: 'buildingGeneralPlanHotel', label: '호텔시설' },
    { key: 'buildingGeneralPlanComplex', label: '복합시설(예: 주거+호텔)' },
    { key: 'buildingGeneralPlanRetail', label: '판매시설' },
    { key: 'buildingGeneralPlanCultural', label: '문화집회시설' },
    { key: 'buildingGeneralPlanNeighborhood', label: '근린생활시설' },
  ];
  const buildingUsageDisplay =
    selectedProject == null
      ? ''
      : (() => {
          const selected = buildingGeneralUsageOptions
            .filter(({ key }) => Boolean(selectedProject[key]))
            .map(({ label }) => label);

          if (selectedProject.buildingGeneralEtcChecked && selectedProject.buildingGeneralEtcInput) {
            selected.push(selectedProject.buildingGeneralEtcInput);
          } else if (!selected.length && selectedProject.buildingGeneralEtcInput) {
            selected.push(selectedProject.buildingGeneralEtcInput);
          }

          return selected.join(', ');
        })();

  const [summary, setSummary] = useState<any>(null);
  const [stackEffectForecast, setStackEffectForecast] = useState<any>(null);
  const [issueForecast, setIssueForecast] = useState<any>(null);
  const [pressureDiffrentials, setPressureDiffrentials] = useState<any>(null);
  const [solutionOverview, setSolutionOverview] = useState<any>(null);
  const [solutionRecommendations, setSolutionRecommendations] = useState<any>(null);
  const [solutionSimulation, setSolutionSimulation] = useState<any>(null);

  const fetchSummary = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const summary = await getSummary(selectedProject?.id, accessToken);
    setSummary(summary);
  };
  const fetchStackEffectForecast = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const stackEffectForecast = await getStackEffectForecast(selectedProject?.id, accessToken);
    setStackEffectForecast(stackEffectForecast);
  };

  const fetchIssueForecast = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const issueForecast = await getIssueForecast(selectedProject?.id, accessToken);
    setIssueForecast(issueForecast);
  };

  const fetchPressureDiffrentials = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const pressureDiffrentials = await getPressureDiffrentials(selectedProject?.id, accessToken);
    setPressureDiffrentials(pressureDiffrentials);
  };

  const fetchSolutionOverview = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const solutionOverview = await getSolutionOverview(selectedProject?.id, accessToken);
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
    setSolutionRecommendations(solutionRecommendations);
  };

  const fetchSolutionSimulation = async () => {
    if (!accessToken) {
      console.error('accessToken is null');
      return;
    }
    const solutionSimulation = await getSolutionSimulation(selectedProject?.id, accessToken);
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

  async function get_my_projects() {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error('User not authenticated or error fetching user:', userError);
      return { projects: [], isAdmin: false };
    }

    const user = userData.user;

    // 관리자 권한 확인 (예: 이메일로 관리자 판단)
    const adminEmails = ['admin@example.com']; // 관리자 이메일
    const isUserAdmin = adminEmails.includes(user.email || '');

    // 관리자인 경우 모든 프로젝트 조회, 일반 유저는 자신의 프로젝트만 조회
    const { data, error } = isUserAdmin
      ? await supabase.from('project').select('*')
      : await supabase.from('project').select('*').eq('created_by', user.id);

    if (error) {
      console.error('Error fetching projects:', error);
      return { projects: [], isAdmin: isUserAdmin };
    }

    const projects = humps.camelizeKeys(
      data.map((item) => {
        return {
          ...item,
          imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-image/${item.imagePath}
`,
        };
      })
    );

    return { projects, isAdmin: isUserAdmin };
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData) {
          console.error('사용자 인증 오류:', userError);
          return;
        }
        console.log('userData', userData);
        const { data: projects, error } = await supabase
          .from('project')
          .select('*')
          .eq('created_by', userData.user.id)
          .eq('is_used', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // snake case를 camel case로 변환 및 이미지 URL 추가
        const camelCaseProjects = projects
          ? projects.map((project) => {
              const camelProject = humps.camelizeKeys(project) as Project;
              return {
                ...camelProject,
                imageUrl: camelProject.imagePath
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-image/${camelProject.imagePath}`
                  : null,
              };
            })
          : [];

        console.log('프로젝트 조회 결과:', camelCaseProjects);
        setProjects(camelCaseProjects);
        setIsAdmin(userData.user.user_metadata?.is_admin || false);

        // 프로젝트가 있으면 첫 번째 프로젝트를 선택하여 상세보기 페이지 표시
        if (camelCaseProjects.length > 0) {
          setSelectedProject(camelCaseProjects[0]);
        }
      } catch (error) {
        console.error('프로젝트 조회 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => console.log('selectedProject', selectedProject), [selectedProject]);

  // 탭부분 (※ 연돌현상 예측평가 결과와 동일하게 퍼블리싱)
  const [activeTab, setActiveTab] = useState('analysis');

  return (
    <div className="container mx-auto pt-10 pb-20 ev-result-page" style={{ minHeight: '60vh' }}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <h1 className="text-3xl font-bold">연돌현상 예측평가 결과</h1>
      </div>

      {isLoading ? (
        <div className="loading-wrap">
          <LoadingComponent message="프로젝트 결과 분석 중입니다." variant="inline" />
        </div>
      ) : showProjectList ? (
        // 프로젝트 리스트 테이블 (admin만)
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    프로젝트 번호
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    프로젝트 생성일자
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    프로젝트명
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이용 서비스
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기본 보고서 다운로드
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        className="text-blue-700 underline hover:text-blue-900 cursor-pointer"
                        onClick={() => {
                          setSelectedProject(project);
                          setShowProjectList(false);
                          setCameFromList(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {project.id}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        className="text-blue-700 hover:text-blue-900 cursor-pointer"
                        onClick={() => {
                          setSelectedProject(project);
                          setShowProjectList(false);
                          setCameFromList(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {project.projectName}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {/* {project.service.map((s: any, index: number) => (
                        <span
                          key={index + 1}
                          className="btn-secondary px-2 py-0.5 text-xs font-medium mr-1 last:mr-0"
                        >
                          {s}
                        </span>
                      ))} */}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {project.reportUrl ? (
                        <a href={project.reportUrl} download className="btn-primary btn-small">
                          다운로드
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : !selectedProject ? (
        // 프로젝트가 없을 때만 빈 프로젝트 화면 표시
        <div className="my-project-nodata">
          <div className="no-data-wrap">아직 등록된 프로젝트가 없어요.</div>
          <Link href="/evaluation">
            <button className="btn-primary">새 프로젝트 평가하기</button>
          </Link>
        </div>
      ) : (
        // 프로젝트 상세 정보
        <>
          <div className="flex flex-col lg:flex-row gap-8 mb-16 my-project">
            {/* 왼쪽: 프로젝트 정보 */}
            <div className="lg:w-1/3 w-full">
              <table className="my-project-table">
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>프로젝트명</th>
                    <td>{selectedProject.projectName}</td>
                  </tr>
                  <tr>
                    <th>프로젝트 번호</th>
                    <td>{selectedProject.id}</td>
                  </tr>
                  <tr>
                    <th>검토날짜</th>
                    <td>{new Date(selectedProject.createdAt).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>건물용도</th>
                    <td>{buildingUsageDisplay || '-'}</td>
                  </tr>
                  <tr>
                    <th>위치</th>
                    <td>{selectedProject.location}</td>
                  </tr>
                  <tr>
                    <th>건물 높이</th>
                    <td>{`${selectedProject.buildingHeight}m`}</td>
                  </tr>
                  <tr>
                    <th>샤프트 계획</th>
                    <td>
                      {selectedProject.zoningType === 'single'
                        ? '싱글존 샤프트'
                        : selectedProject.zoningType === 'multi'
                          ? '멀티존 샤프트'
                          : selectedProject.zoningType === 'tower'
                            ? '투존 샤프트'
                            : ''}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link href="/engineering">
                <button
                  className="btn-primary w-full btn-50 rounded-xl
                  flex items-center justify-between gap-2 mt-8"
                >
                  엔지니어링 서비스 문의하기
                  <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
                </button>
              </Link>
            </div>

            {/* 가운데: 차트 영역 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              <div className="chart-wrap" style={{ height: '350px', width: '100%' }}>
                {/* 차트 - 중성대 위치 */}
                <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} />
              </div>
            </div>

            {/* 오른쪽: 대표 이미지 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              {selectedProject.imageUrl ? (
                <div className="image-wrap" style={{ height: '350px' }}>
                  <Image
                    src={
                      typeof selectedProject.imageUrl === 'string'
                        ? selectedProject.imageUrl.trimEnd()
                        : selectedProject.imageUrl
                    }
                    alt="대표 이미지"
                    className="object-cover w-full h-full"
                    width={378}
                    height={480}
                    // layout="responsive"
                    quality={100}
                  />
                </div>
              ) : (
                <div className="image-wrap" style={{ height: '350px', background: '#f7f7f7' }}>
                  <div className="text-gray-400">대표 이미지 없음</div>
                </div>
              )}
            </div>
          </div>

          {/* 탭 영역 */}
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
                          <HorizontalFillWithMarkers
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
                          {summary?.optimization?.First && (
                            <div className="flex-row-center border-2 rounded-full">
                              <Image src={IconEx} alt="icon1" width={60} height={60} />
                            </div>
                          )}
                          {summary?.optimization?.Second && (
                            <div className="flex-row-center border-2 rounded-full">
                              <Image src={IconEx} alt="icon2" width={60} height={60} />
                            </div>
                          )}
                          {summary?.optimization?.Third && (
                            <div className="flex-row-center border-2 rounded-full">
                              <Image src={IconEx} alt="icon3" width={60} height={60} />
                            </div>
                          )}
                          {summary?.optimization?.Fourth && (
                            <div className="flex-row-center border-2 rounded-full">
                              <Image src={IconEx} alt="icon4" width={60} height={60} />
                            </div>
                          )}
                          {summary?.optimization?.Fifth && (
                            <div className="flex-row-center border-2 rounded-full">
                              <Image src={IconEx} alt="icon5" width={60} height={60} />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="comm-border">
                        <div className="border-0">
                          <p>
                            ‘연돌효과 영향도’는 건물 내 연돌효과로 인한 압력분포가 미치는 다양한 문제점을
                            수치화한 지표로, 연돌현상으로 알려진 제반 문제점의 수준을 나타냅니다.
                          </p>
                          <p className="mt-3">
                            <strong>: 주요 평가요소</strong>
                            <br />최대 압력차 (Ip): 로비층 및 최상층에서의 최대 압력차, [Ip] 환산 데이터
                            <br />문제 발생층 비율 (Ir): 기준 압력차를 초과하는 층의 비율, [Ir] 환산 데이터
                            <br />건축계획 요소 (Ia): 연돌현상에 영향을 미치는 계획적 요인, [Ia] 환산 데이터
                          </p>
                          <p className="mt-3">
                            <strong>등급 정의</strong>
                            <br />문제 없음: 주요 구간에서 유의할 만한 압력차 문제가 없음(단, 상세 건축계획에
                            따라 달라질 수 있음)
                            <br />문제 우려: 일부 구간에서 압력차 문제가 발생할 가능성이 있으며, 사전 검토 및
                            건축적 개선이 필요함
                            <br />문제 발생: 다수 구간에서 압력차 문제가 발생하며, 개선안 저감수준에 대한 검토가
                            필요함
                            <br />문제 심각: 대부분 구간에서 압력차 문제가 발생하며, 특정 구간은 문제가 매우
                            심각함
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
                      <div className="chart-wrap w-1/6">
                        {/* 차트 - 문제 발생 예상층 */}
                        {/* <VerticalRangeBar blocks={chartData.blocks} /> */}
                        <SectionStackedBarChart
                          data={generateSectionDataArray({
                            groundFloors: selectedProject?.aboveFloors ?? 0,
                            basementFloors: selectedProject?.belowFloors ?? 0,
                            hasPodium: selectedProject?.hasPodium ?? true,
                            podiumFloors: selectedProject?.podiumHeight ?? 0,
                          })}
                          width={200}
                          height={400}
                        />
                      </div>
                      <div className="chart-wrap w-2/6" style={{ paddingBottom: 0 }}>
                        {/* 차트 - 중성대 위치 */}
                        {/* <RangeBarWithBullet ranges={chartData.ranges} bullets={chartData.bullets} /> */}
                        <ElevatorStackedBarChart
                          data={analyzeElevatorShaftSystem({
                            numFloorGround: selectedProject?.aboveFloors ?? 0,
                            numFloorBasement: selectedProject?.belowFloors ?? 0,
                            EVZoningtypeSingle: selectedProject?.zoningType === 'single',
                            EVZoningtypeTwo: selectedProject?.zoningType === 'two',
                            EVZoningtypeMulti: selectedProject?.zoningType === 'multi',
                            EVSkylobby: selectedProject?.skyLobby ?? false,
                            EVTopfloorLow: selectedProject?.shaftBelowFloors ?? 0,
                            EVTopfloorMid: selectedProject?.shaftAboveFloors ?? 0,
                            EVTopfloorHigh: selectedProject?.shaftAdditionalAboveFloors ?? 0,
                            EVBasementshuttle: selectedProject?.shuttleElevator ?? false,
                          })}
                          width={360}
                          height={360}
                        />
                      </div>
                      <div className="chart-wrap w-3/6" style={{ paddingBottom: 0 }}>
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
                    <div className="mb-8 md:mb-0">
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
                                <div className="title">화재 및 피난 안전 문제</div>
                                <div className="desc">수직 샤프트를 통한 연기 전파로 피난 안전성 저하</div>
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
                                <div className="title">건축 요소 과압 문제</div>
                                <div className="desc">
                                압력차로 인해 문이 열리거나 닫히기 어려움(보행 불편, 안전 문제)
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
                                <div className="title">엘리베이터문 오작동 및 고장</div>
                                <div className="desc">
                                엘리베이터 운행 장애 및 진동 문제 발생
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
                                <div className="title">엘리베이터문/출입문 소음 발생</div>
                                <div className="desc">틈새를 통한 고주파 소음 발생</div>
                              </div>
                            </div>
                          )}
                          {issueForecast?.MajorIssuesAndDefects?.energySystemError && (
                            <div className={`icon-list`}>
                              <div className="icon-box">
                                <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘5" />
                              </div>
                              <div className="text-wrap">
                                <div className="title">에너지 손실 및 실내 공기유동 불안정</div>
                                <div className="desc">침기/누기 증가, 환기성능 저하, 압력제어 오류</div>
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
                          <div className="chart-wrap w-1/2">
                            {/* 차트 - 중성대 위치 */}
                            {/* <RangeBarWithBullet
                              ranges={chartData.ranges}
                              bullets={chartData.bullets}
                            /> */}
                            <ElevatorStackedBarChart
                              data={analyzeElevatorShaftSystem({
                                numFloorGround: selectedProject?.aboveFloors ?? 0,
                                numFloorBasement: selectedProject?.belowFloors ?? 0,
                                EVZoningtypeSingle: selectedProject?.zoningType === 'single',
                                EVZoningtypeTwo: selectedProject?.zoningType === 'two',
                                EVZoningtypeMulti: selectedProject?.zoningType === 'multi',
                                EVSkylobby: selectedProject?.skyLobby ?? false,
                                EVTopfloorLow: selectedProject?.shaftBelowFloors ?? 0,
                                EVTopfloorMid: selectedProject?.shaftAboveFloors ?? 0,
                                EVTopfloorHigh: selectedProject?.shaftAdditionalAboveFloors ?? 0,
                                EVBasementshuttle: selectedProject?.shuttleElevator ?? false,
                              })}
                            />
                          </div>

                          {/* 차트 - 압력분포 프로파일 */}
                          {/* <div className="chart-wrap w-1/2">
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
                              {pressureDiffrentials?.pressureDifferentials
                                ?.topFloorExceedStandardPressureMin ?? 0}{' '}
                              -{' '}
                              {pressureDiffrentials?.pressureDifferentials
                                ?.topFloorExceedStandardPressureMax ?? 0}
                              Pa
                              <span className="ml-2.5">/&nbsp; 120일</span>
                            </div>
                          </div>
                          <div className="box-wrap">
                            <div className="box-title">기준 압력 초과일수 - 로비층</div>
                            <div className="data-box">
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyExceedStandardPressureMin ?? 0}{' '}
                              -{' '}
                              {pressureDiffrentials?.pressureDifferentials
                                ?.lobbyExceedStandardPressureMax ?? 0}
                              Pa
                              <span className="ml-2.5">/&nbsp; 120일</span>
                            </div>
                          </div>
                          <div className="box-wrap-bg">
                            {pressureDiffrentials?.pressureDifferentials?.pressureResultDesc}
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
                          <HorizontalFillWithMarkers
                            fillValue={summary?.optimization?.currentProj}
                            fillLabel="Before"
                            markerValue={summary?.optimization?.solutionOptimization}
                            markerLabel="After Professional Plus"
                            max={100}
                            height={64}
                            showTooltip={false}
                          />
                        </div>
                        {/* <div className="flex flex-row gap-4 mt-6 justify-between">
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
                        </div> */}
                      </div>

                      <div className="comm-border">
                        <h3>{selectedProject?.projectName}</h3>
                        <div className="border-0">{solutionOverview?.project?.projResultDesc}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5">
                      <div className="comm-border">
                        <h3>연돌현상 해결방안</h3>
                        <div className="flex flex-row gap-4 mb-4">
                          {solutionOverview?.solutions.map((item: any, index: number) => {
                            console.log(`solution${index + 1}`, item[`solution${index + 1}`]);
                            if (item[`solution${index + 1}`]) {
                              return (
                                <div className="icon-box-col">
                                  <div className="icon-box">
                                    <Image
                                      src={iconLightOn}
                                      alt={`중요 문제 및 하자 아이콘${index + 1}`}
                                    />
                                  </div>
                                  아이콘 {index + 1}
                                </div>
                              );
                            } else {
                              return;
                            }
                          })}
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
                  {solutionRecommendations?.savingRate < 0 ? (
                    <>
                      <Image src={iconDecrease} alt="절감 아이콘" width={14} height={14} />
                      <strong>{Math.abs(solutionRecommendations?.savingRate)}%</strong> 절감
                    </>
                  ) : (
                    <>
                      <Image src={iconIncrease} alt="증가 아이콘" width={14} height={14} />
                      <strong>{Math.abs(solutionRecommendations?.savingRate)}%</strong> 증가
                    </>
                  )}
                </div>
              </div>
              {/* 2. 개선안 리스트 */}
              <section>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-2/2 left">
                    {/* 리스트 */}
                    <div className="flex flex-col gap-4 col-span-2">
                      {solutionRecommendations?.fireEvacuationSafety && (
                        <div className="icon-list">
                          <div className="icon-box">
                            <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘1" />
                          </div>
                          <div className="text-wrap">
                            <div className="title">화재 및 피난 안전</div>
                            <div className="desc">화재 및 피난 안전 화재 및 피난 안전 화재</div>
                            <div className="sub"># 개선안이 반영된 설계도면 필요 </div>
                            <div className="sub">
                              # 공기유동 상세 시뮬레이션 검토 후 설치층 체크 
                            </div>
                          </div>
                        </div>
                      )}

                      {solutionRecommendations?.constructionDefect && (
                        <div className="icon-list">
                          <div className="icon-box">
                            <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘2" />
                          </div>
                          <div className="text-wrap">
                            <div className="title">건축 요소/자재 하자</div>
                            <div className="desc">건축 요소/자재 하자건축요소 자재하자 건축</div>
                            <div className="sub">시뮬레이션 검토 필요</div>
                          </div>
                        </div>
                      )}

                      {solutionRecommendations?.elevatorDoorFailure && (
                        <div className="icon-list">
                          <div className="icon-box">
                            <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘3" />
                          </div>
                          <div className="text-wrap">
                            <div className="title">엘리베이터 도어 오작동 및 고장</div>
                            <div className="desc">
                              화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난 화재 및 피난 화재
                              및 피난
                            </div>
                          </div>
                        </div>
                      )}

                      {solutionRecommendations?.doorNoise && (
                        <div className="icon-list">
                          <div className="icon-box">
                            <Image src={iconLightOn} alt="중요 문제 및 하자 아이콘4" />
                          </div>
                          <div className="text-wrap">
                            <div className="title">도어 소음 (휘슬링)</div>
                            <div className="desc">도어 소음 (휘슬링)</div>
                          </div>
                        </div>
                      )}

                      {solutionRecommendations?.energySystemError && (
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
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-5 mt-8">
                <h2>
                  <span className="num">3</span> 연돌현상 설계검토 및 시뮬레이션
                </h2>
                <div className="title-sub mb-3">
                  {solutionSimulation?.savingRate < 0 ? (
                    <>
                      <Image src={iconDecrease} alt="절감 아이콘" width={14} height={14} />
                      <strong>{Math.abs(solutionSimulation?.savingRate)}%</strong> 절감
                    </>
                  ) : (
                    <>
                      <Image src={iconIncrease} alt="증가 아이콘" width={14} height={14} />
                      <strong>{Math.abs(solutionSimulation?.savingRate)}%</strong> 증가
                    </>
                  )}
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
