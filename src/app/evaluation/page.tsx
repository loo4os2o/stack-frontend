'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import "@/css/evaluation.css";
import Image from 'next/image';
import ExImgCppe from "@/assets/images/ex/ex-img-cppe.png";
import ImageUploadButton from '@/components/ImageUploadButton';
import ImagePreview from '@/components/ImagePreview';
import ArrowRight from "@/assets/icons/icon-btn-more.png";
import ImgEv1 from "@/assets/images/evaluation/img-ev-1.png";
import { useRef } from 'react';
import TooltipButton from '@/components/common/TooltipButton';
import RangeBarWithBullet from '@/components/charts/RangeBarWithBullet';

export default function EvaluationPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [showPromoButton, setShowPromoButton] = useState(false);
  const promoVideoRef = useRef<HTMLVideoElement>(null);

  // 1. 건물 용도 - 체크박스 옵션
  const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
  const [customPurpose, setCustomPurpose] = useState<string>('');

  // 2. 건물 매스 계획 - 스위치
  const [hasPodium, setHasPodium] = useState<boolean>(false);

  // 3. 승객용 엘리베이터 샤프트 계획 - 수직조닝 라디오/체크박스
  const [zoningType, setZoningType] = useState('');
  const [skyLobby, setSkyLobby] = useState(false);
  const [shuttleElevator, setShuttleElevator] = useState(false);

  const handleEvaluate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setModalOpen(false);
      setShowPromoButton(false);
      setPromoModalOpen(true);
      
      // 동영상 임시 재생이 끝났다고 설정하고 5초 후에 버튼 표시
      setTimeout(() => {
        setShowPromoButton(true);
      }, 5000);
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


  // 차트 데이터
  const chartData: {
    ranges: { x: number; start: number; end: number }[];
    bullets: { x: number; y: number }[];
    blocks: { start: number; end: number; type: "danger" | "warning" }[];
  } = {
    ranges: [
      { x: 1, start: 0, end: 50 },
      { x: 2, start: 20, end: 80 },
      { x: 3, start: 40, end: 120 },
      { x: 4, start: 60, end: 140 }
    ],
    bullets: [
      { x: 1, y: 25 },
      { x: 2, y: 50 },
      { x: 3, y: 80 },
      { x: 4, y: 100 }
    ],
    blocks: [
      { start: 0, end: 30, type: "danger" },
      { start: 30, end: 60, type: "warning" },
      { start: 60, end: 90, type: "danger" },
      { start: 90, end: 100, type: "warning" }
    ],
  };


  return (
    <div className="container mx-auto py-10 evaluation">
      <h1 className="text-3xl font-bold mb-5">연돌현상 예측평가</h1>

      {/* 연돌현상 예측평가 페이지 설명 영역 */}
      <section className='cppe-explain'>
        <div className='flex flex-col md:flex-row gap-5'>
          <div className='w-full md:w-2/5 left'>
            <h2 className='mb-1'>연돌현상</h2>
            <h3 className='mb-3'>Stack Effect, Chimney Phenomenon</h3>
            <p>
              실내외 온도 차이로 인해 공기가 수직으로 이동하는 자연 현상 즉, 
              따뜻한 공기는 위로 상승하고, 찬 공기는 아래로 내려가는 물리 법칙에 따라, 
              건물 내부의 공기 흐름이 굴뚝처럼 위로 올라가는 현상을 말합니다.
            </p>
            <div className='text-box mb-4'>
              <h4 className='mb-2'>예측평가를 위해 필요한 정보</h4>
              <ul className='mt-3'>
                <li>건물 높이 및 층 정보</li>
                <li>매스계획</li>
                <li>엘리베이터 샤프트 계획</li>
                <li>기본 평면 계획 정보</li>
              </ul>
            </div>
            <button className='btn-primary w-full btn-50 rounded-xl
              flex items-center justify-between gap-2'
              onClick={() => setModalOpen(true)}
            >
                시작하기
                <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
            </button>
          </div>
          <div className='w-full md:w-3/5 right' style={{padding: 0}}>
            <div className='image-wrap'>
              <Image src={ImgEv1} alt="이미지1 설명입니다." />
            </div>
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
        title={"연돌현상 예측평가"}
        footer={" "}
        width={'80%'}
      >
        <div className='evaluation-page'>

          <h2>1. 건물 일반 정보</h2>
          <section>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>

                {/* 프로젝트명 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group' style={{marginBottom: "0.375rem"}}>
                    <label htmlFor="projectName">프로젝트명<span className="text-red-500 ml-1">*</span></label>
                    <input 
                      type="text" 
                      id="projectName" 
                      placeholder="예: OO 오피스 빌딩"
                    />
                  </div>

                  {/* 프로젝트 대표사진 업로드 */}
                  <div className='form-group'>
                    <label htmlFor="imageUpload" className='hidden'></label>
                    <ImageUploadButton onImageSelect={setPreview} />
                    {/* <input type="file" id="imageUpload" /> */}
                  </div>
                </div>

                {/* 위치(기후데이터) */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group'>
                    <label htmlFor="location">위치(기후데이터)<span className="text-red-500 ml-1">*</span></label>
                    <div className="flex items-center gap-2 w-full">
                      <select id="location">
                        <option value="">선택하세요</option>
                        <option value="서울">서울</option>
                        <option value="경기도">경기도</option>
                        <option value="대전">대전</option>
                        <option value="부산">부산</option>
                      </select>
                      <TooltipButton 
                        position="bottom"
                        tooltipText="기후데이터를 적용하기 위한 프로젝트 위치(도시)를 선택해 주세요.<br/>지역별 외기조건 반영에 사용됩니다."
                      />
                    </div>
                  </div>
                </div>

                {/* 준공(예정)연도 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group'>
                    <label htmlFor="completionYear">준공(예정)연도</label>
                    <input
                      type="text"
                      id="completionYear"
                      className="w-full outline-none"
                      placeholder="2025"
                    />
                  </div>
                </div>

                {/* 건물 규모 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group'>
                    <label>건물 규모 <span className="text-red-500 ml-1">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {/* 지하 */}
                      <div>
                        <label htmlFor="belowFloors" className="small">지하</label>
                        <div className="input-unit-wrap">
                          <input 
                            type="number" 
                            id="belowFloors" 
                            placeholder="1"
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>

                      {/* 지상 */}
                      <div>
                        <label htmlFor="aboveFloors" className='small'>지상</label>
                        <div className="input-unit-wrap">
                          <input 
                            type="number" 
                            id="aboveFloors" 
                            placeholder="1"
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 건물 높이 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group'>
                    <label htmlFor="buildingHeight">건물 높이 (m)<span className="text-red-500 ml-1">*</span></label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="input-unit-wrap w-full">
                        <input 
                          type="number" 
                          id="buildingHeight" 
                          placeholder="0"
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton 
                        position="bottom"
                        tooltipText="지표면으로부터 건축물 상단까지 수직 거리"
                      />
                    </div>
                  </div>
                </div>

                {/* 건물 용도 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group' 
                    style={{alignItems: 'flex-start', marginBottom: 0}}>
                    <label>건물 용도<span className="text-red-500 ml-1">*</span></label>

                    <div className='radio-group'>
                      {[
                        { label: '공동주택', value: '1' },
                        { label: '업무시설', value: '2' },
                        { label: '판매시설', value: '3' },
                        { label: '근린생활시설', value: '4' },
                        { label: '문화/집회시설', value: '5' },
                      ].map((opt) => (
                        <label key={opt.value}>
                          <input
                            type="checkbox"
                            name="buildingPurpose"
                            value={opt.value}
                            checked={selectedPurpose.includes(opt.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPurpose([...selectedPurpose, opt.value]);
                              } else {
                                setSelectedPurpose(selectedPurpose.filter((v) => v !== opt.value));
                              }
                            }}
                          />
                          {opt.label}
                        </label>
                      ))}

                      {/* 기타 + 입력 */}
                      <label className='radio-etc'>
                        <div>
                          <input
                            type="checkbox"
                            name="buildingPurpose"
                            value="custom"
                            checked={selectedPurpose.includes('custom')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPurpose([...selectedPurpose, 'custom']);
                              } else {
                                setSelectedPurpose(selectedPurpose.filter((v) => v !== 'custom'));
                              }
                            }}
                            // disabled
                          />
                          <span>기타:</span>
                        </div>
                        <input
                          type="text"
                          placeholder="용도를 입력하세요"
                          value={customPurpose}
                          onChange={(e) => setCustomPurpose(e.target.value)}
                          // disabled={!selectedPurpose.includes('custom')}
                        />
                      </label>
                    </div>
                  </div>
                </div>

              </div>  {/* 1. 건물 일반 정보 : 왼쪽 영역 끝 */}

              <div className='w-full md:w-1/2 right'>
                <ImagePreview previewUrl={preview} />
              </div>

            </div>
          </section>

          {/* 2. 건물 매스 계획 */}
          <h2 className='mt-8'>2. 건물 매스 계획</h2>
          <section>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>

                {/* 스위치 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <h3>저층부 포디움</h3>
                  <label className="switch-container">
                    <input
                      type="checkbox"
                      checked={hasPodium}
                      onChange={(e) => setHasPodium(e.target.checked)}
                      className="switch-input"
                    />
                    <span className={`switch-slider ${hasPodium ? 'active' : ''}`} />
                  </label>
                </div>

                {/* 포디움 높이 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group sub'>
                    <label htmlFor="podiumHeight">포디움 높이 (m)<span className="text-red-500 ml-1">*</span></label>
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`input-unit-wrap transition ${
                          !hasPodium ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <input
                          type="number"
                          id="podiumHeight"
                          placeholder="0"
                          disabled={!hasPodium}
                          className={`bg-transparent transition ${
                            !hasPodium ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                          }`}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton 
                        tooltipText="포디움 높이 (m)"
                      />
                    </div>
                  </div>
                </div>

                {/* 외피 둘레비율 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group sub'>
                    <label htmlFor="">외피 둘레비율<span className="text-red-500 ml-1">*</span></label>
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`input-unit-wrap transition ${
                          !hasPodium ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <input
                          type="number"
                          id=""
                          placeholder="0"
                          disabled={!hasPodium}
                          className={`bg-transparent transition ${
                            !hasPodium ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                          }`}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton 
                        tooltipText="외피 둘레비율 (m)"
                      />
                    </div>
                  </div>
                </div>

                {/* 건물용도 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group sub top'
                    style={{alignItems: 'flex-start', marginBottom: 0}}>
                    <label>건물 용도<span className="text-red-500 ml-1">*</span></label>

                    <div className='radio-group'>
                      {[
                        { label: '공동주택', value: '1' },
                        { label: '업무시설', value: '2' },
                        { label: '판매시설', value: '3' },
                        { label: '근린생활시설', value: '4' },
                        { label: '문화/집회시설', value: '5' },
                      ].map((opt) => (
                        <label key={opt.value} className={!hasPodium ? 'disabled' : ''}>
                          <input
                            type="checkbox"
                            name="buildingPurpose"
                            value={opt.value}
                            checked={selectedPurpose.includes(opt.value)}
                            disabled={!hasPodium}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPurpose([...selectedPurpose, opt.value]);
                              } else {
                                setSelectedPurpose(selectedPurpose.filter((v) => v !== opt.value));
                              }
                            }}
                          />
                          {opt.label}
                        </label>
                      ))}

                      {/* 기타 + 입력 */}
                      <label className={`radio-etc ${!hasPodium ? 'disabled' : ''}`}>
                        <div>
                          <input
                            type="checkbox"
                            name="buildingPurpose"
                            value="custom"
                            checked={selectedPurpose.includes('custom')}
                            disabled={!hasPodium}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPurpose([...selectedPurpose, 'custom']);
                              } else {
                                setSelectedPurpose(selectedPurpose.filter((v) => v !== 'custom'));
                              }
                            }}
                          />
                          <span>기타:</span>
                        </div>
                        <input
                          type="text"
                          placeholder="용도를 입력하세요"
                          value={customPurpose}
                          disabled={!hasPodium}
                          onChange={(e) => setCustomPurpose(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>    {/* 2. 물 매스 계획 : 왼쪽 영역 끝 */}

              <div className='w-full md:w-1/2 right'>
                <div className='chart-wrap'>
                  <RangeBarWithBullet 
                    ranges={chartData.ranges} 
                    bullets={chartData.bullets} 
                    height={340}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. 승객용 엘리베이터 샤프트 계획 */}
          <h2 className="mt-8">3. 승객용 엘리베이터 샤프트 계획</h2>
          <section>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-1/2 left'>

                {/* 수직조닝 */}
                <div className="grid grid-cols-1 md:grid-cols-1 mb-5">
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 style={{marginBottom: 0}}>수직조닝<span className="text-red-500 ml-1">*</span></h3>
                    <TooltipButton position="right" tooltipText="설명" />
                  </div>

                  {/* 라디오 버튼 */}
                  <div className='radio-group'>
                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="single"
                        checked={zoningType === 'single'}
                        onChange={(e) => setZoningType(e.target.value)}
                      />
                      싱글존
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="two"
                        checked={zoningType === 'two'}
                        onChange={(e) => setZoningType(e.target.value)}
                      />
                        투존 (저층존 - 고층존)
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="multi"
                        checked={zoningType === 'multi'}
                        onChange={(e) => setZoningType(e.target.value)}
                      />
                        멀티존 (저층존 - 중층존 - 고층존)
                    </label>
                  </div>
                </div>

                {/* 샤프트별 최고운행층 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6 mb-5">
                  <div className='flex items-center gap-2 mb-2 sub'>
                    <h3 style={{marginBottom: 0}}>샤프트별 최고운행층<span className="text-red-500 ml-1">*</span></h3>
                    <TooltipButton position="right" tooltipText="설명" />
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {/* 지하 */}
                    <div>
                      <label htmlFor="belowFloors" className="small">지하</label>
                      <div className="input-unit-wrap">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>

                    {/* 지상 */}
                    <div>
                      <label htmlFor="aboveFloors" className='small'>지상</label>
                      <div className="input-unit-wrap">
                        <input 
                          type="number" 
                          id="aboveFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>

                    {/* 추가가 */}
                    <div>
                      <label htmlFor="aboveFloors" className='small'>추가</label>
                      <div className="input-unit-wrap">
                        <input 
                          type="number" 
                          id="aboveFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 특이사항 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group flex-col sub top' 
                    style={{alignItems: 'flex-start', marginBottom: 0}}>
                    <label>특이사항</label>

                    {/* 체크박스 */}
                    <div className='radio-group'>
                      <label>
                        <input
                          type="checkbox"
                          checked={shuttleElevator}
                          onChange={(e) => setShuttleElevator(e.target.checked)}
                        />
                        지하층 셔틀 엘리베이터
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          checked={skyLobby}
                          onChange={(e) => setSkyLobby(e.target.checked)}
                        />
                        스카이로비
                        <span className="ml-3 mt-0.5">
                          <TooltipButton position="right" tooltipText="설명" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>    {/* 3. 승객용 엘리베이터 샤프트 계획 : 왼쪽 영역 끝 */}

              <div className='w-full md:w-1/2 right'>
                <div className='chart-wrap'>
                  <RangeBarWithBullet 
                    ranges={chartData.ranges} 
                    bullets={chartData.bullets} 
                    height={340}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* 4. 계단실 샤프트 계획 */}
          <h2 className="mt-8">4. 계단실 샤프트 계획</h2>
          <section>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-2/2 left'>
                
                {/* 피난안전구역 개소 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className='form-group'>
                    <label htmlFor="buildingHeight">피난안전구역 개소</label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="input-unit-wrap w-50">
                        <input 
                          type="number" 
                          id="buildingHeight" 
                          placeholder="0"
                        />
                        <span className="text-gray-500 ml-2">개소</span>
                      </div>
                      <TooltipButton 
                        position="right"
                        tooltipText="설명"
                      />
                    </div>
                  </div>
                </div>

                {/* 위치 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group flex-col sub top' 
                    style={{alignItems: 'flex-start', marginBottom: 0}}>
                    <label>위치</label>

                    <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
                      <div className="input-unit-wrap w-full disabled">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                          disabled={true}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input 
                          type="number" 
                          id="belowFloors" 
                          placeholder="1"
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>    {/* 4. 계단실 샤프트 계획 : 왼쪽 영역 끝 - right 없음 */}
            </div>
          </section>

          {/* 5. 기본 건축계획 */}
          <h2 className="mt-8">5. 기본 건축계획</h2>
          <section style={{borderBottom: 0}}>
            <div className='flex flex-col md:flex-row gap-8'>
              <div className='w-full md:w-2/2 left'>

                <div className='title-divider'>로비층</div>
                {/* 로비 층고 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='form-group'>
                    <label htmlFor="buildingHeight">로비 층고</label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="input-unit-wrap w-1/3">
                        <input 
                          type="number" 
                          id="buildingHeight" 
                          placeholder="0"
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton 
                        position="right"
                        tooltipText="설명"
                      />
                    </div>
                  </div>
                </div>

                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='checkbox-group'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>승객용 엘리베이터 홀 구획</span>
                        <div className="checkbox-sub">
                          로비층 내 엘리베이터 홀이 벽체 및 도어로 구획되어 있는지 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className='checkbox-group mt-2'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>로비층 외 출입층</span>
                        <div className="checkbox-sub">
                          로비층 외에도 주요 출입이 이루어지는 층이 있는 경우 해당 여부를 표시해 주세요. (예: 지하철 연결층 등)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className='title-divider mt-8'>기준층</div>
                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='checkbox-group'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>엘리베이터 홀 구획</span>
                        <div className="checkbox-sub">
                          기준층 내 엘리베이터 홀이 벽체 및 도어로 복도 또는 주요 공간과 분리되어 있는지 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className='checkbox-group mt-2'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>발코니</span>
                        <div className="checkbox-sub">
                          외부로 연결되는 발코니가 있는 경우 해당 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className='title-divider mt-8'>특수목적</div>
                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className='checkbox-group'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>전망층</span>
                        <div className="checkbox-sub">
                          최상층 등에 전망 목적의 층이 계획되어 있는 경우 해당 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className='checkbox-group mt-2'>
                    <label>
                      <input type="checkbox" />
                      <div>
                        <span>옥상정원</span>
                        <div className="checkbox-sub">
                          옥상에 사용자 접근 가능한 옥상정원이 계획되어 있고, 출입통로와 도어가 있는 경우 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

              </div>    {/* 5. 기본 건축계획 : 왼쪽 영역 끝 - right 없음 */}
            </div>
          </section>

          {/* 평가하기 버튼 */}
          <div className="flex justify-end gap-4">
            {isProcessing ? (
              <button 
                className="btn-primary btn-50 disabled rounded-xl"
                disabled
                style={{width: "120px"}}
              >
                처리 중...
              </button>
            ) : (
              <>
                <button 
                  onClick={handleSave}
                  className="btn-secondary btn-50 rounded-xl"
                  style={{width: "120px"}}
                >
                  저장하기
                </button>
                <button 
                  onClick={handleEvaluate}
                  className="btn-primary btn-50 rounded-xl"
                  style={{width: "120px"}}
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
        hideCloseButton={true}
        headerPadding={'1.5rem 2.5rem 0 2.5rem'}
        titlePadding={'0 0 1rem 0'}
        bodyPadding={'1.5rem 2.5rem 1.5rem 2.5rem'}
      >
        <div className="flex flex-col items-center justify-center">
          <video
            ref={promoVideoRef}
            width="100%"
            controls
            autoPlay
            muted
            style={{ borderRadius: '12px', background: '#000', objectFit: 'cover' }}
          >
            <source src="/promo.mp4" type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
          {showPromoButton && (
            <button
              className="btn-primary btn-50 mt-6"
              onClick={handlePromoModalClose}
              style={{ width: "50%" }}
            >
              분석결과 및 해결방안 확인하기
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
} 