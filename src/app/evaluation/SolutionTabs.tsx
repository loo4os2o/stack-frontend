import { useState } from 'react';
import Link from 'next/link';

export default function SolutionTabs() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');

  return (
    <div>
      <p className='text-sm font-orange'>
        * 분석결과, 해결방안 단계에서 내용이 길다면 
        각 섹션마다 탭으로 분리시켜줄 수 있음을 표현한 부분입니다.
      </p>

      {/* 탭 버튼 */}
      <div className="flex border-b mb-6">
        <button
          className={`px-6 py-3 font-semibold ${activeTab === 'tab1' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tab1')}
        >
          1. 해결방안 개요
        </button>
        <button
          className={`px-6 py-3 font-semibold ${activeTab === 'tab2' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tab2')}
        >
          2. 개선안 리스트
        </button>
        <button
          className={`px-6 py-3 font-semibold ${activeTab === 'tab3' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('tab3')}
        >
          3. 연돌현상 설계검토 및 시뮬레이션
        </button>
      </div>

      {/* 탭 내용 */}
      {activeTab === 'tab1' && (
        <>
          {/* 기존 분석결과 마크업 전체 복사 */}
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
        </>
      )}
      
      {activeTab === 'tab2' && (
        <>
          {/* 2. 개선안 리스트 */}
          <section>
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
        </>
      )}

      {activeTab === 'tab3' && (
        <>
          {/* 3. 연돌현상 설계검토 및 시뮬레이션 */}
          <section>
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
        </>
      )}

      <div className="flex justify-center space-x-4 mt-8">
        <Link 
          href="/engineering"
          className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          엔지니어링 서비스 문의하기
        </Link>
      </div>
    </div>
  );
}
