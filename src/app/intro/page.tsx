"use client";
import React, { useState } from "react";
import '@/css/projects.css'
import Image from 'next/image';
import { FaBookOpen } from "react-icons/fa";
import pdfFileIcon from '@/assets/icons/icon-pdf.png';
import ExImgIntro1 from "@/assets/images/ex/sample-intro-1.png";
import ExImgIntro2 from "@/assets/images/ex/sample-intro-2.png";
import ExImgIntro3 from "@/assets/images/ex/sample-intro-3.png";

const accordionData = [
  {
    title: "연돌현상이란?",
    content: (
      <div className="flex flex-col gap-10 md:flex-col lg:gap-0 intro">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-16">
          <div className="intro-text flex-1">
            연돌현상(Stack effect, Chimney effect)은 실내외 공기 밀도 차로 인해 
            발생하는 자연적인 공기 흐름 현상이다.<br/>

            이 현상은 건물 내부와 외부의 온도 차로 인해 공기 기둥 사이에 압력 차가 형성되며, 
            특히 수직 경로를 따라 공기가 이동하게 된다.<br/>

            건물 내부가 외기보다 따뜻한 겨울철에는, 실내 공기가 상승하고 외기가 하층부로 
            유입된다. 이때 형성되는 상승 기류가 연돌효과이며,<br/>

            반대로 여름철에는 내부가 외기보다 시원하여 하강 기류가 발생하는데, 
            이를 역연돌효과(Reverse Stack Effect)라 한다.
          </div>
          <div className="image-wrap rounded-lg overflow-hidden flex-1">
            <Image src={ExImgIntro1} alt={"이미지 영역"} 
              style={{height: '360px', objectFit: 'contain'}} />
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 lg:mb-10">
          <div className="flex-1 intro-text">
            건물에서의 압력 차는<br/>
            1) 실내외 공기 밀도 차(연돌현상),<br/>
            2) 바람,<br/>
            3) 기계 설비 시스템(환기 시스템, 가압 제연 설비)의 운전에 따라 유도된다.<br/>

            <span className="mt-4 block"></span>
            아래 그림(왼쪽)은 건물 외피에 작용하는 압력 차에 대하여 연돌효과, 바람, 
            기계 시스템의 중첩 효과에 대한 상대적인 크기를 표현한 것이다.
            (외기온: 5°C, 풍속: 4m/s)<br/>

            Ricketts et al.(2014)는 건물에서 세 구동력에 의하여 발생한 압력 차의 비율을 
            다루었다. 그림(오른쪽)은 외기 온도가 낮은 겨울철 벤쿠버 지역에서 건물 높이가 
            증가함에 따른 전체 압력 차에 대한 각 구동력의 압력 차 비율을 나타내었다.<br/>

            저층 건물에서는 바람과 기계 설비 시스템에 의한 압력 차가 우세하지만, 
            높이가 200m인 건물에서는 연돌효과로 인한 압력 차의 비율이 65%에 달했다.<br/>

            그러나 해당 연구는 실내외 온도 차 10°C의 기후대를 대상으로 하고 있으며, 
            국내와 같이 겨울철 실내외 온도 차가 30°C 이상인 경우 차지하는 비율은 더욱 
            증가할 것으로 판단된다.<br/>

            이처럼 고층 건물에서의 압력 차는 연돌효과에 의한 압력 차가 주된 영향을 끼치며, 
            건물의 공기 흐름을 이해하고 제어하기 위한 핵심 개념이다.
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="w-full flex-1 bg-gray-0 rounded flex items-center justify-center">
            <div className="image-wrap rounded-lg overflow-hidden">
              <Image src={ExImgIntro2} alt={"이미지 영역"} style={{objectFit: 'contain'}} />
            </div>
          </div>
          <div className="w-full flex-1 bg-gray-100 rounded flex items-center justify-center">
            <div className="image-wrap rounded-lg overflow-hidden">
              <Image src={ExImgIntro3} alt={"이미지 영역"} style={{objectFit: 'contain'}} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "연돌현상이 건물에 미치는 영향",
    content: (
      <div className="flex flex-col gap-10 md:flex-col md:gap-10 intro">
        <div className="flex-1 intro-text">
          연돌효과에의한 과도한 압력차 또는 이를 고려하지 않은 설비설계는 에너지 낭비, 
          재실자 불쾌, 기계설비 오작동, 피난 방해 등 다양한 문제를 유발한다.
        </div>
        <div className="flex-1 intro-text">
          <h4 className="text-md font-bold">에너지 및 HVAC 시스템 설계</h4>
          <span className="mt-4 block"></span>
          겨울철 또는 여름철 실내외 온도 차로 인해 발생한 압력 차는 건물 내부로의 
          의도하지 않은 외기 유입을 초래한다.<br/>

          이로 인해 실내 온도 유지에 추가적인 냉·난방 부하가 발생하며, 
          전체 에너지 소비가 증가한다.<br/>

          또한 고층 건물에서는 층마다 압력 차 분포가 달라지므로, 
          공조·환기 시스템 제어가 복잡해지고, 부하 불균형이 유발된다.<br/>

          Fine & Touchie(2021)는 고층 공동주택에서 복도 가압 방식을 
          포함한 6가지 HVAC 시스템을 분석하였으며, 외기 조건에 따라 외벽을 
          통한 유입·배출량이 최대 230%까지 증가할 수 있음을 제시하였다.<br/>

          이는 압력 차에 의한 외기 유입이 설비 성능에 미치는 영향이 크다는 사실을 의미한다.
        </div>
        <div className="flex-1 intro-text">
          <h4 className="text-md font-bold">재실자 쾌적 (열쾌적, 실내공기질 및 소음)</h4>
          <span className="mt-4 block"></span>
          냉난방 설정을 유지하더라도, 차가운 외기 유입에 의해 창호 주변 등 국소 부위에서 
          복사 냉감이 발생하며, 재실자의 쾌적성을 저하시킨다.<br/>

          이로 인해 사용자는 난방 설정 온도 증가를 야기하며, 결과적으로 에너지 사용량의 
          증가로 이어진다.<br/>

          또한 압력 차에 의한 기류는 오염물질, 병원성 미생물, 바이러스 등의 이동 경로를 
          형성하며, 병원과 같은 민감 시설에서는 2차 감염 위험을 증가시킨다.<br/>

          Lim et al.(2010)은 병동 배치 계획 시 건물 내부의 압력 분포를 고려하여 설계할 
          경우 감염 확산 위험을 줄일 수 있음을 밝혔다.<br/>

          압력 차는 소음 문제도 유발한다. 세대 현관문 또는 엘리베이터 도어의 틈을 통과하는 
          기류는 고주파 틈새 소음(whistling, whooshing)을 발생시킨다.<br/>

          엘리베이터 도어에 작용하는 압력 차가 35Pa를 초과할 경우 50dB(A) 이상의 소음이 
          발생하며, 이는 ASHRAE 권장 기준인 NC40을 상회하는 수준이다.
        </div>
        <div className="flex-1 intro-text">
          <h4 className="text-md font-bold">화재 및 피난 안전</h4>
          <span className="mt-4 block"></span>
          과도한 압력 차는 출입문의 개폐를 어렵게 만들며, 화재 시 재실자의
          피난에 심각한 영향을 미친다.<br/>

          계단실, 세대 현관, 옥상 출입문 등 피난 경로에 위치한 도어는 연돌 압력에 
          의해 닫히거나 열리지 않을 수 있으며, 이는 피난 시간 지연과 
          인명 피해로 이어질 수 있다.<br/>

          Hayakawa et al.(1988)은 현장 실험을 통해 사람이 수동으로 개폐할 
          수 있는 최대 도어 압력 차를 제시하였으며, 국내 소방법 및 EN12101-6, 
          ASHRAE 등은 피난 관련 도어에 대한 압력 차 기준을 명시하고 있다.<br/>

          또한 연돌효과는 화재 시 급격한 연기 확산을 유도한다. 상승 기류는 연기를 
          수직으로 고속 이동시키며, 제연 설비의 성능을 저하시킨다.<br/>

          방화 구획 유지가 어려워지고, 대피 가능 시간은 단축된다.
        </div>

        <div className="flex-1 flex flex-col gap-2 lg:flex-row">
          <div className="bg-gray-100 rounded flex items-center justify-center lg:flex-1" style={{height: '140px'}}>
            <span className="text-gray-400">다이어그램</span>
          </div>
          <div className="bg-gray-100 rounded flex items-center justify-center lg:flex-1" style={{height: '140px'}}>
            <span className="text-gray-400">다이어그램</span>
          </div>
          <div className="bg-gray-100 rounded flex items-center justify-center lg:flex-1" style={{height: '140px'}}>
            <span className="text-gray-400">다이어그램</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "왜 연돌현상을 평가해야 합니까?",
    content: (
      <div className="flex flex-col gap-10 md:flex-col md:gap-10 intro">
        <div className="flex-1 intro-text">
          건물의 계획 단계에서 압력 분포를 평가하는 것은 에너지, 
          HVAC 시스템 설계, 재실자 쾌적, 피난 안전 관점에서 중요하다.<br/>
          이에 따라 연돌효과로 인한 잠재적인 문제를 최소화하기 위해 건물의 
          압력 분포를 파악하고, 대응 전략을 수립하는 것이 필수적이다.
        </div>
        <div className="flex-1 intro-text">
          <h4 className="font-bold text-md mb-2">●&nbsp;&nbsp; 
            계획·설계 단계 - 사전 예측이 핵심
          </h4>
          <h5 className="font-bold"  
            style={{ paddingLeft: '1em', color: '#666' }}>
            ㆍ 구조/계획적 결정이 연돌 발생 조건을 좌우함
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            연돌효과는 실내외 온도 차, 공기 밀도 차, 샤프트 연속성, 외피 기밀성 등 
            환경/건축적 요소의 복합 결과로 발생함.<br/>
            대부분 설계 도면에서 결정되므로, 사전 시뮬레이션 없이 설계되면 문제 유발 
            가능성이 매우 높음.
          </div>
          <h5 className="font-bold" 
            style={{ paddingLeft: '1em', marginTop: '0.5em', color: '#666' }}>
            ㆍ 이후 단계에서의 구조적 수정은 현실적으로 불가능하거나 고비용
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            예를 들어, 엘리베이터 샤프트 위치나 복도 구획 등은 설계 단계에서는 
            쉽게 반영 가능하지만, 준공 이후에는 막대한 공사비와 운영 중단이 필요함.
          </div>
        </div>
        <div className="flex-1 intro-text">
          <h4 className="font-bold text-md mb-2">●&nbsp;&nbsp; 
            시공 단계 - 설계의도 실현 및 품질확보
          </h4>
          <h5 className="font-bold"  
            style={{ paddingLeft: '1em', color: '#666' }}>
            ㆍ 설계된 성능을 확보하기 위한 기밀 시공은 시공품질에 좌우됨
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            도어 틈새, 샤프트 개구부, 마감재 접합부 등은 작은 시공 불량도 압력 차 분포에 
            큰 영향을 미침.<br/>
            설계된 대응 조건이 실제 구현되는지 샘플링 진단, 누기 부위 검토 등 품질 검증 
            절차가 병행되어야 함.
          </div>
          <h5 className="font-bold" 
            style={{ paddingLeft: '1em', marginTop: '0.5em', color: '#666' }}>
            ㆍ 기밀 품질 확보 실패 시, 설계된 성능은 무력화됨
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            예: 잘 설계된 이중출입구(Vestibule)라도 
            틈새 누설이 심할 경우 외기유입은 그대로 발생함.
          </div>
        </div>
        <div className="flex-1 intro-text">
          <h4 className="font-bold text-md mb-2">●&nbsp;&nbsp; 
            준공후/운영단계 - 지속적 진단·관리체계가 필요함
          </h4>
          <h5 className="font-bold"  
            style={{ paddingLeft: '1em', color: '#666' }}>
            ㆍ 계절 변화, 외기 조건 변화에 따라 연돌 현상이 달라짐
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            특히 겨울철과 환절기에는 연돌로 인한 도어 개폐 불량, 기류 소음, 
            냉난방 불균형이 반복적으로 발생할 수 있음.
          </div>
          <h5 className="font-bold" 
            style={{ paddingLeft: '1em', marginTop: '0.5em', color: '#666' }}>
            ㆍ 주기적 진단과 feedback을 통한 문제 예방이 필요
          </h5>
          <div style={{ paddingLeft: '2.2em', color: '#444', marginTop: '0.2em' }}>
            연돌현상은 복합적 요소에 의해 발생하므로, 
            모니터링 데이터 기반의 대응 체계가 중요함.
          </div>
        </div>
      </div>
    ),
  },
];

