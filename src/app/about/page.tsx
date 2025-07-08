import React from 'react';

// import StackVennDiagram from './StackVennDiagram';
import '@/css/about.css';
import Image from 'next/image';
import ExImgDiagram0 from "@/assets/images/ex/sample-diagram-0.png";
import ExImgDiagram1 from "@/assets/images/ex/sample-diagram-1.png";
import ExImgDiagram2 from "@/assets/images/ex/sample-diagram-2.png";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1536, margin: '0 auto', padding: '4rem 2rem 0 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2.5rem' }}>
        About 
        <span style={{letterSpacing: '10px', marginLeft: '24px'}}>
          S
          <span className="font-orange">T</span>
          ACK
        </span>
      </h1>

      {/* <StackVennDiagram /> */}
      <div className='mb-12'
        style={{border: "1px solid #ddd",borderRadius: '1rem', padding: '2rem',
          background: "#fff"
        }}
      >
        <div className='image-wrap'>
          <Image src={ExImgDiagram0} alt="샘플이미지0" />
        </div>
      </div>


      <div className="flex gap-8">
        <section className='flex items-center justify-center flex-1' 
          style={{border: '1px solid #ddd', borderRadius: '1rem', padding: '2rem',
          background: 'linear-gradient(to left, #fff, #f0f0f0)', height: '100%'
        }}>
          <div className='image-wrap'>
            <Image src={ExImgDiagram1} alt="샘플이미지1" />
          </div>
        </section>
        <section className='flex items-center justify-center flex-1'
          style={{border: '1px solid #ddd', borderRadius: '1rem', padding: '2rem',
          background: 'linear-gradient(to right, #fff, #f0f0f0)', height: '100%'
        }}>
          <div className='image-wrap'>
            <Image src={ExImgDiagram1} alt="샘플이미지1" />
          </div>
        </section>
      </div>

      <div className='flex gap-8 mt-8'>
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
      </div>

      <div className='flex justify-center' 
        style={{maxWidth: '400px', margin: '3rem auto'}}>
        <a className="nav-btn-primary w-full text-center"
          href="/evaluation">연돌현상 평가하기</a>
      </div>

      <section className='mb-16'
        style={{borderRadius: '1rem', padding: '2rem', background: '#fff'}}>
        <p className='text-xs font-light'>
          Jo, J. H., Lim, J. H., Song, S. Y., Yeo, M. S., & Kim, K. W. (2007). Characteristics of pressure distribution and solution to the problems caused by stack effect in high-rise residential buildings.Building and Environment,42(1), 263-277.<br/>
          Park, S. Y., Lee, D. S., Ji, K. H., & Jo, J. H. (2023). Simplified model for estimating the neutral pressure level in the elevator shaft of a building. Journal of Building Engineering,79, 107850.<br/>
          Park, S. Y., Choi, S. J., Lee, D. S., & Jo, J. H. (2025, May). Assessing stack-induced infiltration loads by predicting neutral pressure levels in high-rise buildings. InBuilding Simulation(Vol. 18, No. 5, pp. 999-1017). Tsinghua University Press
        </p>
      </section>

      {/* Section - SERVICES */}
      <section className="section-wide">
        <div className="services-container">
          <div className="text-center mb-10">
            <h2 className="services-title">Building Stack Engineering Process</h2>
          </div>
          <p style={{lineHeight: '2'}}>
            연돌현상(Stack effect, Chimney effect)은 실내외 공기 밀도 차로 
            인해 발생하는 자연적인 공기 흐름 현상입니다. 건물 내부와 외부의 온도 차로 
            인해 공기 기둥 사이에 압력 차가 형성되며, 특히 수직 경로를 따라 공기가 
            이동하게 됩니다.<br/>

            이로 인해 도어 개폐 불량, 공기 역류에 따른 에너지 손실, 승강기 샤프트 내 연기 
            확산, 불쾌 기류 및 소음 유입 등 기능적·환경적 문제가 유발될 수 있습니다.<br/>

            이러한 문제는 단일 운영 단계의 조치로는 효과적으로 제어되기 어렵기 때문에, 
            연돌현상의 영향을 설계에서부터 체계적으로 예측하고 대응하는 접근이 요구됩니다.<br/>

            이를 위해 구축된 대응 체계가 ‘연돌효과 통합 엔지니어링(Stack Effect 
            Integrated Engineering)’이며, 설계–시공–운영의 각 단계에서 연돌 리스크를 
            평가, 제어, 진단하는 일관된 기술 전략을 제공합니다.
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '2.8', margin: '1rem 0' }}>
            <li className='font-bold'>연돌효과 영향평가</li>
            <li className='font-bold'>연돌효과 시공 품질 관리</li>
            <li className='font-bold'>연도효과 츨정 및 진당</li>
          </ul>
          <p style={{lineHeight: '2'}}>
            건물 연돌효과 엔지니어링의 전과정 / 본 프로그램의 Scope / 
            엔지니어링 서비스의 범위 등 연돌효과(Stack Effect, Chimney Effect)는 
            건물 내부와 외부의 온도 차이로 인해 발생하는 공기의 수직 방향 흐름을 의미한다. 
            이는 내부의 따뜻한 공기가 상부로 상승하고, 하부에는 외부의 차가운 공기가 
            유입되는 현상으로, 굴뚝에서 뜨거운 차이로 인해 발생하는 공기의 
            수직 방향 흐름을 의미한다. 
          </p>
          <div className='image-wrap my-12 rounded-2xl overflow-hidden'>
            <Image src={ExImgDiagram2} alt="샘플이미지2" />
          </div>
          <p style={{lineHeight: '2'}}>
            이중에서도 설계 단계에서의 사전 예측(Pre-simulation)은 연돌효과 대응 전략의 
            핵심입니다.<br/>

            STACK은 설계 초기 단계에서 제공된 건축 계획 정보를 기반으로, 건물 내 압력 
            구배와 중성대 위치를 도출하고, 연돌효과에 의한 문제 가능성을 
            정량적으로 평가합니다.<br/>

            이러한 사전 진단 결과는 도면 검토, 설계안 보완, 시뮬레이션 기반 개선 조치로 
            이어질 수 있으며, 이후 연돌효과 통합 엔지니어링 체계와 연계하여 시공 및 
            운영 단계 대응까지 확장 적용될 수 있습니다.
          </p>
          <h2 className='my-12'
            style={{ fontSize: '1.5rem', fontWeight: 'bold'}}>
            STACK은 설계단계에 특화된 압력예측 및 개선아이템 제안 도구이며,
            생애주기 전반을 아우르는 연돌 대응 전략의 출발점입니다.
          </h2>
        </div>
      </section>

    </div>
  );
}
