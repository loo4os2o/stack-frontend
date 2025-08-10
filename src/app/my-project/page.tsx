'use client';

import lotteTowerImg from '@/assets/images/lotte-tower.jpg';
import type { Project } from '@/utils/commonInterface';
import { createClient } from '@supabase/supabase-js';
import humps from 'humps';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 프로젝트 타입
// 예시 데이터
const tmpProjects: Project[] = [
  {
    id: 1001,
    createdAt: '2025-05-10',
    projectName: 'A 오피스타워',

    buildingGeneralPlanResidential: false,
    buildingGeneralPlanOffice: false,
    buildingGeneralPlanNeighborhood: true,
    buildingGeneralPlanCultural: false,
    buildingGeneralEtcChecked: false,
    buildingGeneralEtcInput: '',
    location: '서울 강서구',
    buildingHeight: 120,
    zoningType: '싱글존 샤프트',
    imageUrl: lotteTowerImg,
    reportUrl: '/dummy-report-1.pdf',
  },
  {
    id: 1002,
    createdAt: '2025-06-05',
    projectName: 'B 주상복합',

    buildingGeneralPlanResidential: false,
    buildingGeneralPlanOffice: true,
    buildingGeneralPlanNeighborhood: false,
    buildingGeneralPlanCultural: false,
    buildingGeneralEtcChecked: false,
    buildingGeneralEtcInput: '',
    location: '대전 서구',
    buildingHeight: 200,
    zoningType: '투존 샤프트',
    imageUrl: null,
    reportUrl: null,
  },
  {
    id: 1003,
    createdAt: '2025-02-15',
    projectName: 'C 호텔',

    buildingGeneralPlanResidential: false,
    buildingGeneralPlanOffice: false,
    buildingGeneralPlanNeighborhood: false,
    buildingGeneralPlanCultural: false,
    buildingGeneralEtcChecked: true,
    buildingGeneralEtcInput: '기타 용도도',
    location: '서울 강남구',
    buildingHeight: 300,
    zoningType: '멀티존 샤프트',
    imageUrl: lotteTowerImg,
    reportUrl: '/dummy-report-3.pdf',
  },
];

