'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal';
import SolutionTabs from './SolutionTabs';
import "@/css/evaluation.css";
import Image from 'next/image';
import ExImgCppe from "@/assets/images/ex/ex-img-cppe.png";
import ImageUploadButton from '@/components/ImageUploadButton';
import ImagePreview from '@/components/ImagePreview';

export default function EvaluationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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



  const handleNextStep = () => {
    if (step === 1) {
      setIsProcessing(true);
      // 실제로는 여기서 API 호출 등을 통해 평가를 진행
      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container cppe mx-auto px-4 pt-16 pb-24">
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
        // title={
        //   <div className="mb-4 mr-4">
        //     {/* 진행 상태 표시 */}
        //     <div className="flex items-center justify-between">
        //       <div className={`flex flex-col items-center ${step >= 1 ? 'active-process' : 'text-gray-400'}`}>
        //         <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
        //           1
        //         </div>
        //         <span>건물 정보 입력</span>
        //       </div>
        //       <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'active-process-bg' : 'bg-gray-200'}`}></div>
        //       <div className={`flex flex-col items-center ${step >= 2 ? 'active-process' : 'text-gray-400'}`}>
        //         <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
        //           2
        //         </div>
        //         <span>연돌현상 분석결과</span>
        //       </div>
        //       <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'active-process-bg' : 'bg-gray-200'}`}></div>
        //       <div className={`flex flex-col items-center ${step >= 3 ? 'active-process' : 'text-gray-400'}`}>
        //         <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'active-process-bg text-white' : 'bg-gray-200'}`}>
        //           3
        //         </div>
        //         <span>연돌현상 해결방안</span>
        //       </div>
        //     </div>
        //   </div>
        // }
        title={" "}
        // footer={
        //   <>
        //     <button className="btn-primary btn-large"
        //       style={{width: '20%'}}
        //       onClick={() => setModalOpen(false)}>확인 [닫기]</button>
        //   </>
        // }
        footer={" "}
        width={'80%'}
      >
        <div>
          {/* Step 1: 건물 정보 입력 */}
          {step === 1 && (
            <>
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
              <div className="flex justify-center p-6 pb-0 mt-6">
                {isProcessing ? (
                  <button 
                    className="px-6 py-3 bg-gray-400 text-white rounded-md cursor-not-allowed"
                    disabled
                  >
                    처리 중...
                  </button>
                ) : (
                  <button 
                    onClick={handleNextStep}
                    className="btn-large"
                  >
                    평가하기
                  </button>
                )}
              </div>
            </>
          )}

          {/* Step 2: 분석 결과 */}
          {step === 2 && (
            <>
              {/* 1. 분석 결과 요약 */}
              <section>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      1. 분석 결과 요약
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border rounded-md text-center">
                        <div className="text-xl font-semibold mb-8">연돌현상 영향도</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-red-500">상</div>
                            <div className="text-lg">연돌현상<br/>위험도</div>
                          </div>
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-orange-500">중</div>
                            <div className="text-lg">예상 하자<br/>발생도</div>
                          </div>
                          <div className="p-6 border rounded-full text-center">
                            <div className="text-3xl font-bold mb-2 text-[var(--primary-color)]">필요</div>
                            <div className="text-lg">엔지니어링<br/>권장도</div>
                          </div>
                        </div>
                        <div className="design-note text-left">
                          디자이너: 연돌현상 영향도 아이콘
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">프로젝트 이름</div>
                        <div className="text-lg">
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                          <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                        </div>
                        <div className="dev-note">
                          개발자: 평가 결과에 대한 전반적인 요약 텍스트가 들어갈 위치입니다.
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">문제발생 예상층</div>
                        <p>본 건물은 실내외 온도 차 및 수직 높이에 따른 압력차로 인해 연돌현상이 발생할 수 있는 구조적 특성을 갖고 있으며, 특히 겨울철에는 하층부 외부 공기 유입과 상층부의 과도한 공기 배출 경향이 확인되었습니다. 이에 따라 환기 설비 및 샤프트 차압 제어가 필요한 것으로 평가됩니다.</p>
                        <div className='flex gap-8 mt-4'>
                          <div className="design-note flex-1">
                            디자이너: 
                          </div>
                          <div className="dev-note flex-1">
                            개발자: 차트
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                        <div className="text-xl font-semibold mb-6">최대 연돌 압력차(PA)</div>
                        <p>CFD 시뮬레이션 결과, 외기와 실내의 온도차가 20℃ 이상일 경우 연돌 압력차가 최대 25Pa까지 증가하며, 이로 인해 계단실 및 엘리베이터 샤프트를 통한 공기 흐름이 상·하층 간 불균형을 유발하는 것으로 분석되었습니다.</p>
                        <div className='flex gap-8 mt-auto'>
                          <div className="design-note flex-1">
                            디자이너: 
                          </div>
                          <div className="dev-note flex-1">
                            개발자: 차트
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. 문제 및 하자 예상 결과 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      2. 연돌현상 예측 결과
                    </h2>
                    <div className='flex flex-col items-center justify-center'
                      style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                    >
                      <div className="text-xl font-medium">차트</div>
                      <div className="dev-note">
                        개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 문제/하자 예상 결과 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      3. 문제/하자 예상 결과
                    </h2>
                    <div className='mb-8'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        주요 문제 및 하자
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col gap-4'>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 1</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 2</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 3</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                          <div className='flex items-center justify-center gap-8'
                            style={{height: '100px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                          >
                            <div className="text-xl font-medium">내용 4</div>
                            <div className="design-note text-left">
                              디자이너: 아이콘
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '100%', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        문제 발생 예상 층
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용 4</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. 압력차 검토 데이터 */}
              <section className='mt-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                  <div className='w-full md:w-2/2 left'>
                    <h2 className="text-xl font-bold mb-6">
                      4. 압력차 검토 데이터
                    </h2>
                    <div className='mb-6'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        중서대 위치 및 압력분포 프로파일
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mb-6'>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        주요층 압력차
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=''>
                      <h3 className="mb-2 font-semibold">
                        <span className="text-blue-500 mx-2">✤</span>
                        난방시즌 압력차 변화
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">차트</div>
                          <div className="dev-note">
                            개발자: 실제 구현 시 차트 라이브러리를 사용해 구현
                          </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'
                          style={{height: '200px', borderRadius: '16px', backgroundColor: '#f0f0f0'}}
                        >
                          <div className="text-xl font-medium">내용</div>
                          <div className="design-note text-left">
                            디자이너: 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-center space-x-4 mt-8">
                <button 
                  onClick={handlePrevStep}
                  className="btn-large mr-4"
                >
                  이전 단계로
                </button>
                <button 
                  onClick={handleNextStep}
                  className="btn-large"
                >
                  해결방안 보기
                </button>
              </div>
            </>
          )}
          
          {/* Step 3: 해결방안 */}
          {/* {step === 3 && <SolutionTabs handlePrevStep={handlePrevStep} />} */}
          {step === 3 && <SolutionTabs />}

        </div>
      </Modal>
    </div>
  );
} 