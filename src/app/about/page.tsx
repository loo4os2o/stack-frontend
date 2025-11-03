'use client';
import React from 'react';

import '@/css/about.css';
import Image from 'next/image';
import AboutStackDiagram1 from '@/assets/images/02_about STACK _004.png';
import AboutStackDiagram2 from '@/assets/images/02_about STACK _002.png';
import ExImgDiagram2 from '@/assets/images/02_about_process.png';
import TargetBlank from '@/assets/icons/icon-target-blank.png';
import logoAbout from '@/assets/images/logo-STACK-about.png';

export default function AboutPage() {
  return (
    <div className="container mx-auto pt-10">
      <section className="bg-color">
        <div className="inner">
          {/* 타이틀 */}
          <h1 className="mb-4 flex items-center gap-4">
            <span className="mb-1">About</span>
            <Image src={logoAbout} alt="logo" width={184} />
          </h1>

          <div className="mb-5 about-wrap">
            <div className="image-wrap stacked">
              <div className="image-text-panel">
                <p className="image-text-lead">
                  STACK의 연돌효과 예측 평가는 물리기반 압력분포 해석을 중심으로 수행됩니다. Mass
                  Balance 원리에 따라 각 샤프트의 중성대(NPL)를 계산하고, 이를 기준으로 층별 압력
                  프로파일을 도출합니다.
                </p>
                <p>
                  이 과정에서 내부구획 및 수직 샤프트에 작용하는 압력차를 검토하여, 문제발생 가능
                  구역을 도출하고 실행 가능한 개선 전략을 제시합니다. STACK은 2000년 이후 국가 R&D
                  및 산학 협력 성과와 국내외 80여 개 초고층 건물에서 검증된 엔지니어링 실무 경험을
                  반영하여 개발되었습니다. 또한 국내 다양한 프로젝트의 실측 데이터 및 장기 모니터링
                  결과를 기반으로 알고리즘의 예측 정확도를 검증·보정하였습니다.
                </p>
              </div>
              <Image src={AboutStackDiagram1} alt="STACK 소개 이미지-1" className="w-full h-auto" />
            </div>
          </div>

          <div className="about-wrap mt-5">
            <h4>샤프트 중성대 추정 기반 압력분포 예측</h4>
            <ul className="about-overview">
              <li>연돌현상 영향도(SEI, Stack Effect Index)</li>
              <li>예상 문제 항목 및 문제 발생층 비율</li>
              <li>주요 층(로비층, 최상층)의 최대압력차</li>
              <li>건물 압력 분포 프로파일 및 샤프트별 중립압력층(NPL) 위치</li>
              <li>건축계획 요인 분석 및 예측평가 결과 기반 개선안 적용사항</li>
              <li>추가 엔지니어링 검토 필요 항목</li>
            </ul>

            {/* 차트영역 */}
            {/* <div className="flex gap-4 mt-5 w-full">
              <div
                className="chart-wrap w-3/5 gap-4"
                style={{ height: '416px', flexDirection: 'row', padding: '1rem' }}
              >
                <div className="chart-wrap border-2 w-1/5 h-full">
                  차트1 - <br /> 중성대 위치
                </div>
                <div className="chart-wrap border-2 w-4/5 h-full">
                  차트1 - <br /> 압력분포 프로파일
                </div>
              </div>
              <div className="flex flex-col gap-4 w-2/5">
                <div className="chart-wrap w-full" style={{ height: '200px' }}>
                  차트2 <br /> 문제발생 예상층
                </div>
                <div className="chart-wrap w-full" style={{ height: '200px' }}>
                  차트3 <br /> 최대연돌 압력차(∆P)
                </div>
              </div>
            </div> */}

            {/* 차트영역 이미지로 대체 */}
            <div className="image-wrap mt-6">
              <Image src={AboutStackDiagram2} alt="STACK 소개 이미지-2" className="w-full h-auto" />
            </div>
          </div>

          {/* <div className='flex gap-8 mt-8'>
            <section className='flex-1'
              style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem' }}>
              <h2 className='text-center mb-6'
                style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                샤프트 중성대 추정 기반 압력분포 예측
              </h2>
              <p style={{lineHeight: '2'}}>
                STACK은 Mass Balance 기반의 압력 예측 알고리즘을 활용하여, 건물 내부의
                중성대(NPL: Neutral Pressure Level) 위치를 산정하고, 이에 따른 수직 압력 구배 및
                연돌 유도 기류 흐름을 예측합니다.<br/>

                <span className='mt-4 block'></span>
                STACK은 일반적인 기류 해석 도구(예: Airflow Network Model, CONTAM)와 달리,
                복잡한 모델링 과정이나 상세 입력값 없이도 사용 가능합니다. 건축 계획 정보만을
                바탕으로 간단한 입력만으로도 개략적인 성능 예측과 평가가 가능하며, 별도의
                모델링이나 존(Zonal) 구성 없이 결과를 도출할 수 있습니다.<br/>

                <span className='mt-4 block'></span>
                또한, 결과 해석 과정도 자동화되어 사용자 친화적인 출력 데이터를 제공하므로,
                설계 초기 단계나 대안 비교 분석에 효과적으로 활용될 수 있습니다.
              </p>
            </section>
            <section className='flex-1'
              style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1rem' }}>
              <h2 className='text-center mb-6'
                style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                (문제/해결방안)
              </h2>
              <p style={{lineHeight: '2'}}>
                STACK은 Mass Balance 기반의 압력 예측 알고리즘을 활용하여, 건물 내부의
                중성대(NPL: Neutral Pressure Level) 위치를 산정하고, 이에 따른 수직 압력 구배 및
                연돌 유도 기류 흐름을 예측합니다.<br/>

                <span className='mt-4 block'></span>
                STACK은 일반적인 기류 해석 도구(예: Airflow Network Model, CONTAM)와 달리,
                복잡한 모델링 과정이나 상세 입력값 없이도 사용 가능합니다. 건축 계획 정보만을
                바탕으로 간단한 입력만으로도 개략적인 성능 예측과 평가가 가능하며, 별도의
                모델링이나 존(Zonal) 구성 없이 결과를 도출할 수 있습니다. 또한, 결과 해석 과정도
                자동화되어 사용자 친화적인 출력 데이터를 제공하므로, 설계 초기 단계나 대안 비교
                분석에 효과적으로 활용될 수 있습니다.
              </p>
            </section>
          </div> */}

          <section className="about-wrap transparent">
            <ul>
              <li>
                Jo, J. H., Lim, J. H., Song, S. Y., Yeo, M. S., & Kim, K. W. (2007). Characteristics of
                pressure distribution and solution to the problems caused by stack effect in high-rise
                residential buildings. Building and Environment, 42(1), 263-277.
              </li>
              <li>
                Jo, J. H., Seok, H. T., Yeo, M. S., & Kim, K. W. (2009). Simplified prediction method of
                stack-induced pressure distribution in high-rise residential buildings. Journal of Asian
                Architecture and Building Engineering, 8(1), 283-290.
              </li>
              <li>
                Lee, D. S., Ji, K. H., Jing, J., & Jo, J. H. (2022). Experimental study on elevator door
                reopening problems caused by stack induced pressure differences across the elevator door
                in buildings. Building and Environment, 221, 109271.
              </li>
              <li>
                Park, S. Y., Lee, D. S., Ji, K. H., & Jo, J. H. (2023). Simplified model for estimating
                the neutral pressure level in the elevator shaft of a building. Journal of Building
                Engineering, 79, 107850.
              </li>
              <li>
                Jing, J., Ji, K. H., Yoon, S., & Jo, J. H. (2024). A novel method for evaluating stack
                pressure in real high-rise buildings: Optimization of measurement points. Building and
                Environment, 259, 111661.
              </li>
              <li>
                Park, S. Y., Choi, S. J., Lee, D. S., & Jo, J. H. (2025). Assessing stack-induced
                infiltration loads by predicting neutral pressure levels in high-rise buildings. In
                Building Simulation, 18(5), 999-1017.
              </li>
            </ul>
          </section>

          <div className="flex justify-center pb-20">
            <a className="btn-primary btn-50 w-1/3 flex-row-center rounded-xl" href="/evaluation">
              연돌현상 평가하기
            </a>
          </div>
        </div>
      </section>

      {/* Section - SERVICES */}
      <section className="section-wide">
        <div className="services-container">
          <h2>Stack Effect Engineering Process</h2>

          <div className="image-wrap">
            <Image src={ExImgDiagram2} alt="샘플이미지2" />
          </div>

          <p className="my-10">
            연돌현상(Stack effect, Chimney effect)은 실내외 공기 밀도 차로 인해 발생하는 자연적인
            공기 흐름 현상입니다. 건물 내부와 외부의 온도 차로 인해 공기 기둥 사이에 압력 차가
            형성되며, 특히 수직 경로를 따라 공기가 이동하게 됩니다.
            <br />
            이로 인해 도어 개폐 불량, 공기 역류에 따른 에너지 손실, 승강기 샤프트 내 연기 확산, 불쾌
            기류 및 소음 유입 등 기능적·환경적 문제가 유발될 수 있습니다.
            <br />
            이러한 문제는 단일 운영 단계의 조치로는 효과적으로 제어되기 어렵기 때문에, 연돌현상의
            영향을 설계에서부터 체계적으로 예측하고 대응하는 접근이 요구됩니다.
            <br />
            이를 위해 구축된 대응 체계가 ‘연돌효과 통합 엔지니어링(Stack Effect Integrated
            Engineering)’이며, 설계–시공–운영의 각 단계에서 연돌 리스크를 평가, 제어, 진단하는
            일관된 기술 전략을 제공합니다.
          </p>

          <div className="flex-row-center gap-4">
            <a className="btn-primary btn-50 w-1/4 flex-row-center" href="/service-request">
              STACK 엔지니어링 서비스 요청
            </a>
            <a
              className="btn-secondary btn-50 w-1/4 flex-row-center"
              href="https://btairtech.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              연돌효과 통합 엔지니어링
              <Image
                src={TargetBlank}
                alt="연돌효과 통합 엔지니어링 바로가기기"
                width={20}
                height={20}
                className="ml-1 mt-0.5"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