export default function MyProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tab, setTab] = useState(0);
  const [showNoProject, setShowNoProject] = useState(false);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [projects, setProjects] = useState<any[]>([]);

  async function get_my_projects() {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error('User not authenticated or error fetching user:', userError);
      return;
    }

    const user = userData.user;
    const { data, error } = await supabase.from('project').select('*').eq('created_by', user.id);

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return humps.camelizeKeys(
      data.map((item) => {
        return {
          ...item,
          imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-image/${item.image_path}
`,
        };
      })
    );
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const projects: any = await get_my_projects();
      console.log('Fetched projects:', projects);
      setProjects([...projects, ...tmpProjects]);
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto py-16" style={{ minHeight: '60vh' }}>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">마이 프로젝트</h1>
        {!selectedProject && (
          <button
            className="text-gray-600 hover:text-gray-800 hover:underline"
            onClick={() => setShowNoProject((v) => !v)}
          >
            {showNoProject ? '프로젝트 리스트 뷰' : '빈 프로젝트 뷰'}
          </button>
        )}
        {selectedProject && (
          <button
            onClick={() => setSelectedProject(null)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <span>← 목록으로 돌아가기</span>
          </button>
        )}
      </div>

      {!selectedProject ? (
        showNoProject ? (
          <div
            className="flex flex-col items-center justify-between bg-white rounded-lg shadow-md p-16"
            style={{ minHeight: '40vh' }}
          >
            <div className="text-xl font-medium text-gray-500 mb-8 mt-16">
              마이 프로젝트가 없습니다.
            </div>
            <Link href="/evaluation">
              <button className="btn-primary">새프로젝트 평가하기</button>
            </Link>
          </div>
        ) : (
          // 프로젝트 리스트 테이블
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
                          onClick={() => setSelectedProject(project)}
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
                          onClick={() => setSelectedProject(project)}
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
        )
      ) : (
        // 프로젝트 상세 정보
        <>
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* 왼쪽: 프로젝트 정보 */}
            <div className="lg:w-1/3 w-full">
              <table className="w-full text-base border-separate border-spacing-0 bg-white rounded-xl shadow-lg overflow-hidden">
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 rounded-tl-xl text-left align-middle"
                    >
                      프로젝트명
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm rounded-tr-xl">
                      {selectedProject.projectName}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle"
                    >
                      프로젝트 번호
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">
                      {selectedProject.id}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle"
                    >
                      검토날짜
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">
                      {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle"
                    >
                      건물용도
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">
                      {selectedProject.buildingGeneralPlanResidential
                        ? '공동주택'
                        : selectedProject.buildingGeneralPlanOffice
                          ? '업무시설'
                          : selectedProject.buildingGeneralPlanNeighborhood
                            ? '근린생활시설'
                            : selectedProject.buildingGeneralPlanCultural
                              ? '문화/집회시설'
                              : selectedProject.buildingGeneralEtcInput}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle"
                    >
                      위치
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">
                      {selectedProject.location}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle"
                    >
                      건물 높이
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">
                      {selectedProject.buildingHeight}
                    </td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td
                      style={{ background: '#0055A4' }}
                      className="text-white font-medium px-6 py-4 w-40 text-left align-middle rounded-bl-xl"
                    >
                      샤프트 계획
                    </td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm rounded-br-xl">
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
                <button className="btn-primary btn-large mt-6 w-full">
                  엔지니어링 서비스 문의하기
                </button>
              </Link>
            </div>
            {/* 가운데: 차트 영역 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              <div
                className="w-full bg-white rounded-xl shadow flex items-center justify-center border border-gray-100 shadow-lg"
                style={{ height: '30rem' }}
              >
                <span className="text-gray-400">차트 영역</span>
              </div>
            </div>
            {/* 오른쪽: 대표 이미지 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              {selectedProject.imageUrl ? (
                <div
                  className="w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                  style={{ height: '30rem' }}
                >
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
                    layout="responsive"
                    quality={100}
                  />
                </div>
              ) : (
                <div
                  className="w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                  style={{ height: '30rem' }}
                >
                  <div className="text-gray-400">대표 이미지 없음</div>
                </div>
              )}
            </div>
          </div>
          {/* 탭 영역 */}
          <div className="border-b flex gap-2 mb-8">
            <button
              className={`px-4 py-2 font-medium ${tab === 0 ? 'border-b-2 border-blue-900 bg-blue-900 text-white' : 'text-gray-500'}`}
              onClick={() => setTab(0)}
              style={{ width: '50%' }}
            >
              연돌효과 분석결과
            </button>
            <button
              className={`px-4 py-2 font-medium ${tab === 1 ? 'border-b-2 border-blue-900 bg-blue-900 text-white' : 'text-gray-500'}`}
              onClick={() => setTab(1)}
              style={{ width: '50%' }}
            >
              해결방안 및 저감효과
            </button>
          </div>
          <div className="min-h-[120px]">
            {tab === 0 ? (
              <div>
                <section>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/2 left">
                      1. 분석 결과 요약
                      <br />
                      2. 연돌현상 예측 결과
                      <br />
                      3. 문제/하자 예상 결과
                      <br />
                      4. 압력차 검토 데이터
                    </div>
                  </div>
                </section>

                {/* 1. 분석 결과 요약 */}
                <section className="mt-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/2 left">
                      <h2 className="text-xl font-bold mb-6">1. 분석 결과 요약</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border rounded-md text-center">
                          <div className="text-xl font-semibold mb-8">연돌현상 영향도</div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-red-500">상</div>
                              <div className="text-lg">
                                연돌현상
                                <br />
                                위험도
                              </div>
                            </div>
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-orange-500">중</div>
                              <div className="text-lg">
                                예상 하자
                                <br />
                                발생도
                              </div>
                            </div>
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-[var(--primary-color)]">
                                필요
                              </div>
                              <div className="text-lg">
                                엔지니어링
                                <br />
                                권장도
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">
                            {selectedProject.projectName}
                          </div>
                          <div className="text-lg">
                            <p>
                              건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이
                              확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로
                              평가되었습니다.
                            </p>
                            <p>
                              건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이
                              확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로
                              평가되었습니다.
                            </p>
                          </div>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">문제발생 예상층</div>
                          <p>
                            본 건물은 실내외 온도 차 및 수직 높이에 따른 압력차로 인해 연돌현상이
                            발생할 수 있는 구조적 특성을 갖고 있으며, 특히 겨울철에는 하층부 외부
                            공기 유입과 상층부의 과도한 공기 배출 경향이 확인되었습니다. 이에 따라
                            환기 설비 및 샤프트 차압 제어가 필요한 것으로 평가됩니다.
                          </p>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">최대 연돌 압력차(PA)</div>
                          <p>
                            CFD 시뮬레이션 결과, 외기와 실내의 온도차가 20℃ 이상일 경우 연돌
                            압력차가 최대 25Pa까지 증가하며, 이로 인해 계단실 및 엘리베이터 샤프트를
                            통한 공기 흐름이 상·하층 간 불균형을 유발하는 것으로 분석되었습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div>
                <section>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/2 left">
                      1. 해결방안 개요
                      <br />
                      2. 개선안 리스트
                      <br />
                      3. 연돌현상 설계검토 및 시뮬레이션
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
