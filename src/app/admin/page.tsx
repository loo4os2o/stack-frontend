'use client';

import '@/css/projects.css';
import { useUserStore } from '@/utils/store';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // 회원번호 조회 모달 상태
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<typeof members>([]);
  const inputRef = useRef(null);

  // 프로젝트 더미 데이터 (모달용)
  type ProjectType = {
    id: number;
    memberId: number;
    createdAt: string;
    name: string;
    service: string[];
    reportUrl: string | null;
  };
  const [projectRows, setProjectRows] = useState<ProjectType[]>([
    {
      id: 1001,
      memberId: 101,
      createdAt: '2025-05-10',
      name: 'A 오피스 타워',
      service: ['Online', 'Plus'],
      reportUrl: '/dummy-report-1.pdf',
    },
    {
      id: 1002,
      memberId: 102,
      createdAt: '2025-06-05',
      name: 'B 주상복합',
      service: ['Pro'],
      reportUrl: null,
    },
    {
      id: 1003,
      memberId: 103,
      createdAt: '2025-02-15',
      name: 'C 호텔',
      service: ['Plus', 'Basic', 'Online'],
      reportUrl: '/dummy-report-3.pdf',
    },
  ]);
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const allChecked = projectRows.length > 0 && selectedProjectIds.length === projectRows.length;
  const isIndeterminate =
    selectedProjectIds.length > 0 && selectedProjectIds.length < projectRows.length;

  // 프로젝트 생성 모달 상태 및 입력값
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<{
    memberId: string;
    id: string;
    createdAt: string;
    name: string;
    service: string[];
    reportUrl: string;
  }>({
    memberId: '',
    id: '',
    createdAt: '',
    name: '',
    service: [],
    reportUrl: '',
  });

  // 프로젝트 수정 모달 상태 및 입력값
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<null | typeof newProject>(null);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);

  // CSV 다운로드
  const handleDownloadCSV = useCallback(() => {
    const header = [
      '회원번호',
      '프로젝트 번호',
      '프로젝트 생성일자',
      '프로젝트명',
      '이용 서비스',
      '기본 보고서 다운로드',
    ];
    const rows = projectRows.map((row) => [
      row.memberId,
      row.id,
      row.createdAt,
      row.name,
      row.service.join(', '),
      row.reportUrl || '',
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r
          .map(String)
          .map((s) => '"' + s.replace(/"/g, '""') + '"')
          .join(',')
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-list.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [projectRows]);

  // 프로젝트 추가
  const handleAddProject = () => {
    if (
      !newProject.memberId ||
      !newProject.id ||
      !newProject.createdAt ||
      !newProject.name ||
      newProject.service.length === 0
    )
      return;
    setProjectRows((prev) => [
      ...prev,
      {
        memberId: Number(newProject.memberId),
        id: Number(newProject.id),
        createdAt: newProject.createdAt,
        name: newProject.name,
        service: newProject.service,
        reportUrl: newProject.reportUrl || null,
      },
    ]);
    setCreateModalOpen(false);
    setNewProject({ memberId: '', id: '', createdAt: '', name: '', service: [], reportUrl: '' });
    setSelectedProjectIds([]);
  };

  // 선택삭제
  const handleDeleteSelected = () => {
    if (selectedProjectIds.length === 0) return;
    setProjectRows((prev) => prev.filter((row) => !selectedProjectIds.includes(row.id)));
    setSelectedProjectIds([]);
  };

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const checkLogin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || data.user.user_metadata?.role !== 'admin' || error) {
        router.push('/');
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 더미 데이터
  const members = [
    {
      id: 1,
      name: '이주희',
      email: 'joohee@example.com',
      organization: 'ABC건설',
      phone: '010-1234-5678',
      joinDate: '2025-04-15',
    },
    {
      id: 2,
      name: '홍길동',
      email: 'hong@example.com',
      organization: 'XYZ설계',
      phone: '010-1111-1111',
      joinDate: '2025-05-20',
    },
    {
      id: 3,
      name: '이영희',
      email: 'lee@example.com',
      organization: '스마트건축',
      phone: '010-2222-2222',
      joinDate: '2025-06-10',
    },
  ];

  // const projects = [
  //   { id: 1, name: 'A 오피스 타워', memberName: '이주희', service: 'Basic', createdAt: '2023-05-10' },
  //   { id: 2, name: 'B 주상복합', memberName: '홍길동', service: 'Professional', createdAt: '2023-06-05' },
  //   { id: 3, name: 'C 호텔', memberName: '이영희', service: 'Professional Plus', createdAt: '2023-07-15' },
  // ];

  // const serviceRequests = [
  //   { id: 1, name: '관리자', email: 'admin@example.com', phone: '010-3333-3333', projectName: 'D 타워', serviceType: 'Basic', requestDate: '2023-08-20', status: '접수완료' },
  // ];

  // 회원번호 검색 상태
  const [searchMemberId, setSearchMemberId] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[] | null>(null);

  // 최근 한달/전체 온라인 평가 프로젝트 수 날짜 상태
  const [recentStartDate, setRecentStartDate] = useState('2025-02-19');
  const [recentEndDate, setRecentEndDate] = useState('2025-03-18');
  const [totalStartDate, setTotalStartDate] = useState('2025-02-19');
  const [totalEndDate, setTotalEndDate] = useState('2025-03-18');

  return (
    <div className="container mx-auto py-10 admin-page">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold mb-5">관리자 페이지</h1>

          {/* 탭 메뉴 */}
          <div className="mb-4 border-b">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'projects' ? 'admin-tab-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('projects')}
              >
                프로젝트 관리
              </button>
              {/* <button
                className={`py-2 px-4 font-medium ${activeTab === 'members' ? 'admin-tab-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('members')}
              >
                회원 관리
              </button> */}
            </div>
          </div>

          {/* 회원 관리 */}
          {activeTab === 'members' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">회원 목록</h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="회원 검색"
                    className="px-3 py-2 border rounded-md"
                  />
                  <button className="px-3 py-2 active-process-bg text-white rounded-md">
                    검색
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        번호
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        이메일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        소속
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        연락처
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        가입일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{member.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.organization}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.joinDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                            상세
                          </button>
                          <button className="px-2 py-1 text-sm bg-red-50 text-red-500 rounded hover:bg-red-100">
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="flex">
                  <button className="px-3 py-1 border rounded-l-md">이전</button>
                  <button className="px-3 py-1 border active-process-bg text-white">1</button>
                  <button className="px-3 py-1 border">2</button>
                  <button className="px-3 py-1 border">3</button>
                  <button className="px-3 py-1 border rounded-r-md">다음</button>
                </div>
              </div>
            </div>
          )}

          {/* 프로젝트 관리 */}
          {activeTab === 'projects' && (
            <>
              <div className="bg-white rounded-lg shadow-md p-8">
                {/* 최근 한달 온라인 평가 프로젝트 수 */}
                <div className="border bg-gray-100 px-6 py-4 rounded-md">
                  <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16 mb-6">
                    <h3 className="font-bold flex-1">최근 한달 온라인 평가 프로젝트 수</h3>
                    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-16 outline-none text-right"
                          placeholder="건수"
                          value="26"
                          readOnly
                        />
                        <span className="text-gray-500 ml-4">건</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2 sm:flex-nowrap sm:gap-0">
                        <input
                          type="date"
                          className="px-3 py-2 border rounded-md w-full"
                          value={recentStartDate}
                          onChange={(e) => setRecentStartDate(e.target.value)}
                        />
                        <span className="text-gray-500 text-xl font-bold mx-2 hidden sm:block">
                          ~
                        </span>
                        <input
                          type="date"
                          className="px-3 py-2 border rounded-md w-full"
                          value={recentEndDate}
                          onChange={(e) => setRecentEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 전체 온라인 평가 프로젝트 수 */}
                  <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-16 mb-0">
                    <h3 className="font-bold flex-1">전체 온라인 평가 프로젝트 수</h3>
                    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-16 outline-none text-right"
                          placeholder="건수"
                          value="102"
                          readOnly
                        />
                        <span className="text-gray-500 ml-4">건</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2 sm:flex-nowrap sm:gap-0">
                        <input
                          type="date"
                          className="px-3 py-2 border rounded-md w-full"
                          value={totalStartDate}
                          onChange={(e) => setTotalStartDate(e.target.value)}
                        />
                        <span className="text-gray-500 text-xl font-bold mx-2 hidden sm:block">
                          ~
                        </span>
                        <input
                          type="date"
                          className="px-3 py-2 border rounded-md w-full"
                          value={totalEndDate}
                          onChange={(e) => setTotalEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 회원검색 */}
                <form>
                  <div className="filter-wrap flex flex-col gap-2 md:flex-row mt-6">
                    <div className="form-group" style={{maxWidth: '400px'}}>
                      <label className="whitespace-nowrap">
                        회원번호
                      </label>
                      <input
                        type="text"
                        placeholder="회원번호"
                        value={searchMemberId}
                        onChange={(e) => setSearchMemberId(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </div>

                    <div className="flex items-end sm:w-auto gap-2 flex-wrap">
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          if (searchMemberId) {
                            setFilteredProjects(
                              projectRows.filter((row) => String(row.memberId) === searchMemberId)
                            );
                          } else {
                            setFilteredProjects(null);
                          }
                        }}
                      >
                        검색
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setSearchMemberId('');
                          setFilteredProjects(null);
                        }}
                      >
                        초기화
                      </button>
                      <button
                        className="px-3 py-2 btn-primary rounded-md"
                        onClick={() => setMemberModalOpen(true)}
                      >
                        회원 번호 조회
                      </button>
                    </div>
                  </div>
                </form>

                {/* 체크박스 테이블 */}
                <div className="mt-6">
                  {/* 프로젝트 관리 버튼 영역 */}
                  <div className="flex flex-wrap items-center gap-4 gap-y-2 mb-2">
                    {/* <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                        onChange={e => {
                          setSelectedProjectIds(e.target.checked ? projectRows.map(r => r.id) : []);
                        }}
                      />
                      <span className="text-sm">전체선택</span>
                    </label> */}
                    <button
                      className="btn-secondary btn-32"
                      onClick={handleDeleteSelected}
                      disabled={selectedProjectIds.length === 0}
                    >
                      선택삭제
                    </button>
                    <button className="btn-secondary btn-32" onClick={handleDownloadCSV}>
                      목록 다운로드(Excel)
                    </button>
                    <button
                      className="btn-secondary btn-32 ml-0 sm:ml-auto"
                      onClick={() => setCreateModalOpen(true)}
                    >
                      프로젝트 생성
                    </button>
                  </div>
                  <div className="overflow-x-auto" style={{ minHeight: '120px' }}>
                    <table 
                      className="border divide-y divide-gray-200 text-sm rounded-lg shadow"
                      style={{minWidth: '1000px', width: '100%'}}
                    >
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={allChecked}
                              ref={(el) => {
                                if (el) el.indeterminate = isIndeterminate;
                              }}
                              onChange={(e) => {
                                setSelectedProjectIds(
                                  e.target.checked ? projectRows.map((r) => r.id) : []
                                );
                              }}
                            />
                          </th>
                          <th className="px-4 py-3 text-center font-semibold">회원번호</th>
                          <th className="px-4 py-3 text-center font-semibold">프로젝트 번호</th>
                          <th className="px-4 py-3 text-center font-semibold">프로젝트 생성일자</th>
                          <th className="px-4 py-3 text-center font-semibold">프로젝트명</th>
                          <th className="px-4 py-3 text-center font-semibold">이용 서비스</th>
                          <th className="px-4 py-3 text-center font-semibold">
                            기본 보고서 다운로드
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {(filteredProjects ?? projectRows).map((row) => (
                          <tr
                            key={row.id}
                            className={selectedProjectIds.includes(row.id) ? 'bg-blue-50' : ''}
                          >
                            <td className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={selectedProjectIds.includes(row.id)}
                                onChange={(e) => {
                                  setSelectedProjectIds((prev) =>
                                    e.target.checked
                                      ? [...prev, row.id]
                                      : prev.filter((id) => id !== row.id)
                                  );
                                }}
                              />
                            </td>
                            <td className="px-4 py-3 text-center">{row.memberId}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                className="text-blue-700 underline hover:text-blue-900 cursor-pointer"
                                onClick={() => {
                                  setEditProject({
                                    memberId: String(row.memberId),
                                    id: String(row.id),
                                    createdAt: row.createdAt,
                                    name: row.name,
                                    service: row.service,
                                    reportUrl: row.reportUrl || '',
                                  });
                                  setEditProjectId(row.id);
                                  setEditModalOpen(true);
                                }}
                              >
                                {row.id}
                              </button>
                            </td>
                            <td className="px-4 py-3 text-center">{row.createdAt}</td>
                            <td className="px-4 py-3 text-center">{row.name}</td>
                            <td className="px-4 py-3 text-center">
                              {row.service.map((s) => (
                                <span
                                  key={s}
                                  className="btn-secondary px-2 py-0.5 text-xs font-medium mr-1 last:mr-0"
                                >
                                  {s}
                                </span>
                              ))}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {row.reportUrl ? (
                                <a href={row.reportUrl} download className="btn-primary btn-small">
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
              </div>
            </>
          )}
        </>
      ) : (
        <div>로그인 페이지로 리다이렉트 중...</div>
      )}

      {/* 회원번호 조회 모달 */}
      {memberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl relative">
            <button
              className="absolute top-4 right-6 text-gray-400 hover:text-black text-2xl"
              onClick={() => setMemberModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-8">회원 번호 조회</h2>
            <form
              className="flex gap-4 mb-6"
              onSubmit={(e) => {
                e.preventDefault();
                setFilteredMembers(members.filter((m) => m.name.includes(searchName)));
              }}
            >
              <label className="font-medium flex items-center">
                성명
                <input
                  ref={inputRef}
                  type="text"
                  className="ml-2 px-3 py-1.5 border rounded-md"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="이름 입력"
                />
              </label>
              <button type="submit" className="btn-primary px-4 py-1.5">
                조회
              </button>
            </form>
            <div className="overflow-x-auto" style={{ minHeight: '160px', maxHeight: '500px' }}>
              <table className="min-w-full border divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-center font-semibold">성명</th>
                    <th className="px-4 py-2 text-center font-semibold">회원번호</th>
                    <th className="px-4 py-2 text-center font-semibold">소속</th>
                    <th className="px-4 py-2 text-center font-semibold">이메일</th>
                    <th className="px-4 py-2 text-center font-semibold">연락처</th>
                    <th className="px-4 py-2 text-center font-semibold">가입일</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {(filteredMembers.length ? filteredMembers : members).map((m) => (
                    <tr key={m.id}>
                      <td className="px-4 py-2 text-center">{m.name}</td>
                      <td className="px-4 py-2 text-center">{m.id}</td>
                      <td className="px-4 py-2 text-center">{m.organization}</td>
                      <td className="px-4 py-2 text-center">{m.email}</td>
                      <td className="px-4 py-2 text-center">{m.phone}</td>
                      <td className="px-4 py-2 text-center">{m.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 프로젝트 생성 모달 */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-6 text-gray-400 hover:text-black text-2xl"
              onClick={() => setCreateModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-8">프로젝트 생성</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProject();
              }}
            >
              <div>
                <label className="block font-medium mb-1">회원번호</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={newProject.memberId}
                  onChange={(e) => setNewProject((p) => ({ ...p, memberId: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트 번호</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={newProject.id}
                  onChange={(e) => setNewProject((p) => ({ ...p, id: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트 생성일자</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                  value={newProject.createdAt}
                  onChange={(e) => setNewProject((p) => ({ ...p, createdAt: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트명</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newProject.name}
                  onChange={(e) => setNewProject((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">이용 서비스 (복수 선택 가능)</label>
                <div className="flex flex-wrap gap-6">
                  {['Online', 'Basic', 'Pro', 'Plus'].map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={service}
                        checked={newProject.service.includes(service)}
                        onChange={(e) => {
                          setNewProject((p) => ({
                            ...p,
                            service: e.target.checked
                              ? [...p.service, service]
                              : p.service.filter((s) => s !== service),
                          }));
                        }}
                        className="mt-0.5"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1 mt-4">
                  기본 보고서 다운로드(파일 경로)
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={newProject.reportUrl}
                  onChange={(e) => setNewProject((p) => ({ ...p, reportUrl: e.target.value }))}
                  placeholder="/example.pdf"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="btn-basic hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300"
                  onClick={() => setCreateModalOpen(false)}
                >
                  취소
                </button>
                <button type="submit" className="btn-primary">
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 프로젝트 수정 모달 */}
      {editModalOpen && editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-6 text-gray-400 hover:text-black text-2xl"
              onClick={() => setEditModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-8">프로젝트 수정</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setProjectRows((prev) =>
                  prev.map((row) =>
                    row.id === editProjectId
                      ? {
                          ...row,
                          memberId: Number(editProject.memberId),
                          id: Number(editProject.id),
                          createdAt: editProject.createdAt,
                          name: editProject.name,
                          service: editProject.service,
                          reportUrl: editProject.reportUrl || null,
                        }
                      : row
                  )
                );
                setEditModalOpen(false);
                setEditProject(null);
                setEditProjectId(null);
                setSelectedProjectIds([]);
              }}
            >
              <div>
                <label className="block font-medium mb-1">회원번호</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={editProject.memberId}
                  disabled
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트 번호</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={editProject.id}
                  disabled
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트 생성일자</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={editProject.createdAt}
                  disabled
                />
              </div>
              <div>
                <label className="block font-medium mb-1">프로젝트명</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  value={editProject.name}
                  disabled
                />
              </div>
              <div>
                <label className="block font-medium mb-2">이용 서비스 (복수 선택 가능)</label>
                <div className="flex flex-wrap gap-6">
                  {['Online', 'Basic', 'Pro', 'Plus'].map((service) => (
                    <label key={service} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={service}
                        checked={editProject.service.includes(service)}
                        onChange={(e) =>
                          setEditProject((p) =>
                            p
                              ? {
                                  ...p,
                                  service: e.target.checked
                                    ? [...p.service, service]
                                    : p.service.filter((s) => s !== service),
                                }
                              : p
                          )
                        }
                        className="mt-0.5"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1 mt-4">
                  기본 보고서 다운로드(파일 경로)
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editProject.reportUrl}
                  onChange={(e) =>
                    setEditProject((p) => (p ? { ...p, reportUrl: e.target.value } : p))
                  }
                  placeholder="/example.pdf"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="btn-basic hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300"
                  onClick={() => setEditModalOpen(false)}
                >
                  취소
                </button>
                <button type="submit" className="btn-primary">
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
