import Link from "next/link";

export default function IntroPage() {
  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 소개</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 pt-1 mb-8">
        <div className="wireframe-section">
          <h2 className="text-2xl font-bold mb-4">연돌현상이란?</h2>
          <div className="placeholder p-4 mb-4">
            <div className="wireframe-header">연돌현상 개념 설명</div>
            <div className="dev-note">
              개발자: 연돌현상의 정의와 개념에 대한 텍스트 내용이 들어갈 위치입니다.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="placeholder h-64">
              <div className="wireframe-header">연돌현상 발생 메커니즘 이미지</div>
              <div className="design-note">
                디자이너: 건물 내 연돌현상이 발생하는 메커니즘을 시각적으로 표현한 다이어그램
              </div>
            </div>
            <div className="placeholder h-64">
              <div className="wireframe-header">연돌현상 영향 이미지</div>
              <div className="design-note">
                디자이너: 연돌현상으로 인한 문제점이나 영향을 시각적으로 표현한 이미지
              </div>
            </div>
          </div>
        </div>
        
        <div className="wireframe-section">
          <h2 className="text-2xl font-bold mb-4">연돌현상의 원인</h2>
          <div className="placeholder p-4 mb-6">
            <div className="wireframe-header">연돌현상의 주요 원인 설명</div>
            <div className="dev-note">
              개발자: 연돌현상의 주요 원인에 대한 텍스트 내용이 들어갈 위치입니다.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[var(--light-gray)] rounded-md">
              <div className="wireframe-header">원인 1</div>
              <div className="placeholder h-8 mb-2"></div>
              <p>건물 내외부 온도차</p>
            </div>
            <div className="p-4 bg-[var(--light-gray)] rounded-md">
              <div className="wireframe-header">원인 2</div>
              <div className="placeholder h-8 mb-2"></div>
              <p>건물 높이</p>
            </div>
            <div className="p-4 bg-[var(--light-gray)] rounded-md">
              <div className="wireframe-header">원인 3</div>
              <div className="placeholder h-8 mb-2"></div>
              <p>건물 구조적 특성</p>
            </div>
          </div>
        </div>
        
        <div className="wireframe-section">
          <h2 className="text-2xl font-bold mb-4">연돌현상의 영향</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold mb-3">문제점</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>엘리베이터 문 개폐 불량</li>
                <li>소음 발생</li>
                <li>에너지 손실 증가</li>
                <li>실내 공기질 저하</li>
                <li>화재 시 연기 확산 가속화</li>
              </ul>
            </div>
            <div className="placeholder h-48">
              <div className="wireframe-header">문제점 시각화 이미지</div>
              <div className="design-note">
                디자이너: 연돌현상으로 인한 문제점을 시각적으로 표현한 이미지
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="wireframe-section">
          <h2 className="text-2xl font-bold mb-4">참고자료</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-md gap-4">
              <div className="placeholder h-12 w-12 mr-4"></div>
              <div>
                <h3 className="font-bold">연돌현상 기술 가이드</h3>
                <p className="text-sm text-gray-600">PDF, 2.5MB</p>
              </div>
              <button className="ml-auto btn-primary">
                다운로드
              </button>
            </div>
            <div className="flex items-center p-4 border rounded-md gap-4">
              <div className="placeholder h-12 w-12 mr-4"></div>
              <div>
                <h3 className="font-bold">연돌현상 해결 사례집</h3>
                <p className="text-sm text-gray-600">PDF, 3.8MB</p>
              </div>
              <button className="ml-auto btn-primary">
                다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6 mt-16">
        <Link
          href="/evaluation"
          className="btn-large"
        >
          연돌현상 평가하기
        </Link>
        <Link
          href="/engineering"
          className="btn-large"
        >
          엔지니어링 서비스
        </Link>
      </div>
    </div>
  );
} 