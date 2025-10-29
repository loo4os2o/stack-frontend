'use client';
import React, { useState } from 'react';
import '@/css/projects.css';
import Image from 'next/image';
import pdfFileIcon from '@/assets/icons/icon-pdf.png';
import ExImgIntro2 from '@/assets/images/12_stackeffect _002.png';
import ExImgIntro4 from '@/assets/images/12_stackeffect _001.jpg';
import accMinus from '@/assets/icons/icon-minus.png';
import accPlus from '@/assets/icons/icon-plus.png';

const accordionData = [
  {
    title: '연돌현상이란?',
    content: (
      <>
        <div className="intro-row">
          <div
            className="image-wrap"
            style={{ borderRadius: '0.375rem', maxWidth: '258px' }}
          >
            <Image src={ExImgIntro4} alt={'이미지 영역'} />
          </div>
          <div className="intro-text flex-1">
            연돌현상(Stack effect, Chimney effect)은 실내외 공기 밀도 차로 인해 발생하는 자연적인
            공기 흐름 현상이다.
            <br />
            이 현상은 건물 내부와 외부의 온도 차로 인해 공기 기둥 사이에 압력 차가 형성되며, 특히
            수직 경로를 따라 공기가 이동하게 된다.
            <br />
            건물 내부가 외기보다 따뜻한 겨울철에는, 실내 공기가 상승하고 외기가 하층부로 유입된다.
            <br />
            이때 형성되는 상승 기류가 연돌효과이며, 반대로 여름철에는 내부가 외기보다 시원하여 하강
            기류가 발생하는데, 이를 역연돌효과(Reverse Stack Effect)라 한다.
          </div>
        </div>
        <hr />

        <div className="intro-text">
          <h4>연돌현상의 주요 발생 요인</h4>
          <h5>
            <span>1</span> 실내외 온도차
          </h5>
          <ul>
            건물 내부와 외부의 온도 차이로 인해 압력차가 형성되며, 이는 연돌현상의 직접적인 원동력이
            된다.
            <li>
              온도차가 클수록 공기 밀도차도 커지므로, 연돌현상에 따른 기류 속도와 압력차가 증가한다.
            </li>
            <li>
              겨울철에는 외부 공기가 차고 내부는 난방으로 인해 따뜻하므로, 저층부에서 찬 공기가
              유입되고 수직 통로를 따라 따뜻한 공기가 상승하여 상층부로 빠져나간다.
            </li>
            <li>
              반대로 여름철에는 실내가 상대적으로 시원하고 외부가 더울 경우, 상층부에서 외부 공기가
              유입되어 하층부로 하강하는 기류가 형성된다.
            </li>
          </ul>

          <h5 className="mt-4">
            <span>2</span> 수직 높이
          </h5>
          <ul>
            연돌현상의 강도는 수직 통로의 높이에 비례한다.
            <li>
              수직 높이가 클수록 공기기둥의 밀도 차이에서 비롯된 부력이 커지며, 이에 따라 압력차도
              커진다.
            </li>
            <li>
              고층건물에서는 층별 용도구분, 승객동선편의 등을 위해 엘리베이터 샤프트 구성 방식이
              다양화되어 있다. 이로 인해 건물 내부의 연돌기류가 복잡해지고, 예측 및 해석이
              어려워지는 경향이 있다.
            </li>
          </ul>

          <h5 className="mt-4">
            <span>3</span> 중성대(NPL, Neutral Pressure Level)
          </h5>
          <ul>
            중성대는 건물 내외부의 압력이 같아지는 수직 위치를 의미한다.
            <li>연돌에 의해 발생하는 압력차는 중성대로부터의 상대적인 거리에 따라 결정된다.</li>
            <li>
              중성대는 연돌기류의 방향과 유속 분포를 판단하는 기준점이 된다. 그러나, 건축계획에 따라
              건물마다 다른 위치에 존재하며 두 지점 이상 존재하기도하여 그 해석이 복잡하다.
            </li>
          </ul>

          <p className="mt-8">
            본 프로그램은 질량 보존법칙(mass balance) 기반의 중성대 위치 추정 알고리즘을 사용하여,
            건물 내 연돌에 의한 압력 분포를 평가한다.
            <br />
            이를 통해 연돌현상의 영향 정도와 대응 방안을 설계 초기 단계에서 사전에 검토할 수 있도록
            지원한다.
          </p>
        </div>
      </>
    ),
  },
  {
    title: '연돌현상이 건물에 미치는 영향',
    content: (
      <>
        <div className="intro-text">
          <p>
            건물은 외부와 완전히 차단되어 있지 않기 때문에, 연돌현상에 의해 실외 공기가 실내로
            침입(침기)하거나 내부 공기가 유출(누기)되는 공기흐름이 발생한다.
            <br />
            또한, 겨울철과 같이 실내외 온도차가 클 경우, 35층 고층건물 기준으로 최대 130 Pa 이상의
            연돌압력이 발생할 수 있다.
            <br />
            이와 같은 압력차를 고려하지 않은 계획은 에너지 낭비, 쾌적성 저하, 시스템 오작동, 피난
            지연 등 다양한 문제를 유발한다.
            <br />
          </p>
        </div>
        <hr />

        <div className="intro-text">
          <h5>
            <span>1</span> 계획·설계단계 - 사전예측이 핵심
          </h5>
          <ul>
            연돌현상은 계절에 따라 의도하지 않은 외기의 유입을 유발하며, 실내 온도 유지를 위한
            냉·난방 부하를 증가시킨다. 이로 인해 전체 에너지 소비가 증가한다.
            <br />
            고층 건물의 경우 층별로 압력 분포가 달라져 공조 및 환기 시스템 제어가 복잡해지며, 구역
            간 부하 불균형이 발생한다.
          </ul>

          <h5 className="mt-4">
            <span>2</span> 재실자 쾌적성 저하 (열환경, 실내공기질, 소음)
          </h5>
          <ul>
            연돌현상에 의해 유입된 찬 공기는 창호 주변에서 복사냉감(radiant discomfort)을 유발하고,
            이는 재실자의 열쾌적성을 저하시킨다.
            <br />
            사용자는 이를 보완하기 위해 난방 온도를 과도하게 설정하게 되며, 결과적으로 에너지
            사용량이 증가한다.
            <br />
            또한, 압력차에 의해 형성된 기류는 오염물질, 병원성 미생물, 바이러스의 수송 경로가 된다.
            병원, 요양시설 등 민감한 환경에서는 교차오염 및 2차 감염의 위험을 높인다.
            <br />
            기류가 도어 틈을 통과할 때 발생하는 고주파 소음(whistling, whooshing)은 재실자의 음향
            쾌적성에 악영향을 준다.
            <br />
            특히 엘리베이터 도어에서 35 Pa 이상의 압력차가 작용할 경우, 50 dB(A)를 초과하는 소음이
            발생하며, 이는 ASHRAE 권장 기준인 NC 40을 상회한다.
          </ul>

          <h5 className="mt-4">
            <span>3</span> 화재 시 피난 안전 저해
          </h5>
          <ul>
            과도한 연돌압력은 출입문에 열림·닫힘 저항력을 유발하며, 화재 시 피난 경로의 장애 요인이
            된다.
            <br />
            계단실, 세대 현관, 옥상 출입문 등에서 도어가 열리지 않거나 스스로 닫히는 현상이 발생할
            수 있다.
            <br />
            이는 피난 지연과 인명 피해로 이어질 수 있다.
            <br />
            또한, 연돌기류는 연기를 고속으로 수직 확산시키며, 제연 시스템의 성능을 저하시킨다. 이로
            인해 방화구획 유지가 어려워지고, 대피 가능 시간이 단축된다.
          </ul>
        </div>
      </>
    ),
  },
  {
    title: '왜 연돌현상을 평가해야 합니까?',
    content: (
      <>
        <div className="intro-text">
          <h4 className="no-marker">1. 연돌현상은 건물 내 공기 유동의 핵심 구동력임</h4>
          <ul>
            건물 내외부의 압력차는 주로 세 가지 요인에 의해 발생한다.
            <li>실내외 공기 밀도 차이 (연돌현상)</li>
            <li>풍압 (바람)</li>
            <li>기계설비 시스템 (기계환기, 기압제연 등)</li>
          </ul>
          <ul className="mt-2 mb-10">
            풍압은 난류에 의해 시시각각 변화하며, 순간적으로 큰 압력을 유도할 수 있으나 지속시간이
            짧다.
            <br />
            기계 시스템은 실내 쾌적성 유지 목적의 정밀 제어를 전제로 하며, 상대적으로 낮은 압력차를
            유도한다.
            <br />
            연돌효과는 기온차가 유지되는 동안 지속적으로 작용하며, 특히 겨울철, 실내외 온도차가 30
            °C 이상일 경우, 연돌효과가 전체 압력차의 70% 이상을 차지할 수 있다.
          </ul>

          <div className="image-wrap m-auto pb-4" 
            style={{ maxWidth: '640px', maxHeight: '319px' }}>
            <Image src={ExImgIntro2} alt={'이미지 영역'} />
          </div>
          <hr />

          <h4 className="no-marker">2. 연돌현상에 의한 문제 대응</h4>
          <ul>
            연돌현상은 자연 현상이지만, 잠재적인 문제를 최소화하기 위해 건물의 압력분포를 파악하고
            대응 전략을 수립하는 것이 필수적이다.
            <br />
            준공 이후에는 구조적 대응이 거의 불가능하거나 막대한 비용에 비해 효과를 기대하기 어렵다.
            <br />
            또한 대응책을 구현하기 위한 품질확보도 진행되어야 한다. 
          </ul>

          <ul>
            <h5 className="mt-4">
              <span>1</span> 계획·설계단계 - 사전예측이 핵심
            </h5>
            <p className="marker">구조/계획적 결정이 연돌 발생 조건을 좌우함</p>
            <ul>
              <li className="no-marker">
                연돌효과는 실내외 온도차, 공기밀도차, 샤프트 계획, 외치 기밀성 등 환경/건축적 요소의
                복합 결과로 발생함.
              </li>
              <li className="no-marker">
                대부분 설계 도면에서 결정되므로, 사전 시뮬레이션 없이 설계되면 문제 유발 가능성이
                매우 높음.
              </li>
            </ul>

            <p className="marker mt-2">
              이후 단계에서의 구조적 수정은 현실적으로 불가능하거나 고비용
            </p>
            <ul>
              <li className="no-marker">
                예를 들어, 엘리베이터 샤프트 위치나 복도 구획 등 설계 단계에서는 쉽게 반영
                가능하지만, 준공 이후에는 막대한 공사비와 운영 중단이 필요함.
              </li>
            </ul>

            <h5 className="mt-4">
              <span>2</span> 시공 단계 - 설계 의도 실현 및 품질 확보
            </h5>
            <p className="marker">설계된 성능을 확보하기 위한 기밀시공은 시공 품질에 좌우됨</p>
            <ul>
              <li className="no-marker">
                도어 틈새, 샤프트 개구부, 마감재 접합부 등은 작은 시공 불량도 압력차 분포에 큰
                영향을 미침.
              </li>
              <li className="no-marker">
                설계된 대응조건이 실제 구현되는지 샘플링 진단, 누기부위 검토 등 품질검증 절차가
                병행되어야 함.
              </li>
            </ul>
            <p className="marker mt-2">기밀 품질 확보 실패 시, 설계된 성능은 무력화됨</p>
            <ul>
              <li className="no-marker">
                예: 잘 설계된 이중출입구(Vestibule)라도 틈새 누설이 심할 경우 외기유입은 그대로
                발생함.
              </li>
            </ul>

            <h5 className="mt-4">
              <span>3</span> 준공후/운영단계- 지속적 진단·관리체계가 필요함
            </h5>
            <p className="marker">계절 변화, 외기 조건 변화에 따라 연돌 현상이 달라짐</p>
            <ul>
              <li className="no-marker">
                특히 겨울철과 환절기에는 연돌로 인한 도어 개폐 불량, 기류 소음, 냉난방 불균형이
                반복적으로 발생할 수 있음.
              </li>
            </ul>

            <p className="marker mt-2">주기적 진단과 feedback을 통한 문제 예방이 필요</p>
            <ul>
              <li className="no-marker">
                연돌현상은 복합적 요소에 의해 발생하므로, 모니터링 데이터 기반의 대응 체계가 중요함.
              </li>
            </ul>
          </ul>
        </div>
      </>
    ),
  },
];

