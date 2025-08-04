'use client';

import React, { useState } from 'react';
import '../../css/projects.css';
import Image from 'next/image';
import lotteTowerImg from '@/assets/images/lotte-tower.jpg';
import haeundaeImg from '@/assets/images/haeundae.jpg';
import acroImg from '@/assets/images/acro.jpg';
import lusailImg from '@/assets/images/lusail.png';
import type { StaticImageData } from 'next/image';
import ImageUploadButton from '@/components/ImageUploadButton';
import ImagePreview from '@/components/ImagePreview';
import accMinus from '@/assets/icons/icon-minus.png';
import accPlus from '@/assets/icons/icon-plus.png';
import pagenationPrev from '@/assets/icons/icon-prev.png';
import pagenationNext from '@/assets/icons/icon-next.png';

// 프로젝트 타입 정의
type ProjectDetail = {
  building: string;
  scale: string;
  height: string;
  usage: string;
  client: string;
  content: string;
  photo: string | StaticImageData;
};
type Project = {
  title: string;
  desc: string;
  image: string | StaticImageData;
  detail: ProjectDetail | null;
  repProject: boolean;
};

export default function ProjectsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 필터 상태
  const [filter, setFilter] = useState({
    buildingType: '',
    height: '',
    client: '',
  });
  const [appliedFilter, setAppliedFilter] = useState(filter);

  // 샘플 5개 데이터
  const baseProjects = [
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
      repProject: true,
    },
    {
      title: '해운대 관광 리조트 개발사업',
      image: haeundaeImg,
      desc: '해운대 관광 리조트 개발사업 설계단계 \n연돌효과 저감용역',
      detail: {
        building: '해운대 관광 리조트 개발사업',
        scale: '지하 3층, 지상 20층',
        height: '150m',
        usage: '주거시설',
        client: '해운대관광',
        content: '연돌효과 저감 컨설팅',
        photo: haeundaeImg,
      },
      repProject: true,
    },
    {
      title: '아크로 서울포레스트 신축공사',
      image: acroImg,
      desc: '아크로 서울포레스트 신축공사 \n연돌효과 저감 및 기밀 지침 용역',
      detail: {
        building: '아크로 서울포레스트 신축공사',
        scale: '지하 6층, 지상 49층',
        height: '300m',
        usage: '복합시설',
        client: '서울A건설',
        content: '기밀 지침 및 연돌효과 저감',
        photo: acroImg,
      },
      repProject: true,
    },
    {
      title: 'LUSAIL PLAZA Tower',
      image: lusailImg,
      desc: 'LUSAIL PLAZA Tower 연돌현상 컨설팅',
      detail: null,
      repProject: false,
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
      repProject: false,
    },
  ];

  // 50개 프로젝트 생성 (랜덤 섞기)
  function getRandomInt(max: number) { return Math.floor(Math.random() * max); }
  const projects = Array.from({ length: 50 }).map((_, i) => {
    const base = baseProjects[getRandomInt(baseProjects.length)];
    // title, desc, detail.building 등에 인덱스 붙여 구분
    return {
      ...base,
      title: `${base.title} ${i + 1}`,
      desc: `${base.desc}\n(프로젝트 번호: ${i + 1})`,
      detail: base.detail ? { ...base.detail, building: `${base.detail.building} ${i + 1}` } : null,
    };
  });

  // 관리자 권한 확인
  // const [isAdmin, setIsAdmin] = useState(false);
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsAdmin(localStorage.getItem('userRole') === 'admin');
  //   }
  // }, []);

  // 프로젝트 상태 관리 (삭제/추가/수정 반영)
  const [projectList, setProjectList] = useState<(Project | typeof projects[number])[]>(projects);
  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Project>({
    title: '',
    desc: '',
    image: '',
    detail: {
      building: '', scale: '', height: '', usage: '', client: '', content: '', photo: ''
    },
    repProject: false,
  });

  // 이미지 미리보기 상태
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 필터링 함수
  const isAllFilterEmpty = !appliedFilter.buildingType && !appliedFilter.height && !appliedFilter.client;
  const filteredProjects = projectList.filter((p) => {
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

  // 삭제
  // const handleDelete = (idx: number) => {
  //   setProjectList(prev => prev.filter((_, i) => i !== idx));
  //   setOpenIndex(null);
  // };
  // 수정 모달 열기
  // const handleEdit = (idx: number) => {
  //   setModalType('edit');
  //   setEditIdx(idx);
  //   setForm(projectList[idx]);
  //   // 기존 이미지가 있으면 미리보기로 세팅 (string 또는 StaticImageData 모두)
  //   const photo = projectList[idx].detail?.photo;
  //   if (typeof photo === 'string') {
  //     setPreviewUrl(photo);
  //   } else if (photo && typeof photo === 'object' && 'src' in photo) {
  //     setPreviewUrl(photo.src);
  //   } else {
  //     setPreviewUrl(null);
  //   }
  //   setModalOpen(true);
  // };
  // 추가 모달 열기
  // const handleAdd = () => {
  //   setModalType('add');
  //   setForm({
  //     title: '', desc: '', image: '', detail: { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' },
  //     repProject: false,
  //   });
  //   setPreviewUrl(null);
  //   setModalOpen(true);
  // };
  // 저장(수정/추가)
  const handleSave = () => {
    if (modalType === 'edit' && editIdx !== null) {
      setProjectList(prev => prev.map((p, i) => i === editIdx ? form : p));
    } else if (modalType === 'add') {
      setProjectList(prev => [form, ...prev]);
    }
    setModalOpen(false);
    setEditIdx(null);
    setModalType(null);
  };

  return (
    <div className="container mx-auto py-10 projects-page">
      <h1 className="text-3xl font-bold mb-5">엔지니어링 프로젝트 실적</h1>
      
      {/* 대표 이미지 3개 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {baseProjects.filter(p => p.repProject).map((p, i) => (
          <div key={i} className="main-img-wrap">
            <div className="img-wrap">
              <Image src={p.image} alt={p.title} width={400} height={200} className="object-cover w-full h-full" />
            </div>
            <div className="title">{p.title}</div>
            <div className="desc">{p.desc}</div>
          </div>
        ))}
      </div>
      
      {/* 필터 */}
      <div className="filter-wrap">
        <form className="flex flex-col gap-5 md:flex-row">
          <div className="form-group">
            <label htmlFor="buildingType">건물 용도</label>
            <select id="buildingType" className="px-2 py-1.5 border rounded-md w-full flex-1" value={filter.buildingType} onChange={handleFilterChange}>
              <option value="">전체</option>
              <option value="업무시설">업무시설</option>
              <option value="주거시설">주거시설</option>
              <option value="복합시설">복합시설</option>
              <option value="호텔">호텔</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="height">최고 높이</label>
            <select id="height" className="px-2 py-1.5 border rounded-md w-full flex-1" value={filter.height} onChange={handleFilterChange}>
              <option value="">전체</option>
              <option value="under100">100m 미만</option>
              <option value="100to200">100m ~ 200m</option>
              <option value="over200">200m 이상</option>
            </select>
          </div>
          
          <div className="flex items-end w-full sm:w-auto">
            <button type="button" className="btn-primary w-full" onClick={handleApplyFilter}>
              필터 적용
            </button>
          </div>
        </form>
      </div>
      
      {/* 아코디언 프로젝트 목록 */}
      <div className="py-4 px-8 mb-8 eng-projects">
        {/* {isAdmin && (
          <div className="flex justify-end">
          <button className="btn-primary login-active px-4 py-2 text-sm" onClick={handleAdd}>
              + 추가하기
            </button>
          </div>
        )} */}
        {pagedProjects.length > 0 ? (
          pagedProjects.map((project) => {
            // projectList에서의 실제 인덱스 찾기
            const realIdx = projectList.findIndex(p => p === project);
            return (
              <div key={realIdx} className="project-item">
                <div className="">
                  <button
                    className=""
                    onClick={() => setOpenIndex(openIndex === realIdx ? null : realIdx)}
                  >
                    <span className="">
                      {openIndex === realIdx ? 
                        <Image src={accMinus} alt="펼쳐진 상태 마이너스 아이콘" width={24} height={24} /> 
                        : <Image src={accPlus} alt="접힌 상태 플러스 아이콘" width={24} height={24} /> }
                    </span>
                    <span className="font-semibold text-lg text-left">{project.title}</span>
                  </button>
                  {/* {isAdmin && (
                    <div className="flex items-center gap-2 ml-2 mb-4 sm:mb-0">
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={project.repProject}
                          onChange={() => {
                            setProjectList(prev => prev.map((item, i) =>
                              i === realIdx ? { ...item, repProject: !item.repProject } : item
                            ));
                          }}
                        /> 대표프로젝트
                      </label>
                      <button className="px-2 py-1 text-sm border rounded hover:bg-gray-100" onClick={() => handleEdit(realIdx)}>수정</button>
                      <button className="px-2 py-1 text-sm border rounded text-red-500 hover:bg-red-50" onClick={() => handleDelete(realIdx)}>삭제</button>
                    </div>
                  )} */}
                </div>
                {openIndex === realIdx && (
                  <div className="acc-info-wrap">
                    {/* 왼쪽쪽: 이미지 */}
                    {project.detail && project.detail.photo ? (
                      <div className="img-wrap">
                        <Image
                          src={typeof project.detail.photo === 'string' ? project.detail.photo : project.detail.photo}
                          alt={project.title + ' 사진'}
                          className="object-cover"
                          fill
                        />
                      </div>
                    ) : (
                      <div className="img-wrap bg-gray-100">
                        <span className="text-gray-400">프로젝트 사진</span>
                      </div>
                    )}
                    
                    {/* 오른쪽: 정보 */}
                    <div className="flex-1">
                      {project.detail ? (
                        <div className="acc-info">
                          <div className="flex items-start gap-3">
                            <div className="label">대상건물</div>
                            <div className="value">{project.detail.building}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="label">규모</div>
                            <div className="value">{project.detail.scale}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="label">최고 높이</div>
                            <div className="value">{project.detail.height}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="label">용도</div>
                            <div className="value">{project.detail.usage}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="label">발주처</div>
                            <div className="value">{project.detail.client}</div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="label">컨설팅 내용</div>
                            <div className="value">{project.detail.content}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="acc-info flex-row-center"><div>상세 정보 준비중</div></div>
                      )}
                    </div>
                    
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <div className="empty-message">
              <p>선택하신 조건에 해당하는 실적이 없어요.</p>
              <p>필터를 변경해 다시 검색해보세요.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 페이지네이션 */}
      {pagedProjects.length > 0 && (
        <div className="mt-8 pagenation">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            <Image src={pagenationPrev} alt="이전 페이지" width={16} height={16} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${page === i + 1 ? 'active' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >
            <Image src={pagenationNext} alt="다음 페이지" width={16} height={16} />
          </button>
        </div>
      )}

      {/* 모달 - 추가/수정 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-colors duration-200">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl relative">
            <button className="absolute top-4 right-6 text-gray-400 hover:text-black" onClick={() => setModalOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-8">{modalType === 'add' ? '프로젝트 추가' : '프로젝트 수정'}</h2>
            <div className="flex flex-col md:flex-row gap-8"
              style={{maxHeight: '30rem', overflow: 'auto'}}
            >
              {/* 왼쪽 입력폼 */}
              <div className="flex-1 space-y-2 md:w-3/5">
                <div className="flex items-center">
                  <label className="font-semibold w-28">프로젝트명</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="프로젝트명" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="flex items-center">
                  <label className="font-semibold w-28">대상건물</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="대상건물" value={form.detail?.building ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), building: e.target.value } })} />
                </div>
                <div className="flex items-center">
                  <label className="font-semibold w-28">규모</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="규모" value={form.detail?.scale ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), scale: e.target.value } })} />
                </div>
                <div className="flex items-center">
                  <label className="font-semibold w-28">최고 높이 (m)</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="최고 높이" value={form.detail?.height ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), height: e.target.value } })} />
                </div>
                <div className="flex items-center">
                  <label className="font-semibold w-28">용도</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="용도" value={form.detail?.usage ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), usage: e.target.value } })} />
                </div>
                <div className="flex items-center">
                  <label className="font-semibold w-28">발주처</label>
                  <input className="w-full flex-1 border rounded px-3 py-2" placeholder="발주처" value={form.detail?.client ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), client: e.target.value } })} />
                </div>
                <label className="block font-semibold">컨설팅 내용</label>
                <textarea className="w-full border rounded px-3 py-2" placeholder="컨설팅 내용" value={form.detail?.content ?? ''} onChange={e => setForm({ ...form, detail: { ...(form.detail ?? { building: '', scale: '', height: '', usage: '', client: '', content: '', photo: '' }), content: e.target.value } })} />
                <div className='flex flex-col gap-2 pt-2 sm:flex-row sm:gap-14'>
                  <div className="flex items-center">
                    <label className="font-semibold w-28">대표프로젝트</label>
                    <input
                      type="checkbox"
                      checked={form.repProject}
                      onChange={e => setForm({ ...form, repProject: e.target.checked })}
                      style={{width: '1rem', height: '1rem', marginTop: "2px"}}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="font-semibold w-40">프로젝트 사진 업로드</label>
                    <ImageUploadButton onImageSelect={url => {
                      setPreviewUrl(url);
                      setForm(form => ({
                        ...form,
                        detail: {
                          building: form.detail?.building ?? '',
                          scale: form.detail?.scale ?? '',
                          height: form.detail?.height ?? '',
                          usage: form.detail?.usage ?? '',
                          client: form.detail?.client ?? '',
                          content: form.detail?.content ?? '',
                          photo: url
                        }
                      }));
                    }} />
                  </div>
                </div>
              </div>
              {/* 오른쪽 이미지 미리보기 */}
              <div className="flex items-center justify-center md:w-2/5">
                <ImagePreview previewUrl={previewUrl} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="btn-basic px-4 py-2" onClick={() => setModalOpen(false)}>취소</button>
              <button className="btn-primary px-4 py-2" onClick={handleSave}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 