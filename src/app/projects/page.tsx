'use client';

import React, { useState } from 'react';
import '../../css/projects.css';
import Image from 'next/image';
import lotteTowerImg from '@/assets/images/lotte-tower.jpg';
import haeundaeImg from '@/assets/images/haeundae.jpg';
import acroImg from '@/assets/images/acro.jpg';
import lusailImg from '@/assets/images/lusail.png';

export default function ProjectsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // 필터 상태
  const [filter, setFilter] = useState({
    buildingType: '',
    height: '',
    client: '',
  });
  const [appliedFilter, setAppliedFilter] = useState(filter);

  const projects = [
    {
      title: '롯데월드타워',
      image: lotteTowerImg,
      desc: '롯데 월드타워 설계/시공단계에서의 \n연돌현상 분석 컨설팅 및 기밀성능 검토',
      detail: {
        building: '판교 제2테크로밸리 GE-2BL 인터파크 신축공사',
        scale: '지하 5층, 지상 14층',
        height: '70m',
        usage: '업무시설',
        client: '인터파크',
        content: '연돌효과 연향평가 (설계단계)',
        photo: lotteTowerImg,
      },
    },
    {
      title: '해운대 관광 리조트 개발사업',
      image: haeundaeImg,
      desc: '해운대 관광 리조트 개발사업 설계단계 \n연돌효과 저감용역',
      detail: {
        building: '해운대 관광 리조트 개발사업',
        scale: '글자길이 테스트 글자길이 테스트 글자길이 테스트',
        height: '150m',
        usage: '주거시설',
        client: '글자길이 테스트 글자길이 테스트 글자길이 테스트 글자길이 테스트 글자길이 테스트',
        content: '글자길이 테스트 \n글자길이 테스트 \n글자길이 테스트 \n글자길이 테스트 \n글자길이 테스트',
        photo: haeundaeImg,
      }
    },
    {
      title: '아크로 서울포레스트 신축공사',
      image: acroImg,
      desc: '아크로 서울포레스트 신축공사 \n연돌효과 저감 및 기밀 지침 용역',
      detail: {
        building: '아크로 서울포레스트 신축공사',
        scale: '',
        height: '300m',
        usage: '복합시설',
        client: '서울A건설',
        content: '',
        photo: acroImg,
      }
    },
    {
      title: 'LUSAIL PLAZA Tower',
      image: lusailImg,
      desc: 'LUSAIL PLAZA Tower 연돌현상 컨설팅',
      detail: null,
    },
    {
      title: '롯데월드타워 2',
      image: lotteTowerImg,
      desc: '롯데월드타워 추가 프로젝트',
      detail: {
        building: '판교 제2테크로밸리 GE-2BL 인터파크 신축공사',
        scale: '지하 5층, 지상 14층',
        height: '200m',
        usage: '호텔',
        client: '인터파크',
        content: '연돌효과 연향평가 (설계단계)',
        photo: lotteTowerImg,
      },
    },
    {
      title: '페이징 테스트',
      image: lusailImg,
      desc: '페이징 테스트',
      detail: null,
    },
  ];

  // 필터링 함수
  const isAllFilterEmpty = !appliedFilter.buildingType && !appliedFilter.height && !appliedFilter.client;
  const filteredProjects = projects.filter((p) => {
    // 모든 필터가 비어있으면 전체 데이터 반환(detail이 없어도 포함)
    if (isAllFilterEmpty) return true;
    // detail이 없으면 무조건 제외
    if (!p.detail) return false;
    // 건물 용도
    if (appliedFilter.buildingType && p.detail.usage !== appliedFilter.buildingType) return false;
    // 최고 높이
    if (appliedFilter.height) {
      const h = parseInt(p.detail.height);
      if (appliedFilter.height === 'under100' && (!h || h >= 100)) return false;
      if (appliedFilter.height === '100to200' && (!h || h < 100 || h > 200)) return false;
      if (appliedFilter.height === 'over200' && (!h || h <= 200)) return false;
    }
    // 발주처
    if (appliedFilter.client && (!p.detail.client || !p.detail.client.includes(appliedFilter.client))) return false;
    return true;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const pagedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  // 필터 변경 핸들러
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };
  // 필터 적용
  const handleApplyFilter = () => {
    setAppliedFilter(filter);
    setPage(1);
    setOpenIndex(null);
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">엔지니어링 프로젝트 실적</h1>
      
      {/* 대표 이미지 3개 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {projects.slice(0, 3).map((p, i) => (
          <div key={i} className="flex flex-col items-center bg-white rounded-lg shadow p-4">
            <div className="w-full h-46 bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden">
              <Image src={p.image} alt={p.title} width={400} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="font-bold mb-2 text-center">{p.title}</div>
            <div className="text-sm text-gray-600 text-center whitespace-pre-line">{p.desc}</div>
          </div>
        ))}
      </div>
      
      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm py-4 px-8 mb-8">
        <form className="flex flex-col sm:flex-row sm:flex-wrap gap-4 gap-x-10 w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
            <label htmlFor="buildingType" className="text-sm w-fit sm:w-fit font-medium">건물 용도</label>
            <select id="buildingType" className="px-2 py-1.5 border rounded-md w-full flex-1" value={filter.buildingType} onChange={handleFilterChange}>
              <option value="">전체</option>
              <option value="업무시설">업무시설</option>
              <option value="주거시설">주거시설</option>
              <option value="복합시설">복합시설</option>
              <option value="호텔">호텔</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
            <label htmlFor="height" className="text-sm w-fit sm:w-fit font-medium">최고 높이</label>
            <select id="height" className="px-2 py-1.5 border rounded-md w-full flex-1" value={filter.height} onChange={handleFilterChange}>
              <option value="">전체</option>
              <option value="under100">100m 미만</option>
              <option value="100to200">100m ~ 200m</option>
              <option value="over200">200m 이상</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
            <label htmlFor="client" className="text-sm w-fit sm:w-fit font-medium">발주처</label>
            <select id="client" className="px-2 py-1.5 border rounded-md w-full flex-1" value={filter.client} onChange={handleFilterChange}>
              <option value="">전체</option>
              <option value="인터파크">인터파크</option>
              <option value="서울A건설">서울A건설</option>
            </select>
          </div>
          <div className="flex items-end w-full sm:w-auto">
            <button type="button" className="px-3 py-1.5 btn-primary w-full sm:w-auto" onClick={handleApplyFilter}>
              필터 적용
            </button>
          </div>
        </form>
      </div>
      
      {/* 아코디언 프로젝트 목록 */}
      <div className="bg-white rounded-lg shadow py-4 px-8 mb-8 eng-projects">
        {pagedProjects.map((p, idx) => {
          // 실제 인덱스 계산 (페이지네이션 때문에)
          const realIdx = (page - 1) * pageSize + idx;
          return (
            <div key={realIdx} className="border-b project-item">
              <button
                className="w-full flex items-center justify-between py-4 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === realIdx ? null : realIdx)}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl font-bold">{openIndex === realIdx ? '➖' : '➕'}</span>
                  <span className="font-semibold text-lg text-left">{p.title}</span>
                </div>
              </button>
              {openIndex === realIdx && (
                <div className="flex flex-col-reverse md:flex-row gap-6 py-6 acc-info-wrap">
                  {/* 왼쪽: 정보 */}
                  <div className="flex-1">
                    {p.detail ? (
                      <div className="space-y-3 acc-info">
                        <div><span className="font-bold">대상건물<b>:</b></span> {p.detail.building}</div>
                        <div><span className="font-bold">규모<b>:</b></span> {p.detail.scale}</div>
                        <div><span className="font-bold">최고 높이<b>:</b></span> {p.detail.height}</div>
                        <div><span className="font-bold">용도<b>:</b></span> {p.detail.usage}</div>
                        <div><span className="font-bold">발주처<b>:</b></span> {p.detail.client}</div>
                        <div><span className="font-bold">컨설팅 내용<b>:</b></span> {p.detail.content}</div>
                      </div>
                    ) : (
                      <div className="text-gray-500">상세 정보 준비중</div>
                    )}
                  </div>
                  {/* 오른쪽: 이미지 */}
                  <div className="w-full md:w-80 h-60 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    {p.detail && p.detail.photo ? (
                      <Image src={p.detail.photo} alt={p.title + ' 사진'} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-gray-400">프로젝트 사진</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <div className="flex">
          <button
            className="w-10 h-10 flex items-center justify-center border rounded-l-md"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`w-10 h-10 flex items-center justify-center border ${page === i + 1 ? 'active-process-bg text-white' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="w-10 h-10 flex items-center justify-center border rounded-r-md"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
} 