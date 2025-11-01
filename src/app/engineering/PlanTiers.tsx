import React from 'react';
import Image from 'next/image';
import IconDocumentOn from '@/assets/icons/icon-doc-on.png';
import IconDocumentOff from '@/assets/icons/icon-doc-off.png';

const plans = [
  {
    key: 'basic',
    level: (
      <span className="plan-level-stack">
        <span className="plan-level-stack-letter dark">S</span>
        <span className="plan-level-stack-letter accent">T</span>
        <span className="plan-level-stack-letter dark">A</span>
        <span className="plan-level-stack-letter dark">C</span>
        <span className="plan-level-stack-letter dark">K</span>
      </span>
    ),
    subTitle: '실시간 결과 확인',
    title: '연돌현상 예측평가',
    subText:
      '건축계획을 기반으로 연돌효과가 건물에 미치는 영향(연돌현상)을 평가하고, 개선방향을 제공합니다.',
    button: '연돌현상 평가하기',
    features: ['연돌현상 영향도', '압력분포 및 문제 수준', '개선방향 목록'],
    sample: [],
  },
  {
    key: 'plus',
    level: (
      <span className="plan-level-stack">
        <span className="plan-level-stack-letter dark">S</span>
        <span className="plan-level-stack-letter accent">T</span>
        <span className="plan-level-stack-letter dark">A</span>
        <span className="plan-level-stack-letter dark">C</span>
        <span className="plan-level-stack-letter dark">K</span>
      </span>
    ),
    subTitle: '전문가 검토',
    title: '연돌현상 예측평가 보고서',
    subText:
      '국내 최고 전문가의 진단과 개선 인사이트를 포함한 연돌현상 예측평가 보고서를 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '압력분포 및 문제 수준',
      '개선방향 목록',
      '+',
      '전문가 검토 의견',
    ],
    duration: '서비스 완료까지 1-2일 소요',
    sample: [
      {
        icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />,
        label: '검토결과 보고서',
        strong: true,
      },
      {
        icon: <Image src={IconDocumentOff} alt="개선안 설계도면" />,
        label: '개선안 설계도면',
        strong: false,
      },
      {
        icon: <Image src={IconDocumentOff} alt="시뮬레이션 분석결과" />,
        label: '시뮬레이션 분석결과',
        strong: false,
      },
    ],
  },
  {
    key: 'advanced',
    level: '엔지니어링 I',
    subTitle: '개선안 도면 지원',
    title: '연돌현상 설계검토',
    subText:
      '도면 검토 및 협의를 통해 상세 개선안을 도출하고, 기밀화 구획을 반영한 도면을 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '압력분포 및 문제 수준',
      '개선방향 목록',
      '+',
      '전문가 검토 의견',
      '+',
      '개선안 리스트',
      '개선안 적용 도면', '기밀화 구획도'

    ],
    duration: '서비스 완료까지 1-2주 소요',
    sample: [
      {
        icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />,
        label: '검토결과 보고서',
        strong: true,
      },
      {
        icon: <Image src={IconDocumentOn} alt="개선안 설계도면" />,
        label: '개선안 설계도면',
        strong: true,
      },
      {
        icon: <Image src={IconDocumentOff} alt="시뮬레이션 분석결과" />,
        label: '시뮬레이션 분석결과',
        strong: false,
      },
    ],
  },
  {
    key: 'professional',
    level: '엔지니어링 II',
    subTitle: '정밀 시뮬레이션 분석',
    title: '연돌현상 시뮬레이션',
    subText:
      '전체 건물 시뮬레이션을 통해 개선안의 저감수준을 분석하고 최종안 및 주요 성능 테이터를 제공합니다.',
    subText2:
      '공기유동 시뮬레이션 기반 연돌효과를 정밀 분석하여\n층별/존별 데이터 및 관리 요소를 제공합니다.',
    button: '서비스 요청하기',
    features: [
      '연돌현상 영향도',
      '입력분포 및 문제 수준',
      '개선방향 목록',
      '+',
      '전문가 검토 의견',
      '+',
      '개선안 리스트',
      '개선안 적용 도면', '기밀화 구획도',
      '+',
      '[기존안 vs 개선안] 시뮬레이션',
      '최종안 마련, 기밀화 구획도'
    ],
    duration: '서비스 완료까지 2-3주 소요',
    sample: [
      {
        icon: <Image src={IconDocumentOn} alt="검토결과 보고서" />,
        label: '검토결과 보고서',
        strong: true,
      },
      {
        icon: <Image src={IconDocumentOn} alt="개선안 설계도면" />,
        label: '개선안 설계도면',
        strong: true,
      },
      {
        icon: <Image src={IconDocumentOn} alt="시뮬레이션 분석결과" />,
        label: '시뮬레이션 분석결과',
        strong: true,
      },
    ],
  },
];

export default function PlanTiers() {
  return (
    <div className="plan-tiers-wrap grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-5">
      {plans.map((plan, idx) => (
        <div key={plan.key} className={`plan-card plan-card-${plan.key}`}>
          <div className={`plan-level`}>{plan.level}</div>
          <div className="plan-subtitle">{plan.subTitle}</div>
          <div className="plan-title">{plan.title}</div>
          <div className="plan-desc">{plan.subText}</div>

          <div className="w-full">
            <a
              href={plan.button === '연돌현상 평가하기' ? '/evaluation' : '/service-request'}
              className={`w-full rounded-xl btn-50 flex-row-center
              ${plan.button === '연돌현상 평가하기' ? 'btn-free' : 'btn-primary'} `}
            >
              {plan.button}
            </a>
          </div>

          {/* 기능 목록 */}
          <div className="w-full mb-6">
            <ul className="plan-checklist">
              {plan.features.map((feature, i) => {
                const isDivider = feature === '+';

                if (isDivider) {
                  return (
                    <li
                      key={`divider-${plan.key}-${i}`}
                      className="plan-feature-divider"
                      aria-hidden="true"
                    >
                      <span className="plan-feature-divider-icon">+</span>
                    </li>
                  );
                }

                return (
                  <li key={`feature-${plan.key}-${i}`} className="check">
                    {feature}
                  </li>
                );
              })}
            </ul>

          </div>

          {/* 결과물 샘플 다운로드 */}
          {plan.sample.length > 0 && (
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
              <button className="btn-normal btn-50 w-full rounded-xl">결과물 샘플 다운로드</button>
              {plan.duration && <h4 className="plan-duration mt-4">{plan.duration}</h4>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
