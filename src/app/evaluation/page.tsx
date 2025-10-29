'use client';

import ArrowRight from '@/assets/icons/icon-btn-more.png';
import slideImg1 from '@/assets/images/03_input _001.png';
import slideImg2 from '@/assets/images/03_input _002.png';
import EvaluationDiagram1 from '@/assets/images/03_input _003.png';
import EvaluationDiagram2 from '@/assets/images/03_input _004.png';
import ExImgIntro4 from '@/assets/images/12_stackeffect _001.jpg';
import ElevatorStackedBarChart from '@/components/charts/ElevatorStackedBarChart';
import SectionStackedBarChart from '@/components/charts/SectionStackedBarChart';
import Modal from '@/components/common/Modal';
import TooltipButton from '@/components/common/TooltipButton';
import ImagePreview from '@/components/ImagePreview';
import ImageUploadButton from '@/components/ImageUploadButton';
import '@/css/evaluation.css';
import { generateSectionDataArray } from '@/lib/buildingSection';
import { analyzeElevatorShaftSystem } from '@/lib/elevatorCalc';
import { useUserStore } from '@/utils/store';
import { createClient } from '@supabase/supabase-js';
import humps from 'humps';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function EvaluationPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const promoVideoRef = useRef<HTMLVideoElement>(null);

  // 슬라이드 이미지 배열
  const slides = [
    { src: slideImg1, alt: '평가하기 슬라이드 공유용 이미지-1' },
    { src: slideImg2, alt: '평가하기 슬라이드 공유용 이미지-2' },
  ];

  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    completionYear: '',
    belowFloors: 1,
    aboveFloors: 1,
    buildingHeight: 0,
    buildingGeneralPlanResidential: false,
    buildingGeneralPlanOffice: false,
    buildingGeneralPlanNeighborhood: false,
    buildingGeneralPlanCultural: false,
    buildingGeneralEtcChecked: false,
    buildingGeneralEtcInput: '',
    hasPodium: false,
    podiumHeight: 0,
    perimeterRatio: 0,
    buildingMassPlanResidential: false,
    buildingMassPlanOffice: false,
    buildingMassPlanNeighborhood: false,
    buildingMassPlanCultural: false,
    buildingMassEtcChecked: false,
    buildingMassEtcInput: '',
    zoningType: 'single',
    shaftBelowFloors: 1,
    shaftAboveFloors: 1,
    shaftAdditionalAboveFloors: 1,
    shuttleElevator: false,
    skyLobby: false,
    evacuationZoneCount: 0,
    firstStairShaftFloors: 1,
    secondStairShaftFloors: 1,
    thirdStairShaftFloors: 1,
    fourthStairShaftFloors: 1,
    fifthStairShaftFloors: 1,
    lobbyHeight: 0,
    elevatorHallPartition: false,
    lobbyAccessFloor: false,
    elevatorHallPartitionStandard: false,
    balcony: false,
    observationFloor: false,
    rooftopGarden: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? isChecked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleGeneralEtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      buildingGeneralEtcChecked: checked,
    }));
  };

  const handleGeneralEtcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      buildingGeneralEtcInput: value,
    }));
  };

  const handleMassEtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      buildingMassEtcChecked: checked,
    }));
  };

  const handleMassEtcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      buildingMassEtcInput: value,
    }));
  };

  useEffect(() => console.log('formData: ', formData), [formData]);

  // 홍보 영상 모달 닫기 시 결과페이지 이동
  const handlePromoModalClose = () => {
    setPromoModalOpen(false);
    router.push('/evaluation/result');
  };

  // 차트 데이터
  const chartData: {
    ranges: { x: number; start: number; end: number }[];
    bullets: { x: number; y: number }[];
    blocks: { start: number; end: number; type: 'danger' | 'warning' }[];
  } = {
    ranges: [
      { x: 1, start: 0, end: 50 },
      { x: 2, start: 20, end: 80 },
      { x: 3, start: 40, end: 120 },
      { x: 4, start: 60, end: 140 },
    ],
    bullets: [
      { x: 1, y: 25 },
      { x: 2, y: 50 },
      { x: 3, y: 80 },
      { x: 4, y: 100 },
    ],
    blocks: [
      { start: 0, end: 30, type: 'danger' },
      { start: 30, end: 60, type: 'warning' },
      { start: 60, end: 90, type: 'danger' },
      { start: 90, end: 100, type: 'warning' },
    ],
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  async function uploadImage(file: File) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error('User not authenticated or error fetching user:', userError);
      return;
    }

    const user = userData.user;
    const path = `${user.id}/${crypto.randomUUID()}.png`;

    const { data, error } = await supabase.storage
      .from('project-image')
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      console.error('Error uploading file:', error);
    } else if (data) {
      console.log('File uploaded successfully:', data);
      return path; // Return the path for the database
    }
    return null;
  }

  function base64ToFile(base64: string, filename: string, mimeType: string): File {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, { type: mimeType });
  }

  function validateFormData(upsertFormData: Record<string, any>) {
    const requiredFields = [
      { key: 'projectName', message: '프로젝트명을 입력해주세요.' },
      { key: 'location', message: '위치를 선택해주세요.' },
      { key: 'completionYear', message: '준공(예정) 연도를 입력해주세요.' },
      { key: 'belowFloors', message: '건물 규모 지하 층수를 입력해주세요.' },
      { key: 'aboveFloors', message: '건물 규모 지상 층수를 입력해주세요.' },
      { key: 'buildingHeight', message: '건물 높이를 입력해주세요.' },
      { key: 'zoningType', message: '수직조닝을 선택해주세요.' },
      { key: 'shaftBelowFloors', message: '샤프트별 최고운행층 지하 층수를 입력해주세요.' },
      { key: 'shaftAboveFloors', message: '샤프트별 최고운행층 지상 층수를 입력해주세요.' },
      { key: 'shaftAdditionalAboveFloors', message: '샤프트별 추가 층수를 입력해주세요.' },
      { key: 'lobbyHeight', message: '로비 층고를 입력해주세요.' },
    ];

    for (const field of requiredFields) {
      // 0을 허용하는 필드들
      const zeroAllowedFields = [
        'belowFloors',
        'shaftBelowFloors',
        'shaftAboveFloors',
        'shaftAdditionalAboveFloors',
        'lobbyHeight',
      ];

      if (
        zeroAllowedFields.includes(field.key) &&
        (upsertFormData[field.key] === undefined || upsertFormData[field.key] === null)
      ) {
        alert(field.message);
        document.querySelector(`[name="${field.key}"]`)?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }
      // 다른 필드들은 기존대로 검사
      else if (!zeroAllowedFields.includes(field.key) && !upsertFormData[field.key]) {
        alert(field.message);
        document.querySelector(`[name="${field.key}"]`)?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }
    }

    const usageFields = [
      'buildingGeneralPlanResidential',
      'buildingGeneralPlanOffice',
      'buildingGeneralPlanNeighborhood',
      'buildingGeneralPlanCultural',
      'buildingGeneralEtcChecked',
    ];

    const isAnyUsageFieldTrue = usageFields.some((field) => upsertFormData[field]);
    if (!isAnyUsageFieldTrue) {
      alert('건물 일반 정보 건물 용도를 선택해주세요.');
      document
        .querySelector(`[name="buildingMassPlanResidential"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }

    if (upsertFormData['buildingGeneralEtcChecked'] && !upsertFormData['buildingGeneralEtcInput']) {
      alert('건물 일반 정보 건물 용도 기타 값을 입력해주세요.');
      document
        .querySelector(`[name="buildingGeneralEtcInput"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }

    if (upsertFormData['hasPodium']) {
      const massPlanFields = [
        'buildingMassPlanResidential',
        'buildingMassPlanOffice',
        'buildingMassPlanNeighborhood',
        'buildingMassPlanCultural',
        'buildingMassEtcChecked',
      ];

      const isAnyMassPlanFieldTrue = massPlanFields.some((field) => upsertFormData[field]);
      if (!isAnyMassPlanFieldTrue) {
        alert('건물 매스 계획 건물 용도를 선택해주세요.');
        document
          .querySelector(`[name="buildingMassPlanResidential"]`)
          ?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }

      if (upsertFormData['buildingMassEtcChecked'] && !upsertFormData['buildingMassEtcInput']) {
        alert('건물 매스 계획 건물 용도 기타 값을 입력해주세요.');
        document
          .querySelector(`[name="buildingMassEtcInput"]`)
          ?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }

      if (!upsertFormData['podiumHeight']) {
        alert('포디움 높이를 입력해주세요.');
        document.querySelector(`[name="podiumHeight"]`)?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }

      if (!upsertFormData['perimeterRatio']) {
        alert('외피 둘레비율을 입력해주세요.');
        document.querySelector(`[name="perimeterRatio"]`)?.scrollIntoView({ behavior: 'smooth' });
        return false;
      }
    }

    return true;
  }

  const initModalHandler = () => {
    setFormData({
      projectName: '',
      location: '',
      completionYear: '',
      belowFloors: 1,
      aboveFloors: 1,
      buildingHeight: 0,
      buildingGeneralPlanResidential: false,
      buildingGeneralPlanOffice: false,
      buildingGeneralPlanNeighborhood: false,
      buildingGeneralPlanCultural: false,
      buildingGeneralEtcChecked: false,
      buildingGeneralEtcInput: '',
      hasPodium: false,
      podiumHeight: 0,
      perimeterRatio: 0,
      buildingMassPlanResidential: false,
      buildingMassPlanOffice: false,
      buildingMassPlanNeighborhood: false,
      buildingMassPlanCultural: false,
      buildingMassEtcChecked: false,
      buildingMassEtcInput: '',
      zoningType: 'single',
      shaftBelowFloors: 1,
      shaftAboveFloors: 1,
      shaftAdditionalAboveFloors: 1,
      shuttleElevator: false,
      skyLobby: false,
      evacuationZoneCount: 0,
      firstStairShaftFloors: 1,
      secondStairShaftFloors: 1,
      thirdStairShaftFloors: 1,
      fourthStairShaftFloors: 1,
      fifthStairShaftFloors: 1,
      lobbyHeight: 0,
      elevatorHallPartition: false,
      lobbyAccessFloor: false,
      elevatorHallPartitionStandard: false,
      balcony: false,
      observationFloor: false,
      rooftopGarden: false,
    });
    setPreview(null);
    setModalOpen(false);
  };

  async function handleFormSubmit(isEvaluation: boolean) {
    let imagePath = null;
    if (preview) {
      const file = base64ToFile(preview, 'image.png', 'image/png');
      imagePath = await uploadImage(file);
      if (!imagePath) {
        console.error('Failed to upload image.');
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error('User not authenticated or error fetching user:', userError);
      alert('사용자 인증에 실패했습니다.');
      return;
    }

    if (!validateFormData(formData)) {
      return;
    }

    const user = userData.user;
    const upsertFormData: any = humps.decamelizeKeys({
      image_path: imagePath,
      is_evaluation_applied: isEvaluation,
      created_by: user.id,
      ...formData,
    });

    if (upsertFormData.id) {
      // Update existing record
      const { error } = await supabase
        .from('project')
        .update(upsertFormData)
        .eq('id', upsertFormData.id);

      if (error) {
        console.error('Error updating project:', error);
        alert('프로젝트 업데이트에 실패했습니다.');
      } else {
        console.log('Project updated successfully');
        alert('프로젝트가 성공적으로 업데이트되었습니다.');
      }
    } else {
      // Update all existing projects' is_used to false
      const { error: updateError } = await supabase
        .from('project')
        .update({ is_used: false })
        .eq('created_by', user.id);

      if (updateError) {
        console.error('Error updating existing projects:', updateError);
        alert('기존 프로젝트 상태 업데이트에 실패했습니다.');
        return;
      }

      // Insert new record with is_used set to true
      upsertFormData.is_used = true;
      const { error } = await supabase.from('project').insert(upsertFormData);

      if (error) {
        console.error('Error inserting project:', error);
        alert('프로젝트 생성에 실패했습니다.');
      } else {
        console.log('Project inserted successfully');
        alert('프로젝트가 성공적으로 생성되었습니다.');
        setFormData({
          projectName: '',
          location: '',
          completionYear: '',
          belowFloors: 1,
          aboveFloors: 1,
          buildingHeight: 0,
          buildingGeneralPlanResidential: false,
          buildingGeneralPlanOffice: false,
          buildingGeneralPlanNeighborhood: false,
          buildingGeneralPlanCultural: false,
          buildingGeneralEtcChecked: false,
          buildingGeneralEtcInput: '',
          hasPodium: false,
          podiumHeight: 0,
          perimeterRatio: 0,
          buildingMassPlanResidential: false,
          buildingMassPlanOffice: false,
          buildingMassPlanNeighborhood: false,
          buildingMassPlanCultural: false,
          buildingMassEtcChecked: false,
          buildingMassEtcInput: '',
          zoningType: 'single',
          shaftBelowFloors: 1,
          shaftAboveFloors: 1,
          shaftAdditionalAboveFloors: 1,
          shuttleElevator: false,
          skyLobby: false,
          evacuationZoneCount: 0,
          firstStairShaftFloors: 1,
          secondStairShaftFloors: 1,
          thirdStairShaftFloors: 1,
          fourthStairShaftFloors: 1,
          fifthStairShaftFloors: 1,
          lobbyHeight: 0,
          elevatorHallPartition: false,
          lobbyAccessFloor: false,
          elevatorHallPartitionStandard: false,
          balcony: false,
          observationFloor: false,
          rooftopGarden: false,
        });
        setPromoModalOpen(true);
      }
    }
    setModalOpen(false);
    setPreview(null);
  }

  const input = {
    numFloorGround: 120,
    numFloorBasement: 7,
    EVZoningtypeSingle: false,
    EVZoningtypeTwo: true,
    EVZoningtypeMulti: false,
    EVSkylobby: false,
    EVTopfloorLow: 20,
    EVTopfloorMid: 0,
    EVTopfloorHigh: 30,
    EVBasementshuttle: true,
  };

  const result: any = analyzeElevatorShaftSystem(input);
  console.log('result: ', result);

  // 1) 바로 전체 결과 얻기
  const buildingSectionData = generateSectionDataArray({
    groundFloors: 30,
    basementFloors: 7,
    hasPodium: true,
    podiumFloors: 5,
  });

  // 3) 샘플 결과
  console.log('buildingSectionData: ', buildingSectionData);

  return (
    <div className="container mx-auto py-10 evaluation">
      <h1 className="text-3xl font-bold mb-5">연돌현상 예측평가</h1>

      {/* 연돌현상 예측평가 페이지 설명 영역 */}
      <section className="cppe-explain">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-2/5 left">
            <h2 className="mb-1">연돌현상</h2>
            <h3 className="mb-3">Stack Effect, Chimney Phenomenon</h3>
            <p>
              연돌현상 예측평가는 건물 내·외부의 온도차와 수직공간 구성을 기반으로 압력분포를 계산하고,
              그 영향을 정량적으로 분석하는 과정입니다. 이를 통해 설계 단계에서 잠재적인 문제를
              사전에 파악하고 대응 전략을 수립할 수 있습니다.
            </p>
            <div className="text-box mb-4">
              <h4 className="mb-2">예측평가를 위해 필요한 정보</h4>
              <ul className="mt-3">
                <li>건물 개요: 위치, 층수, 높이, 용도</li>
                <li>매스 계획: 로비층 높이, 포디움 높이 및 둘레 길이</li>
                <li>샤프트 계획: 엘리베이터 조닝 및 운행층, 계단실 구성</li>
                <li>기타: 일반 건축계획 사항</li>
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary btn-50 rounded-xl flex items-center justify-between gap-2 w-1/2"
                onClick={() => {
                  if (!user || !user?.email) {
                    alert('로그인 후 이용해주세요.');
                    router.push('/login');
                    return;
                  }
                  setModalOpen(true);
                }}
              >
                시작하기
                <Image src={ArrowRight} alt="arrow-right" width={24} height={24} />
              </button>
            </div>
          </div>

          {/* 슬라이드 영역 */}
          <div className="w-full md:w-3/5 right" style={{ padding: 0 }}>
            <div className="swiper-cover h-full p-5">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Navigation 버튼 */}
                <div className="swiper-button-prev custom-swiper-button-prev"></div>
                <div className="swiper-button-next custom-swiper-button-next"></div>

                {/* Pagination */}
                <div className="swiper-pagination custom-swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
        </div>
        {/* 이미지 영역 */}
        <div className="flex flex-col gap-4 mt-16 diagram">
          <h2>HOW DO WE ASSESS?</h2>
          <h4>Core algorithm and parameters</h4>
          <div className="image-wrap pb-1">
            <Image src={EvaluationDiagram1} alt="HOW DO WE ASSESS?" />
          </div>

          <div className="flex justify-center">
            <a className="btn-secondary btn-50 w-1/4 flex-row-center" href="/about">
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* 시작하기 모달 */}
      <Modal
        open={modalOpen}
        onClose={initModalHandler}
        title={'연돌현상 예측평가'}
        footer={' '}
        // width={'80%'}
        width={'1400px'}
      >
        <div className="evaluation-page">
          <h2>1. 건물 일반 정보</h2>
          <section>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 left">
                {/* 프로젝트명 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group" style={{ marginBottom: '0.375rem' }}>
                    <label htmlFor="projectName">
                      프로젝트명<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      placeholder="예: OO 오피스 빌딩"
                      value={formData.projectName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* 프로젝트 대표사진 업로드 */}
                  <div className="form-group mt-4">
                    <label htmlFor="projectImage">프로젝트 사진 선택</label>
                    <ImageUploadButton
                      onImageSelect={setPreview}
                    />
                  </div>
                </div>

                {/* 위치(기후데이터) */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label htmlFor="location">
                      위치(기후데이터)<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      >
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

                {/* 준공예정연도 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label htmlFor="completionYear">준공예정연도</label>
                    <input
                      type="text"
                      id="completionYear"
                      name="completionYear"
                      className="w-full outline-none"
                      placeholder="2025"
                      value={formData.completionYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* 건물규모 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label>
                      건물규모(층수) <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {/* 지하 */}
                      <div>
                        <label htmlFor="belowFloors" className="small">
                          지하
                        </label>
                        <div className="input-unit-wrap">
                          <input
                            type="number"
                            id="belowFloors"
                            name="belowFloors"
                            placeholder="1"
                            value={formData.belowFloors}
                            onChange={handleChange}
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>

                      {/* 지상 */}
                      <div>
                        <label htmlFor="aboveFloors" className="small">
                          지상
                        </label>
                        <div className="input-unit-wrap">
                          <input
                            type="number"
                            id="aboveFloors"
                            name="aboveFloors"
                            placeholder="1"
                            value={formData.aboveFloors}
                            onChange={handleChange}
                          />
                          <span className="text-gray-500 ml-2">F</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 건물높이 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label htmlFor="buildingHeight">
                      건물높이 <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          id="buildingHeight"
                          name="buildingHeight"
                          placeholder="0"
                          value={formData.buildingHeight}
                          onChange={handleChange}
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
                  <div className="form-group" style={{ alignItems: 'flex-start', marginBottom: 0 }}>
                    <label>
                      건물 용도<span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="radio-group">
                      <div className="radio">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingGeneralPlanResidential"
                            checked={formData.buildingGeneralPlanResidential}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingGeneralPlanResidential: e.target.checked,
                              }))
                            }
                          />
                          <span>공동주택</span>
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingGeneralPlanOffice"
                            checked={formData.buildingGeneralPlanOffice}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingGeneralPlanOffice: e.target.checked,
                              }))
                            }
                          />
                          <span>업무시설</span>
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingGeneralPlanNeighborhood"
                            checked={formData.buildingGeneralPlanNeighborhood}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingGeneralPlanNeighborhood: e.target.checked,
                              }))
                            }
                          />
                          <span>근린생활시설</span>
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingGeneralPlanCultural"
                            checked={formData.buildingGeneralPlanCultural}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingGeneralPlanCultural: e.target.checked,
                              }))
                            }
                          />
                          <span>문화/집회시설</span>
                        </label>
                      </div>

                      {/* 기타 + 입력 */}
                      <label className="radio-etc">
                        <div>
                          <input
                            type="checkbox"
                            name="buildingGeneralEtc"
                            checked={formData.buildingGeneralEtcChecked}
                            onChange={handleGeneralEtcChange}
                          />
                          <span>기타:</span>
                        </div>
                        <input
                          type="text"
                          value={formData.buildingGeneralEtcInput}
                          onChange={handleGeneralEtcInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>{' '}
              {/* 1. 건물 일반 정보 : 왼쪽 영역 끝 */}
              <div className="w-full md:w-1/2 right">
                <ImagePreview previewUrl={preview} />
              </div>
            </div>
          </section>

          {/* 2. 건물 매스 계획 */}
          <h2 className="mt-8">2. 건물 매스 계획</h2>
          <section>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/5 left">
                {/* 로비 층고 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label htmlFor="lobbyHeight">로비 층고</label>
                    <div className="flex items-center gap-2 w-full pl-6">
                      <div className="input-unit-wrap w-2/3">
                        <input
                          type="number"
                          id="lobbyHeight"
                          name="lobbyHeight"
                          placeholder="0"
                          value={formData.lobbyHeight}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton position="right" tooltipText="로비 층고를 입력해 주세요." />
                    </div>
                  </div>
                </div>

                {/* 스위치 */}
                <div className="grid grid-cols-1 md:grid-cols-1 mt-6">
                  <div className="flex items-center gap-3">
                    <h3 className="mb-0 whitespace-nowrap">저층부 포디움</h3>
                    <label className="switch-container switch-inline">
                      <input
                        type="checkbox"
                        name="hasPodium"
                        checked={formData.hasPodium}
                        onChange={(e) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            hasPodium: e.target.checked,
                            podiumHeight: e.target.checked ? formData.podiumHeight : 0,
                            perimeterRatio: e.target.checked ? formData.perimeterRatio : 0,
                            buildingMassPlanResidential: e.target.checked
                              ? formData.buildingMassPlanResidential
                              : false,
                            buildingMassPlanOffice: e.target.checked
                              ? formData.buildingMassPlanOffice
                              : false,
                            buildingMassPlanNeighborhood: e.target.checked
                              ? formData.buildingMassPlanNeighborhood
                              : false,
                            buildingMassPlanCultural: e.target.checked
                              ? formData.buildingMassPlanCultural
                              : false,
                            buildingMassEtcChecked: e.target.checked
                              ? formData.buildingMassEtcChecked
                              : false,
                            buildingMassEtcInput: e.target.checked
                              ? formData.buildingMassEtcInput
                              : '',
                          }));
                        }}
                        className="switch-input"
                      />
                      <span className={`switch-slider ${formData.hasPodium ? 'active' : ''}`} />
                    </label>
                  </div>
                </div>

                {/* 포디움 높이 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className="form-group sub">
                    <label htmlFor="podiumHeight">
                      포디움 높이 (m)<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`input-unit-wrap transition ${
                          !formData.hasPodium ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <input
                          type="number"
                          id="podiumHeight"
                          name="podiumHeight"
                          placeholder="0"
                          value={formData.podiumHeight}
                          onChange={handleChange}
                          disabled={!formData.hasPodium}
                          className={`bg-transparent transition ${
                            !formData.hasPodium ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                          }`}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton
                        tooltipText="
                        지면부터 포디움 최상층의 천장 슬래브 상단까지의 높이를 입력해 주세요."
                      />
                    </div>
                  </div>
                </div>

                {/* 외피 둘레비율 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className="form-group sub">
                    <label htmlFor="">
                      외피 둘레비율<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`input-unit-wrap transition ${
                          !formData.hasPodium ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <input
                          type="number"
                          id="perimeterRatio"
                          name="perimeterRatio"
                          placeholder="0"
                          value={formData.perimeterRatio}
                          onChange={handleChange}
                          disabled={!formData.hasPodium}
                          className={`bg-transparent transition ${
                            !formData.hasPodium ? 'text-gray-400 cursor-not-allowed' : 'text-black'
                          }`}
                        />
                        <span className="text-gray-500 ml-2">m</span>
                      </div>
                      <TooltipButton
                        tooltipText="
                        기준층(상층부 타워) 외피 길이 대비 포디움 외피 길이의 비율을 입력해 주세요.
                        <br/>※ 계산식 : (포디움 외피 둘레) / (기준층 외피 둘레)
                      "
                      />
                    </div>
                  </div>
                </div>

                {/* 건물용도 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div
                    className="form-group sub top"
                    style={{ alignItems: 'flex-start', marginBottom: 0 }}
                  >
                    <label>
                      건물 용도<span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="radio-group">
                      <div className="radio-etc">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingMassPlanResidential"
                            checked={formData.buildingMassPlanResidential}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingMassPlanResidential: e.target.checked,
                              }))
                            }
                            disabled={!formData.hasPodium}
                          />
                          <span>공동주택</span>
                        </label>
                      </div>
                      <div className="radio-etc">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingMassPlanOffice"
                            checked={formData.buildingMassPlanOffice}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingMassPlanOffice: e.target.checked,
                              }))
                            }
                            disabled={!formData.hasPodium}
                          />
                          <span>업무시설</span>
                        </label>
                      </div>
                      <div className="radio-etc">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingMassPlanNeighborhood"
                            checked={formData.buildingMassPlanNeighborhood}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingMassPlanNeighborhood: e.target.checked,
                              }))
                            }
                            disabled={!formData.hasPodium}
                          />
                          <span>근린생활시설</span>
                        </label>
                      </div>
                      <div className="radio-etc">
                        <label>
                          <input
                            type="checkbox"
                            name="buildingMassPlanCultural"
                            checked={formData.buildingMassPlanCultural}
                            onChange={(e) =>
                              setFormData((prevData) => ({
                                ...prevData,
                                buildingMassPlanCultural: e.target.checked,
                              }))
                            }
                            disabled={!formData.hasPodium}
                          />
                          <span>문화/집회시설</span>
                        </label>
                      </div>

                      {/* 기타 + 입력 */}
                      <label className={`radio-etc ${!formData.hasPodium ? 'disabled' : ''}`}>
                        <div>
                          <input
                            type="checkbox"
                            name="buildingMassEtc"
                            checked={formData.buildingMassEtcChecked}
                            onChange={handleMassEtcChange}
                            disabled={!formData.hasPodium}
                          />
                          <span>기타:</span>
                        </div>
                        <input
                          type="text"
                          value={formData.buildingMassEtcInput}
                          onChange={handleMassEtcInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>{' '}
              {/* 2. 건물 매스 계획 : 왼쪽 영역 끝 */}
              <div className="w-full lg:w-3/5 right">
                <div className="flex gap-4 md:flex-row flex-col w-full">
                  {/* 차트 영역 */}
                  <div className="chart-wrap md:w-2/5">
                    <SectionStackedBarChart
                      data={generateSectionDataArray({
                        groundFloors: formData.aboveFloors,
                        basementFloors: formData.belowFloors,
                        hasPodium: formData.hasPodium,
                        podiumFloors: formData.podiumHeight,
                      })}
                      // data={[
                      //   { section: 1, basement: 0, soil: -17, envelope: 0 },
                      //   { section: 2, basement: -7, soil: -10, envelope: 0 },
                      //   { section: 3, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 4, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 5, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 6, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 7, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 8, basement: -7, soil: -10, envelope: 30 },
                      //   { section: 9, basement: -7, soil: -10, envelope: 5 },
                      //   { section: 10, basement: -7, soil: -10, envelope: 5 },
                      //   { section: 11, basement: -7, soil: -10, envelope: 0 },
                      //   { section: 12, basement: 0, soil: -17, envelope: 0 },
                      // ]}
                      width={240}
                      height={300}
                    />
                  </div>

                  {/* 이미지 영역 */}
                  <div className="image-section md:w-3/5">
                    <div className="image-wrap" style={{ minHeight: '240px', maxHeight: '240px' }}>
                      <Image src={ExImgIntro4} alt={'이미지 영역'} />
                    </div>
                    <p>
                      포디움 상층부 타워와는 다른 기능(예: 상업, 켜뮤니티, 로비, 주차 등)을
                      수용하며, 저층부의 매스를 통해 상부 타워와의 용도-동선-파사드 분리를
                      계획적으로 구현하는 기반부 구성이다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 승객용 엘리베이터 샤프트 계획 */}
          <h2 className="mt-8">3. 승객용 엘리베이터 샤프트 계획</h2>
          <section>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/5 left">
                {/* 수직조닝 */}
                <div className="grid grid-cols-1 md:grid-cols-1 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 style={{ marginBottom: 0 }}>
                      수직조닝 타입<span className="text-red-500 ml-1">*</span>
                    </h3>
                    <TooltipButton
                      position="right"
                      tooltipText="
                      건물 높이 또는 용도에 따라 구획된 엘리베이터존 구성방식을 선택해주세요.
                      <br/>※ 승강기 운행계획도 또는 단면도 참조
                    "
                    />
                  </div>

                  {/* 라디오 버튼 */}
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="single"
                        checked={formData.zoningType === 'single'}
                        onChange={handleChange}
                      />
                      싱글존
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="two"
                        checked={formData.zoningType === 'two'}
                        onChange={handleChange}
                      />
                      투존 (저층존 - 고층존)
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="zoningType"
                        value="multi"
                        checked={formData.zoningType === 'multi'}
                        onChange={handleChange}
                      />
                      멀티존 (저층존 - 중층존 - 고층존)
                    </label>
                  </div>
                </div>

                {/* 샤프트별 최고운행층 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6 mb-5">
                  <div className="flex items-center gap-2 mb-2 sub">
                    <h3 style={{ marginBottom: 0 }}>
                      샤프트별 최고운행층<span className="text-red-500 ml-1">*</span>
                    </h3>
                    <TooltipButton
                      position="right"
                      tooltipText="
                      각 샤프트(엘리베이터 그룹) 별로 최상단 정차증의 층수를 입력해 주세요.
                      구획된 존별 승강기 운행계획을 기준으로 합니다.
                    "
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                    {/* 지하 */}
                    <div>
                      <label htmlFor="shaftBelowFloors" className="small">
                        지하
                      </label>
                      <div className="input-unit-wrap">
                        <input
                          type="number"
                          id="shaftBelowFloors"
                          name="shaftBelowFloors"
                          placeholder="1"
                          value={formData.shaftBelowFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>

                    {/* 지상 */}
                    <div>
                      <label htmlFor="shaftAboveFloors" className="small">
                        지상
                      </label>
                      <div className="input-unit-wrap">
                        <input
                          type="number"
                          id="shaftAboveFloors"
                          name="shaftAboveFloors"
                          placeholder="1"
                          value={formData.shaftAboveFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>

                    {/* 추가 */}
                    <div>
                      <label htmlFor="shaftAdditionalAboveFloors" className="small">
                        추가
                      </label>
                      <div className="input-unit-wrap">
                        <input
                          type="number"
                          id="shaftAdditionalAboveFloors"
                          name="shaftAdditionalAboveFloors"
                          placeholder="1"
                          value={formData.shaftAdditionalAboveFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 특이사항 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div
                    className="form-group flex-col sub top"
                    style={{ alignItems: 'flex-start', marginBottom: 0 }}
                  >
                    <label>특이사항</label>

                    {/* 체크박스 */}
                    <div className="radio-group">
                      <label>
                        <input
                          type="checkbox"
                          name="shuttleElevator"
                          checked={formData.shuttleElevator}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              shuttleElevator: e.target.checked,
                            }))
                          }
                        />
                        지하층 셔틀 엘리베이터
                      </label>

                      <label>
                        <input
                          type="checkbox"
                          name="skyLobby"
                          checked={formData.skyLobby}
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              skyLobby: e.target.checked,
                            }))
                          }
                        />
                        스카이로비
                        <span className="ml-3 mt-0.5">
                          <TooltipButton position="right" tooltipText="설명" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3. 승객용 엘리베이터 샤프트 계획 : 왼쪽 영역 끝 */}
              <div className="w-full lg:w-3/5 right">
                <div className="flex gap-4 md:flex-row flex-col w-full">
                  {/* 차트 영역 */}
                  <div className="chart-wrap md:w-2/5">
                    <ElevatorStackedBarChart
                      data={analyzeElevatorShaftSystem({
                        numFloorGround: formData.aboveFloors,
                        numFloorBasement: formData.belowFloors,
                        EVZoningtypeSingle: formData.zoningType === 'single',
                        EVZoningtypeTwo: formData.zoningType === 'two',
                        EVZoningtypeMulti: formData.zoningType === 'multi',
                        EVSkylobby: formData.skyLobby,
                        EVTopfloorLow: formData.shaftBelowFloors,
                        EVTopfloorMid: formData.shaftAboveFloors,
                        EVTopfloorHigh: formData.shaftAdditionalAboveFloors,
                        EVBasementshuttle: formData.shuttleElevator,
                      })}
                    />
                  </div>

                  {/* 이미지 영역 */}
                  <div className="image-section md:w-3/5">
                    <div className="image-wrap" style={{ minHeight: '240px', maxHeight: '240px' }}>
                      <Image src={ExImgIntro4} alt={'이미지 영역'} />
                    </div>
                    <p>
                      스카이로비는 고층 건물에서 엘리베이터 효율을 높이기 위해 중간층에 배치되는
                      환승용 공용로비로, 승객은 저층용 엘리베이터를 타고 스카이로비까지 이동한 뒤,
                      고층부 전용 엘리베이터로 환승해 상층부로 이동한다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 계단실 샤프트 계획 */}
          <h2 className="mt-8">4. 계단실 샤프트 계획</h2>
          <section>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/2 left">
                {/* 피난안전구역 개소 */}
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <div className="form-group">
                    <label htmlFor="evacuationZoneCount">피난안전구역 개소</label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="input-unit-wrap w-50">
                        <input
                          type="number"
                          id="evacuationZoneCount"
                          name="evacuationZoneCount"
                          placeholder="0"
                          value={formData.evacuationZoneCount}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">개소</span>
                      </div>
                      <TooltipButton position="right" tooltipText="설명" />
                    </div>
                  </div>
                </div>

                {/* 위치 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div
                    className="form-group flex-col sub top"
                    style={{ alignItems: 'flex-start', marginBottom: 0 }}
                  >
                    <label>위치</label>

                    <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          name="firstStairShaftFloors"
                          value={formData.firstStairShaftFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          name="secondStairShaftFloors"
                          value={formData.secondStairShaftFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          name="thirdStairShaftFloors"
                          value={formData.thirdStairShaftFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          name="fourthStairShaftFloors"
                          value={formData.fourthStairShaftFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                      <div className="input-unit-wrap w-full">
                        <input
                          type="number"
                          name="fifthStairShaftFloors"
                          value={formData.fifthStairShaftFloors}
                          onChange={handleChange}
                        />
                        <span className="text-gray-500 ml-2">F</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{' '}
              {/* 4. 계단실 샤프트 계획 : 왼쪽 영역 끝 - right 없음 */}
            </div>
          </section>

          {/* 5. 기본 건축계획 */}
          <h2 className="mt-8">5. 기본 건축계획</h2>
          <section style={{ borderBottom: 0 }}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/2 left">
                <div className="title-divider">로비층</div>
                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.elevatorHallPartition}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            elevatorHallPartition: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>승객용 엘리베이터 홀 구획</span>
                        <div className="checkbox-sub">
                          로비층 내 엘리베이터 홀이 벽체 및 도어로 구획되어 있는지 여부를 체크해
                          주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="checkbox-group mt-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.lobbyAccessFloor}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            lobbyAccessFloor: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>로비층 외 출입층</span>
                        <div className="checkbox-sub">
                          로비층 외에도 주요 출입이 이루어지는 층이 있는 경우 해당 여부를 표시해
                          주세요. (예: 지하철 연결층 등)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="title-divider mt-8">기준층</div>
                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.elevatorHallPartitionStandard}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            elevatorHallPartitionStandard: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>엘리베이터 홀 구획</span>
                        <div className="checkbox-sub">
                          기준층 내 엘리베이터 홀이 벽체 및 도어로 복도 또는 주요 공간과 분리되어
                          있는지 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="checkbox-group mt-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.balcony}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            balcony: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>발코니</span>
                        <div className="checkbox-sub">
                          외부로 연결되는 발코니가 있는 경우 해당 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="title-divider mt-8">특수목적</div>
                {/* 체크박스 */}
                <div className="grid grid-cols-1 md:grid-cols-1 pl-6">
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.observationFloor}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            observationFloor: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>전망층</span>
                        <div className="checkbox-sub">
                          최상층 등에 전망 목적의 층이 계획되어 있는 경우 해당 여부를 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="checkbox-group mt-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.rooftopGarden}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            rooftopGarden: e.target.checked,
                          }))
                        }
                      />
                      <div>
                        <span>옥상정원</span>
                        <div className="checkbox-sub">
                          옥상에 사용자 접근 가능한 옥상정원이 계획되어 있고, 출입통로와 도어가 있는
                          경우 체크해 주세요.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>{' '}
              {/* 5. 기본 건축계획 : 왼쪽 영역 끝 - right 없음 */}
            </div>
          </section>

          {/* 평가하기 버튼 */}
          <div className="flex justify-end gap-4">
            {/* Removed isProcessing state, so this block will always show the buttons */}
            <>
              {/* TO DO : 저장하기 버튼 삭제 요청!!!!! */}
              {/* <button
                onClick={() => handleFormSubmit(false)}
                className="btn-secondary btn-50 rounded-xl"
                style={{ width: '120px' }}
              >
                저장하기
              </button> */}
              <button
                onClick={() => handleFormSubmit(true)}
                className="btn-primary btn-50 rounded-xl"
                style={{ width: '120px' }}
              >
                평가하기
              </button>
            </>
          </div>
        </div>
      </Modal>

      {/* 홍보 영상 모달 */}
      <Modal
        open={promoModalOpen}
        onClose={handlePromoModalClose}
        title={'홍보 영상'}
        footer={' '}
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
            style={{
              borderRadius: '12px',
              background: '#000',
              objectFit: 'cover',
              maxHeight: '420px',
            }}
          >
            <source src="/promo.mp4" type="video/mp4" />
            브라우저가 video 태그를 지원하지 않습니다.
          </video>
          {/* showPromoButton state was removed, so this block will always show the button */}
          <button
            className="btn-primary btn-50 mt-6"
            onClick={handlePromoModalClose}
            style={{ width: '50%' }}
          >
            분석결과 및 해결방안 확인하기
          </button>
        </div>
      </Modal>
    </div>
  );
}
