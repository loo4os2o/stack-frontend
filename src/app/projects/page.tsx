export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">엔지니어링 실적</h1>
      
      <div className="mb-8">
        <p className="mb-4">STACK은 다양한 프로젝트에서 연돌현상 엔지니어링을 수행해 왔습니다.</p>
        <p>아래는 주요 프로젝트의 실적입니다.</p>
      </div>
      
      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="buildingType" className="block mb-2 text-sm">건물 용도</label>
            <select id="buildingType" className="px-3 py-2 border rounded-md">
              <option value="">전체</option>
              <option value="office">오피스</option>
              <option value="residential">주거시설</option>
              <option value="mixed">복합시설</option>
              <option value="hotel">호텔</option>
            </select>
          </div>
          <div>
            <label htmlFor="height" className="block mb-2 text-sm">최고 높이</label>
            <select id="height" className="px-3 py-2 border rounded-md">
              <option value="">전체</option>
              <option value="under100">100m 미만</option>
              <option value="100to200">100m ~ 200m</option>
              <option value="over200">200m 이상</option>
            </select>
          </div>
          <div>
            <label htmlFor="client" className="block mb-2 text-sm">발주처</label>
            <select id="client" className="px-3 py-2 border rounded-md">
              <option value="">전체</option>
              <option value="a">A건설</option>
              <option value="b">B건축사사무소</option>
              <option value="c">C디벨로퍼</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 btn-primary">
              필터 적용
            </button>
          </div>
        </div>
      </div>
      
      {/* 프로젝트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 프로젝트 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">A 오피스 타워</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 35층, 지하 5층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 150m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 오피스
              </div>
              <div>
                <span className="font-bold">발주처:</span> A건설
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 평가 및 개선설계, 엘리베이터 샤프트 압력 균형 시스템 도입</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
        
        {/* 프로젝트 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">B 주상복합</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 60층, 지하 6층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 220m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 주상복합
              </div>
              <div>
                <span className="font-bold">발주처:</span> B건축사사무소
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 시뮬레이션, 최적 설계안 제시, 로비 에어커튼 설계</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
        
        {/* 프로젝트 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">C 호텔</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 28층, 지하 3층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 110m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 호텔
              </div>
              <div>
                <span className="font-bold">발주처:</span> C디벨로퍼
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 예측평가, 설계 가이드 제공, 공용부 공기 유동 제어</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
        
        {/* 프로젝트 4 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">D 타워</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 45층, 지하 7층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 180m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 오피스
              </div>
              <div>
                <span className="font-bold">발주처:</span> A건설
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 최적설계, 엘리베이터 샤프트 압력 제어 시스템 설계</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
        
        {/* 프로젝트 5 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">E 레지던스</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 52층, 지하 5층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 195m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 주거시설
              </div>
              <div>
                <span className="font-bold">발주처:</span> C디벨로퍼
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 개선설계, 층간 공기유동 제어, 로비 환경 개선</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
        
        {/* 프로젝트 6 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="placeholder h-48">
            <div className="wireframe-header">프로젝트 이미지</div>
            <div className="design-note">
              디자이너: 프로젝트 건물 외관 이미지
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">F 복합시설</h2>
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div>
                <span className="font-bold">규모:</span> 지상 30층, 지하 4층
              </div>
              <div>
                <span className="font-bold">최고높이:</span> 135m
              </div>
              <div>
                <span className="font-bold">건물용도:</span> 복합시설
              </div>
              <div>
                <span className="font-bold">발주처:</span> B건축사사무소
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-bold mb-1">컨설팅 내용</h3>
              <p className="text-sm">연돌현상 예측평가, 개선안 제시, 엘리베이터 설계 최적화</p>
            </div>
            <button className="w-full px-3 py-2 btn-basic">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
      
      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <div className="flex">
          <button className="w-10 h-10 flex items-center justify-center border rounded-l-md">
            &lt;
          </button>
          <button className="w-10 h-10 flex items-center justify-center border active-process-bg text-white">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-r-md">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
} 