'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const userLogin = localStorage.getItem('userLogin');
    const userRole = localStorage.getItem('userRole');
    
    if (!userLogin || userLogin !== 'true' || userRole !== 'admin') {
      router.push('/login?redirect=admin'); // 로그인 페이지로 리다이렉트
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  // 더미 데이터
  const members = [
    { id: 1, name: '이주희', email: 'joohee@example.com', organization: 'ABC건설', phone: '010-1234-5678', joinDate: '2025-04-15' },
    { id: 2, name: '홍길동', email: 'hong@example.com', organization: 'XYZ설계', phone: '010-1111-1111', joinDate: '2025-05-20' },
    { id: 3, name: '이영희', email: 'lee@example.com', organization: '스마트건축', phone: '010-2222-2222', joinDate: '2025-06-10' },
  ];

  const projects = [
    { id: 1, name: 'A 오피스 타워', memberName: '이주희', service: 'Basic', createdAt: '2023-05-10' },
    { id: 2, name: 'B 주상복합', memberName: '홍길동', service: 'Professional', createdAt: '2023-06-05' },
    { id: 3, name: 'C 호텔', memberName: '이영희', service: 'Professional Plus', createdAt: '2023-07-15' },
  ];

  const serviceRequests = [
    { id: 1, name: '관리자', email: 'admin@example.com', phone: '010-3333-3333', projectName: 'D 타워', serviceType: 'Basic', requestDate: '2023-08-20', status: '접수완료' },
  ];

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold mb-10">관리자 페이지</h1>
          
          {/* 탭 메뉴 */}
          <div className="mb-8 border-b">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'members' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('members')}
              >
                회원 관리
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'projects' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('projects')}
              >
                프로젝트 관리
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'services' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('services')}
              >
                서비스 요청 관리
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'contents' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
                onClick={() => setActiveTab('contents')}
              >
                콘텐츠 관리
              </button>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">소속</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">프로젝트 목록</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border rounded-md">
                    <option value="">서비스 종류</option>
                    <option value="online">Online</option>
                    <option value="basic">Basic</option>
                    <option value="professional">Professional</option>
                    <option value="professionalPlus">Professional Plus</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="프로젝트 검색" 
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트명</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원명</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">서비스 종류</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">생성일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.memberName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{project.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                            상세
                          </button>
                          <button className="px-2 py-1 text-sm bg-green-50 text-green-500 rounded hover:bg-green-100">
                            보고서
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
              
              <div className="mt-6 flex justify-between items-center">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md">
                  새 프로젝트 등록
                </button>
                
                <div className="flex">
                  <button className="px-3 py-1 border rounded-l-md">이전</button>
                  <button className="px-3 py-1 border active-process-bg text-white">1</button>
                  <button className="px-3 py-1 border rounded-r-md">다음</button>
                </div>
              </div>
            </div>
          )}
          
          {/* 서비스 요청 관리 */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">서비스 요청 목록</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border rounded-md">
                    <option value="">상태</option>
                    <option value="접수완료">접수완료</option>
                    <option value="검토중">검토중</option>
                    <option value="처리완료">처리완료</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="요청자 검색" 
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요청자</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트명</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">서비스 종류</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요청일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {serviceRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.projectName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.serviceType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{request.requestDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            request.status === '접수완료' ? 'bg-blue-100 text-blue-800' : 
                            request.status === '검토중' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                            상세
                          </button>
                          <button className="px-2 py-1 text-sm bg-green-50 text-green-500 rounded hover:bg-green-100">
                            이메일
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
                  <button className="px-3 py-1 border rounded-r-md">다음</button>
                </div>
              </div>
            </div>
          )}
          
          {/* 콘텐츠 관리 */}
          {activeTab === 'contents' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">연돌현상 소개 자료 관리</h2>
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">PDF 자료 목록</h3>
                    <button className="px-3 py-2 active-process-bg text-white rounded-md">
                      새 자료 업로드
                    </button>
                  </div>
                  
                  <ul className="divide-y">
                    <li className="py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">연돌현상 기술 가이드</div>
                        <div className="text-sm text-gray-500">업로드: 2023-04-10</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                          보기
                        </button>
                        <button className="px-2 py-1 text-sm bg-red-50 text-red-500 rounded hover:bg-red-100">
                          삭제
                        </button>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium">연돌현상 해결 사례집</div>
                        <div className="text-sm text-gray-500">업로드: 2023-05-15</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                          보기
                        </button>
                        <button className="px-2 py-1 text-sm bg-red-50 text-red-500 rounded hover:bg-red-100">
                          삭제
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">엔지니어링 실적 관리</h2>
                <div className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">실적 목록</h3>
                    <button className="px-3 py-2 active-process-bg text-white rounded-md">
                      새 실적 등록
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트명</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">건물용도</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">규모</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">발주처</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">1</td>
                          <td className="px-6 py-4 whitespace-nowrap">A 오피스 타워</td>
                          <td className="px-6 py-4 whitespace-nowrap">오피스</td>
                          <td className="px-6 py-4 whitespace-nowrap">지상 35층, 지하 5층</td>
                          <td className="px-6 py-4 whitespace-nowrap">A건설</td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                              수정
                            </button>
                            <button className="px-2 py-1 text-sm bg-red-50 text-red-500 rounded hover:bg-red-100">
                              삭제
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">2</td>
                          <td className="px-6 py-4 whitespace-nowrap">B 주상복합</td>
                          <td className="px-6 py-4 whitespace-nowrap">주상복합</td>
                          <td className="px-6 py-4 whitespace-nowrap">지상 60층, 지하 6층</td>
                          <td className="px-6 py-4 whitespace-nowrap">B건축사사무소</td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            <button className="px-2 py-1 text-sm bg-blue-50 text-blue-500 rounded hover:bg-blue-100">
                              수정
                            </button>
                            <button className="px-2 py-1 text-sm bg-red-50 text-red-500 rounded hover:bg-red-100">
                              삭제
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="flex">
                      <button className="px-3 py-1 border rounded-l-md">이전</button>
                      <button className="px-3 py-1 border active-process-bg text-white">1</button>
                      <button className="px-3 py-1 border rounded-r-md">다음</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>로그인 페이지로 리다이렉트 중...</div>
      )}
    </div>
  );
} 