const techDocs = [
  {
    title: 'Sed convallis scelerisque enim at fermentum',
    url: '#',
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    url: '#',
  },
  {
    title: 'Stack Effect in High-Rise Buildings: A Review of Causes and Solutions',
    url: '#',
  },
  {
    title: '연돌현상 관련 최신 연구 동향 및 사례 분석 / 연돌현상 관련 최신 연구 동향 및 사례 분석',
    url: '#',
  },
  {
    title: 'Chimney Effect and Fire Safety in Modern Architecture',
    url: '#',
  },
];

export default function IntroPage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <div className="container mx-auto pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-5">연돌현상 소개</h1>

      <div className="flex flex-col gap-2 mb-8">
        {accordionData.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div key={idx} className="border-b intro-acc">
              <button
                className="w-full flex items-center justify-between py-6 focus:outline-none"
                onClick={() => {
                  if (isOpen) {
                    setOpenIndexes(openIndexes.filter((i) => i !== idx));
                  } else {
                    setOpenIndexes([...openIndexes, idx]);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    {isOpen ? (
                      <Image
                        src={accMinus}
                        alt="펼쳐진 상태 마이너스 아이콘"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image src={accPlus} alt="접힌 상태 플러스 아이콘" width={24} height={24} />
                    )}
                  </span>
                  <span className="font-semibold text-lg text-left">{item.title}</span>
                </div>
              </button>
              {isOpen && <div className="intro">{item.content}</div>}
            </div>
          );
        })}
      </div>

      {/* 기술자료 게시판 */}
      <div className="board-wrap">
        <h2>기술자료</h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2">
          {techDocs.map((doc, i) => (
            <a
              key={i}
              href={doc.url}
              className="board-item"
              // target="_blank"
              target="_self"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <Image src={pdfFileIcon} alt={'pdf 다운로드'} className="icon-img-40" />
                <span
                  className="text-ellipsis-2line"
                  style={{
                    maxWidth: 'calc(100% - 40px)',
                  }}
                >
                  {doc.title}
                </span>
              </div>
              <button className="btn-secondary mt-7 ml-auto">다운로드</button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
