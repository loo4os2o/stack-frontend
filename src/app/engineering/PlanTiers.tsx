import React from 'react';
import Image from 'next/image';
import IconDocumentOn from '@/assets/icons/icon-doc-on.png';
import IconDocumentOff from '@/assets/icons/icon-doc-off.png';

const plans = [
  {
    key: 'basic',
    level: 'BASIC',
    subTitle: '실시간 결과 확인',
    title: '연돌현상 예측평가',
    subText: '건축계획을 기반으로 연돌현상이 건물에 미치는 영향을 평가하고, 개선안에 관한 방향을 제공합니다.',
    button: '연돌현상 평가하기',
    features: [
      '연돌현상 영향도',
      '주요층 압력차 및 문제 발생층',
      '개선방향 목록',
    ],
    sample: [],
  },
  {
    key: 'plus',
    level: 'PLUS',
    subTitle: '실시간 결과 확인',
    title: '연돌현상 예측평가 PLUS',
    subText: '건물 공기유동 전문가가 연돌효과 평가 결과를 검토하여 개선안에 필요한 데이터를 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '주요층 압력차 및 문제 발생층',
      '개선방향 목록',
      '개선안 리스트',
      '개선안에 따른 저감효과',
      '전문가 검토 의견',
    ],
    duration: '서비스 완료까지 1-2일 소요',
    sample: [
      { icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />, label: '검토결과 보고서', strong: true },
      { icon: <Image src={IconDocumentOff} alt="개선안 설계도면" />, label: '개선안 설계도면', strong: false },
      { icon: <Image src={IconDocumentOff} alt="시뮬레이션 분석결과" />, label: '시뮬레이션 분석결과', strong: false },
    ],
  },
  {
    key: 'advanced',
    level: 'ADVANCED',
    subTitle: '개선안 도면 지원',
    title: '연돌현상 설계검토',
    subText: '건축/설비도면 검토를 통해 맞춤형 해결방안을 마련하고, 적용가능성을 고려하여 개선안 도면을 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '주요층 압력차 및 문제 발생층',
      '개선방향 목록',
      '개선안 리스트',
      '개선안에 따른 저감효과',
      '전문가 검토 의견',
      '개선안 상세 데이터',
      '기밀화 구획도',
      '개선안에 관한 상세 도면',
    ],
    duration: '서비스 완료까지 1-2주 소요',
    sample: [
      { icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />, label: '검토결과 보고서', strong: true },
      { icon: <Image src={IconDocumentOn} alt="개선안 설계도면" />, label: '개선안 설계도면', strong: true },
      { icon: <Image src={IconDocumentOff} alt="시뮬레이션 분석결과" />, label: '시뮬레이션 분석결과', strong: false },
    ],
  },
  {
    key: 'professional',
    level: 'PROFESSIONAL',
    subTitle: '정밀 시뮬레이션 분석',
    title: '연돌현상 시뮬레이션',
    subText: '공기유동 시뮬레이션 기반 연돌효과를 정밀 분석하여\n층별/존별 데이터 및 관리 요소를 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '주요층 압력차 및 문제 발생층',
      '개선방향 목록',
      '개선안 리스트',
      '개선안에 따른 저감효과',
      '전문가 검토 의견',
      '개선안 상세 데이터',
      '기밀화 구획도',
      '개선안에 관한 상세 도면',
      '개선안 우선순위 평가',
      '케이스별 저감효과 비교분석',
      '시뮬레이션을 통한 연돌효과 정밀 분석',
    ],
    duration: '서비스 완료까지 2-3주 소요',
    sample: [
      { icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />, label: '검토결과 보고서', strong: true },
      { icon: <Image src={IconDocumentOn} alt="개선안 설계도면" />, label: '개선안 설계도면', strong: true },
      { icon: <Image src={IconDocumentOn} alt="시뮬레이션 분석결과" />, label: '시뮬레이션 분석결과', strong: true },
    ],
  },
];

export default function PlanTiers() {
  return (
    <div className="plan-tiers-wrap grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-5">
      {plans.map((plan, idx) => (
        <div
          key={plan.key}
          className={`plan-card plan-card-${plan.key}`}
        >
          <div className={`plan-level`}>{plan.level}</div>
          <div className="plan-subtitle">{plan.subTitle}</div>
          <div className="plan-title">{plan.title}</div>
          <div className="plan-desc">{plan.subText}</div>

          <div className="w-full">
            <a 
              href={plan.button === '연돌현상 평가하기' ? '/evaluation' : '/service-request'}
              className={`w-full rounded-xl btn-50 flex-row-center
              ${plan.button === '연돌현상 평가하기' ? 'btn-free' : 'btn-primary'} `}>
                {plan.button}</a>
          </div>

          {/* 기능 목록 */}
          <div className="w-full mb-6">
            <ul className="plan-checklist">
              {plan.features.map((feature, i) => (
                <li key={i} className="check">
                  {feature}
                </li>
              ))}
            </ul>

            {plan.duration && <h4 className="plan-duration">{plan.duration}</h4>}


          </div>

          {/* 결과물 샘플 다운로드 */}
          <div className="plan-sample-wrap w-full mt-auto">
            <div className="flex flex-col gap-2 mb-5">
              {plan.sample.map((s) => (
                <div
                  key={s.label}
                  className={`plan-sample
                    ${s.strong === false ? 'false' : ''}`}
                >
                  <div>{s.icon}</div>
                  <div>{s.label}</div>
                </div>
              ))}
            </div>
            <button className="btn-normal btn-50 w-full rounded-xl">
              결과물 샘플 다운로드
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
