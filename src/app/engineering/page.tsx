'use client';

import { useState } from 'react';

export default function EngineeringPage() {
  const [activeTab, setActiveTab] = useState('services');
  const [selectedService, setSelectedService] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleServiceRequest = (serviceType: string) => {
    setSelectedService(serviceType);
    setShowRequestForm(true);
    setActiveTab('request');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'request') {
      setShowRequestForm(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">엔지니어링 서비스</h1>
      
      {/* 탭 메뉴 */}
      <div className="mb-4 border-b">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'services' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
            onClick={() => handleTabChange('services')}
          >
            서비스 소개
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'comparison' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
            onClick={() => handleTabChange('comparison')}
          >
            서비스 비교
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'request' ? 'login-active rounded-t-md' : 'text-gray-500'}`}
            onClick={() => {
              handleTabChange('request');
              setShowRequestForm(true);
            }}
          >
            서비스 요청
          </button>
        </div>
      </div>
      
      {/* 서비스 소개 */}
      {activeTab === 'services' && !showRequestForm && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="wireframe-section mb-6">
              <h2 className="text-2xl font-bold mb-6">연돌현상 예측평가 (Basic)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="placeholder p-4 mb-4">
                    <div className="wireframe-header">서비스 설명</div>
                    <div className="dev-note">
                      개발자: 연돌현상 예측평가 서비스에 대한 설명 텍스트가 들어갈 위치입니다.
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">주요 내용</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>건축계획 기반 연돌현상 평가</li>
                      <li>연돌현상 위험구간 도출</li>
                      <li>문제 해결을 위한 기본적인 방향 제시</li>
                      <li>검토 결과 보고서 제공</li>
                    </ul>
                  </div>
                </div>
                <div className="placeholder h-64">
                  <div className="wireframe-header">서비스 이미지</div>
                  <div className="design-note">
                    디자이너: Basic 서비스의 결과물 샘플 이미지
                  </div>
                </div>
              </div>
              <div className="flex mt-6 space-x-4">
                <button className="btn-primary">
                  샘플 보고서 다운로드
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleServiceRequest('basic')}
                >
                  서비스 요청하기
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="wireframe-section mb-6">
              <h2 className="text-2xl font-bold mb-6">연돌현상 개선설계 (Professional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="placeholder p-4 mb-4">
                    <div className="wireframe-header">서비스 설명</div>
                    <div className="dev-note">
                      개발자: 연돌현상 개선설계 서비스에 대한 설명 텍스트가 들어갈 위치입니다.
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">주요 내용</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>연돌현상 예측평가(Basic) 내용 포함</li>
                      <li>연돌현상 저감을 위한 설계 가이드 제공</li>
                      <li>설계 대안별 효과 분석</li>
                      <li>검토 결과 보고서 및 개선안 설계도면 제공</li>
                    </ul>
                  </div>
                </div>
                <div className="placeholder h-64">
                  <div className="wireframe-header">서비스 이미지</div>
                  <div className="design-note">
                    디자이너: Professional 서비스의 결과물 샘플 이미지
                  </div>
                </div>
              </div>
              <div className="flex mt-6 space-x-4">
                <button className="btn-primary">
                  샘플 보고서 다운로드
                </button>
                <button className="btn-primary">
                  샘플 설계도면 다운로드
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleServiceRequest('professional')}
                >
                  서비스 요청하기
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="wireframe-section mb-6">
              <h2 className="text-2xl font-bold mb-6">연돌현상 최적설계 (Professional Plus)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="placeholder p-4 mb-4">
                    <div className="wireframe-header">서비스 설명</div>
                    <div className="dev-note">
                      개발자: 연돌현상 최적설계 서비스에 대한 설명 텍스트가 들어갈 위치입니다.
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">주요 내용</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>연돌현상 개선설계(Professional) 내용 포함</li>
                      <li>공기유동 시뮬레이션 기반 최적 솔루션 설계</li>
                      <li>시뮬레이션 결과 분석 및 최적 대안 제시</li>
                      <li>검토 결과 보고서, 개선안 설계도면, 시뮬레이션 분석 결과 제공</li>
                    </ul>
                  </div>
                </div>
                <div className="placeholder h-64">
                  <div className="wireframe-header">서비스 이미지</div>
                  <div className="design-note">
                    디자이너: Professional Plus 서비스의 결과물 샘플 이미지
                  </div>
                </div>
              </div>
              <div className="flex mt-6 space-x-4">
                <button className="btn-primary">
                  샘플 보고서 다운로드
                </button>
                <button className="btn-primary">
                  샘플 설계도면 다운로드
                </button>
                <button className="btn-primary">
                  샘플 시뮬레이션 결과 다운로드
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => handleServiceRequest('professionalPlus')}
                >
                  서비스 요청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 서비스 비교 */}
      {activeTab === 'comparison' && !showRequestForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">서비스 비교</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">항목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional Plus</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">연돌현상 평가</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">위험구간 도출</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">개선방향 제시</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">설계 가이드 제공</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">개선안 설계도면</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">공기유동 시뮬레이션</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">시뮬레이션 분석 결과</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">-</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">검토 결과 보고서</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                  <td className="px-6 py-4 whitespace-nowrap">O</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div 
              className="p-6 border rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceRequest('basic')}
            >
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <div className="text-sm mb-4">연돌현상 예측평가</div>
              <button className="w-full btn-primary">
                서비스 요청하기
              </button>
            </div>
            <div 
              className="p-6 border-2 border-[var(--primary-color)] rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceRequest('professional')}
            >
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="text-sm mb-4">연돌현상 개선설계</div>
              <button className="w-full btn-primary">
                서비스 요청하기
              </button>
            </div>
            <div 
              className="p-6 border rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => handleServiceRequest('professionalPlus')}
            >
              <h3 className="text-xl font-bold mb-2">Professional Plus</h3>
              <div className="text-sm mb-4">연돌현상 최적설계</div>
              <button className="w-full btn-primary">
                서비스 요청하기
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 서비스 요청 */}
      {(activeTab === 'request' || showRequestForm) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">서비스 요청</h2>
          
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2">이름 *</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">이메일 *</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2">연락처 *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="연락처를 입력하세요"
                  required
                />
              </div>
              <div>
                <label htmlFor="projectName" className="block mb-2">프로젝트명 *</label>
                <input 
                  type="text" 
                  id="projectName" 
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="프로젝트명을 입력하세요"
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceType" className="block mb-2">서비스 종류 *</label>
                <select 
                  id="serviceType" 
                  className="w-full px-4 py-2 border rounded-md"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="basic">Basic (연돌현상 예측평가)</option>
                  <option value="professional">Professional (연돌현상 개선설계)</option>
                  <option value="professionalPlus">Professional Plus (연돌현상 최적설계)</option>
                </select>
              </div>
              <div>
                <label htmlFor="fileUpload" className="block mb-2">첨부파일 (도면, 참고자료 등)</label>
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                  <div className="placeholder h-24 flex items-center justify-center">
                    <div className="dev-note">파일 업로드 영역</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2">기타 요청사항</label>
              <textarea 
                id="message" 
                className="w-full px-4 py-2 border rounded-md"
                rows={4}
                placeholder="추가 요청사항이 있으시면 입력해 주세요"
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                type="submit"
                className="px-6 py-3 btn-large"
              >
                서비스 요청하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 