const techDocs = [
  {
    title: "Sed convallis scelerisque enim at fermentum",
    url: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    url: "#",
  },
  {
    title: "Stack Effect in High-Rise Buildings: A Review of Causes and Solutions",
    url: "#",
  },
  {
    title: "연돌현상 관련 최신 연구 동향 및 사례 분석",
    url: "#",
  },
  {
    title: "Chimney Effect and Fire Safety in Modern Architecture",
    url: "#",
  },
];

export default function IntroPage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <div className="container mx-auto pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 소개</h1>

      <div className="bg-white rounded-lg shadow py-2 px-8 mb-12">
        {accordionData.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div key={idx} className="border-b intro-acc">
              <button
                className="w-full flex items-center justify-between py-6 focus:outline-none"
                onClick={() => {
                  if (isOpen) {
                    setOpenIndexes(openIndexes.filter(i => i !== idx));
                  } else {
                    setOpenIndexes([...openIndexes, idx]);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{isOpen ? '➖' : '➕'}</span>
                  <span className="font-semibold text-lg text-left">{item.title}</span>
                </div>
              </button>
              {isOpen && (
                <div className="pb-6 pt-0">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 기술자료 게시판 */}
      <div className="rounded-lg py-8 px-4 md:px-10" 
        style={{ background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' }}>
        <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-3">
          <FaBookOpen className="text-3xl mt-1" />기술자료
        </h2>
        <div className="bg-transparent rounded-lg divide-y overflow-hidden">
          {techDocs.map((doc, i) => (
            <a
              key={i}
              href={doc.url}
              className="flex items-center px-4 py-3 gap-4 group hover:bg-blue-200 transition duration-300"
              // target="_blank"
              target="_self"
              rel="noopener noreferrer"
            >
              <span className="truncate text-white text-base flex-1 group-hover:text-blue-700"
                style={{
                  maxWidth: 'calc(100% - 40px)',
                }}
              >
                {doc.title}
              </span>
              <Image src={pdfFileIcon} alt={"pdf 다운로드"} className="icon-img-40" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 