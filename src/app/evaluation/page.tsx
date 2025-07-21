'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import "@/css/evaluation.css";
import Image from 'next/image';
import ExImgCppe from "@/assets/images/ex/ex-img-cppe.png";
import ImageUploadButton from '@/components/ImageUploadButton';
import ImagePreview from '@/components/ImagePreview';
import { useRef } from 'react';

export default function EvaluationPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const promoVideoRef = useRef<HTMLVideoElement>(null);

  // 1. 건물 용도 - 라디오 옵션
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [customPurpose, setCustomPurpose] = useState<string>('');

  // 2. 건물 매스 계획 - 스위치
  const [hasPodium, setHasPodium] = useState<boolean>(false);

  // 3. 승객용 엘리베이터 샤프트 계획 - 수직조닝 라디오/체크박스
  const [zoningType, setZoningType] = useState('');
  const [skyLobby, setSkyLobby] = useState(false);
  const [shuttleElevator, setShuttleElevator] = useState(false);

  const [lowZone, setLowZone] = useState<number | ''>('');
  const [midZone, setMidZone] = useState<number | ''>('');
  const [highZone, setHighZone] = useState<number | ''>('');

  const handleEvaluate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setModalOpen(false);
      setPromoModalOpen(true);
    }, 1000);
  };

  // 홍보 영상 모달 닫기 시 결과페이지 이동
  const handlePromoModalClose = () => {
    setPromoModalOpen(false);
    router.push('/evaluation/result');
  };

  const handleSave = () => {
    // TODO: 저장 로직 구현
    alert('저장되었습니다.');
  };

  return (
    <div className="container cppe mx-auto pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 예측평가</h1>

      {/* 연돌현상 예측평가 페이지 설명 영역 */}
      <section className='cppe-explain'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-2/5 left'>
            <p>
              연돌현상(Stack Effect, Chimney Phenomenon)은
              실내외 온도 차이로 인해 공기가 수직으로 이동하는 자연 현상 
              즉, 따뜻한 공기는 위로 상승하고, 찬 공기는 아래로 내려가는 
              물리 법칙에 따라, 건물 내부의 공기 흐름이 굴뚝처럼 위로 
              올라가는 현상을 말합니다. <br/><br/>
              예측평가를위해다음정보가필요합니다.<br/>
              - 건물높이및층정보<br/>
              - 매스계획<br/>
              - 엘리베이터샤프트계획<br/>
              - 기본평면계획정보
            </p>
            {/* <button className='btn-primary btn-large mt-8 mb-2'  */}
            <button className='btn-primary btn-large mt-8 mb-2'
              onClick={() => setModalOpen(true)}>시작하기</button>
          </div>
          <div className='w-full md:w-3/5 right center' style={{background: '#eee'}}>
            <div className="placeholder h-80 mt-4 flex-1 w-full">
              <div className="wireframe-header">연돌현상 영향도 이미지</div>
            </div>
            <div className="design-note">연돌현상으로 인한 문제점이나 영향을 시각적으로 표현한 이미지</div>
          </div>
        </div>
        <div className='image-wrap mt-16'>
          <Image src={ExImgCppe} alt="HOW DO WE ASSESS?" />
        </div>
      </section>

      {/* 시작하기 모달 */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={" "}
        footer={" "}
        width={'80%'}
      >
        <div>
          {/* 1. 건물 일반 정보 */}
          <section>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>
                <h2 className="text-xl font-bold mb-6">
                  1. 건물 일반 정보
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6"
                  style={{columnGap: '4rem'}}
                >
                  {/* 프로젝트명 */}
                  <div>
                    <label htmlFor="projectName" 
                      className="block mb-2 font-semibold">프로젝트명
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="projectName" 
                      className="w-full px-4 py-2 border rounded-md"
                      placeholder="예: OO 오피스 빌딩"
                    />
                  </div>

                  {/* 프로젝트 대표사진 업로드 */}
                  <div className='flex items-center gap-2'>
                    <label htmlFor="imageUpload" className="block mt-1 font-semibold">
                        프로젝트 대표사진 업로드</label>
                    <ImageUploadButton onImageSelect={setPreview} />
                  </div>

                  {/* 건물 용도 */}
                  <fieldset className="space-y-2">
                    <legend className="mb-2 font-semibold">건물 용도
                      <span className="text-red-500 ml-1">*</span>
                    </legend>
                    {[
                      { label: '오피스', value: 'office' },
                      { label: '상업시설', value: 'commercial' },
                      { label: '주거시설', value: 'residential' }
                    ].map((opt) => (
                      <label key={opt.value} 
                        className="flex items-center gap-2"
                        style={{width: 'fit-content'}}
                      >
                        <input
                          type="radio"
                          name="buildingPurpose"
                          value={opt.value}
                          checked={selectedPurpose === opt.value}
                          onChange={(e) => setSelectedPurpose(e.target.value)}
                          className="accent-blue-500"
                        />
                        {opt.label}
                      </label>
                    ))}

                    {/* 기타 + 입력 */}
                    <label className="flex items-center gap-2" style={{width: 'fit-content'}}>
                      <input
                        type="radio"
                        name="buildingPurpose"
                        value="custom"
                        checked={selectedPurpose === 'custom'}
                        onChange={(e) => setSelectedPurpose(e.target.value)}
                        className="accent-blue-500"
                      />
                      기타:
                      <input
                        type="text"
                        placeholder="용도를 입력하세요"
                        value={customPurpose}
                        onChange={(e) => setCustomPurpose(e.target.value)}
                        disabled={selectedPurpose !== 'custom'}
                        className={`border px-4 py-1 rounded-md ${
                          selectedPurpose !== 'custom' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                        }`}
                      />
                    </label>
                  </fieldset>

                  {/* 준공(예정)연도 */}
                  <div>
                    <label htmlFor="completionYear" 
                      className="block mb-2 font-semibold">준공(예정)연도
                    </label>
                    <div className="flex items-center border rounded-md px-4 py-2">
                      <input
                        type="text"
                        id="completionYear"
                        className="w-full outline-none"
                        placeholder="2025"
                      />
                      <span className="text-gray-500 ml-2">년</span>
                    </div>
                  </div>

                  {/* 위치 */}
                  <div>
                    <label htmlFor="location" 
                      className="block mb-2 font-semibold">위치
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select id="location" className="w-full px-4 py-2 border rounded-md">
                      <option value="">선택하세요</option>
                      <option value="서울">서울</option>
                      <option value="경기도">경기도</option>
                      <option value="대전">대전</option>
                      <option value="부산">부산</option>
                    </select>
                  </div>

                  {/* 건물 높이 */}
                  <div>
                    <label htmlFor="buildingHeight" 
                      className="block mb-2 font-semibold">건물 높이 (m)
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center border rounded-md px-4 py-2">
                      <input 
                        type="number" 
                        id="buildingHeight" 
                        className="w-full outline-none"
                        placeholder="0"
                      />
                      <span className="text-gray-500 ml-2">m</span>
                    </div>
                  </div>

                  {/* 건물 층수 */}
                  <fieldset>
                    <legend className="block mb-2 font-semibold">
                      건물 층수 <span className="text-red-500 ml-1">*</span>
                    </legend>

                    <div className="grid grid-cols-2 gap-4">
                      {/* 지상 */}
                      <div>
                        <label htmlFor="aboveFloors" className="block mb-1 text-sm">지상</label>
                        <div className="flex items-center border rounded-md px-4 py-2">
                          <input 
                            type="number" 
                            id="aboveFloors" 
                            className="w-full outline-none"
                            placeholder="1"
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>

                      {/* 지하 */}
                      <div>
                        <label htmlFor="belowFloors" className="block mb-1 text-sm">지하</label>
                        <div className="flex items-center border rounded-md px-4 py-2">
                          <input 
                            type="number" 
                            id="belowFloors" 
                            className="w-full outline-none"
                            placeholder="1"
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className='w-full md:w-1/2 right'>
                <ImagePreview previewUrl={preview} />
                <div className='flex flex-col md:flex-row gap-8 mt-6'
                  style={{height: 'calc(50% - 2rem)'}}>
                  <div className='w-full md:w-1/2 left center'>차트1</div>
                  <div className='w-full md:w-1/2 right center'>차트2</div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 건물 매스 계획 */}
          <section className='mt-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>
                <fieldset>
                  <legend className="text-xl font-bold mb-6">
                    2. 건물 매스 계획
                  </legend>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6" style={{ columnGap: '4rem' }}>
                    {/* 스위치 */}
                    <label className="switch-container">
                      <input
                        type="checkbox"
                        checked={hasPodium}
                        onChange={(e) => setHasPodium(e.target.checked)}
                        className="switch-input"
                      />
                      <span className={`switch-slider ${hasPodium ? 'active' : ''}`} />
                      <span className="font-medium">저층부 포디움</span>
                    </label>

                    {/* 포디움 용도 */}
                    <div>
                      <label htmlFor="podiumPurpose" className="block mb-2">
                        포디움 용도
                      </label>
                      <input
                        type="text"
                        id="podiumPurpose"
                        placeholder="예: 판매시설"
                        disabled={!hasPodium}
                        className={`w-full px-4 py-2 border rounded-md transition ${
                          !hasPodium ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    {/* 포디움 높이 */}
                    <div>
                      <label htmlFor="podiumHeight" className="block mb-2">
                        포디움 높이 (m)
                      </label>
                      <div
                        className={`flex items-center border rounded-md px-4 py-2 transition ${
                          !hasPodium ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <input
                          type="number"
                          id="podiumHeight"
                          placeholder="0"
                          disabled={!hasPodium}
                          className={`w-full outline-none bg-transparent transition ${
                            !hasPodium ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                          }`}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className='w-full md:w-1/2 right'>
                2. 건물 매스 계획 이미지 영역(건물매스형상)
              </div>
            </div>
          </section>

          {/* 3. 승객용 엘리베이터 샤프트 계획 */}
          <section className='mt-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>
                <h2 className="text-xl font-bold mb-6">
                  3. 승객용 엘리베이터 샤프트 계획
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6"
                  style={{columnGap: '4rem'}}
                >
                  {/* 수직조닝 */}
                  <fieldset className="space-y-4">
                    <legend className="font-semibold">수직조닝
                      <span className="text-red-500 ml-1">*</span>
                    </legend>
                    {/* 라디오 버튼 */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="single"
                          checked={zoningType === 'single'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        싱글존
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="two"
                          checked={zoningType === 'two'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        투존 (저층존 - 고층존)
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="multi"
                          checked={zoningType === 'multi'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        멀티존 (저층존 - 중층존 - 고층존)
                      </label>
                    </div>

                    {/* 체크박스 */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={skyLobby}
                          onChange={(e) => setSkyLobby(e.target.checked)}
                          className="accent-blue-500"
                        />
                        스카이로비
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={shuttleElevator}
                          onChange={(e) => setShuttleElevator(e.target.checked)}
                          className="accent-blue-500"
                        />
                        지하층 셔틀 엘리베이터
                      </label>
                    </div>
                  </fieldset>

                  {/* 샤프트별 최상층 */}
                  <fieldset className="space-y-4">
                    <legend className="font-semibold">
                      샤프트 별 최상층 <span className="text-red-500">*</span>
                    </legend>

                    {/* 저층존 */}
                    <div>
                      <label htmlFor="lowZone" className="block mb-1 text-sm">
                        저층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="lowZone"
                          value={lowZone}
                          onChange={(e) => setLowZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>

                    {/* 중층존 */}
                    <div>
                      <label htmlFor="midZone" className="block mb-1 text-sm">
                        중층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="midZone"
                          value={midZone}
                          onChange={(e) => setMidZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>

                    {/* 고층존 */}
                    <div>
                      <label htmlFor="highZone" className="block mb-1 text-sm">
                        고층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="highZone"
                          value={highZone}
                          onChange={(e) => setHighZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className='w-full md:w-1/2 right'>
                3. 승객용 엘리베이터 샤프트 계획 이미지 영역(샤프트형상)
              </div>
            </div>
          </section>

          {/* 4. 계단실 샤프트 계획 */}
          <section className='mt-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-2/2 left'>
                <h2 className="text-xl font-bold mb-6">
                  4. 계단실 샤프트 계획
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6"
                  style={{columnGap: '4rem'}}
                >
                  {/* 수직조닝 */}
                  <fieldset className="space-y-4">
                    <legend className="font-semibold">수직조닝
                      <span className="text-red-500 ml-1">*</span>
                    </legend>
                    {/* 라디오 버튼 */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="single"
                          checked={zoningType === 'single'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        싱글존
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="two"
                          checked={zoningType === 'two'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        투존 (저층존 - 고층존)
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="zoningType"
                          value="multi"
                          checked={zoningType === 'multi'}
                          onChange={(e) => setZoningType(e.target.value)}
                          className="accent-blue-500"
                        />
                        멀티존 (저층존 - 중층존 - 고층존)
                      </label>
                    </div>

                    {/* 체크박스 */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={skyLobby}
                          onChange={(e) => setSkyLobby(e.target.checked)}
                          className="accent-blue-500"
                        />
                        스카이로비
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={shuttleElevator}
                          onChange={(e) => setShuttleElevator(e.target.checked)}
                          className="accent-blue-500"
                        />
                        지하층 셔틀 엘리베이터
                      </label>
                    </div>
                  </fieldset>

                  {/* 샤프트별 최상층 */}
                  <fieldset className="space-y-4">
                    <legend className="font-semibold">
                      샤프트 별 최상층 <span className="text-red-500">*</span>
                    </legend>

                    {/* 저층존 */}
                    <div>
                      <label htmlFor="lowZone" className="block mb-1 text-sm">
                        저층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="lowZone"
                          value={lowZone}
                          onChange={(e) => setLowZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>

                    {/* 중층존 */}
                    <div>
                      <label htmlFor="midZone" className="block mb-1 text-sm">
                        중층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="midZone"
                          value={midZone}
                          onChange={(e) => setMidZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>

                    {/* 고층존 */}
                    <div>
                      <label htmlFor="highZone" className="block mb-1 text-sm">
                        고층존
                      </label>
                      <div className="flex items-center border rounded-md px-4 py-2">
                        <input
                          type="number"
                          id="highZone"
                          value={highZone}
                          onChange={(e) => setHighZone(Number(e.target.value))}
                          placeholder="0"
                          className="w-full outline-none bg-transparent"
                        />
                        <span className="ml-2 text-gray-500">F</span>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 기본 건축계획 */}
          <section className='mt-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-2/2 left'>
                <fieldset>
                  <legend className="text-xl font-bold mb-6">
                    5. 기본 건축계획
                  </legend>

                  <div className="space-y-4">
                    {/* 엘리베이터 홀 구획 */}
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1.5 accent-blue-500" />
                      <div>
                        <span className="font-medium">엘리베이터 홀 구획</span>
                        <div className="text-sm text-gray-500">
                          (엘리베이터 홀과 복도 또는 주요 공간이 벽과 도어로 구획되어 있음)
                        </div>
                      </div>
                    </label>

                    {/* 나머지 선택사항들 동일 */}
                    {[1, 2, 3].map((_, idx) => (
                      <label key={idx} className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1.5 accent-blue-500" />
                        <div>
                          <span className="font-medium">(선택사항)</span>
                          <div className="text-sm text-gray-500">(선택사항)에 대한 설명</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </section>

          {/* 6. 공기유동 특이사항 */}
          <section className='mt-8'>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-2/2 left'>
                <fieldset>
                  <legend className="text-xl font-bold mb-6">
                    6. 공기유동 특이사항
                  </legend>

                  <div className="space-y-4">
                    {/* 옥상정원 */}
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1.5 accent-blue-500" />
                      <div>
                        <span className="font-medium">옥상정원</span>
                        <div className="text-sm text-gray-500">
                          (선택사항)에 대한 설명
                        </div>
                      </div>
                    </label>

                    {/* 로비층 외 출입층 */}
                    <label className="flex items-start gap-2">
                      <input type="checkbox" className="mt-1.5 accent-blue-500" />
                      <div>
                        <span className="font-medium">로비층 외 출입층</span>
                        <div className="text-sm text-gray-500">
                          (선택사항)에 대한 설명
                        </div>
                      </div>
                    </label>

                    {/* 나머지 선택사항들 동일 */}
                    {[1, 2, 3, 4].map((_, idx) => (
                      <label key={idx} className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1.5 accent-blue-500" />
                        <div>
                          <span className="font-medium">(선택사항)</span>
                          <div className="text-sm text-gray-500">(선택사항)에 대한 설명</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </section>

          {/* 평가하기 버튼 */}
          <div className="flex justify-center gap-4 p-6 pb-0 mt-6">
            {isProcessing ? (
              <button 
                className="btn-primary btn-large disabled"
                disabled
                style={{ width: "25%" }}
              >
                처리 중...
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="btn-secondary btn-large"
                  style={{ width: "25%" }}
                >
                  저장하기
                </button>
                <button 
                  onClick={handleEvaluate}
                  className="btn-primary btn-large"
                  style={{ width: "25%" }}
                >
                  평가하기
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* 홍보 영상 모달 */}
      <Modal
        open={promoModalOpen}
        onClose={handlePromoModalClose}
        title={"홍보 영상"}
        footer={" "}
        width={'60%'}
      >
        <div className="flex flex-col items-center justify-center">
          <video
            ref={promoVideoRef}
            width="100%"
            controls
            autoPlay
            style={{ borderRadius: '12px', background: '#000' }}
          >
            <source src="/promo.mp4" type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
          <button
            className="btn-primary btn-large mt-6"
            onClick={handlePromoModalClose}
            style={{ width: "50%" }}
          >
            분석결과 및 해결방안 확인하기
          </button>
        </div>
      </Modal>
    </div>
  );
} 