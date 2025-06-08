import React from 'react';
import { FaFileAlt, FaDraftingCompass, FaChartBar } from 'react-icons/fa';

const plans = [
  {
    key: 'basic',
    level: 'BASIC',
    subTitle: '실시간 결과 확인',
    title: '연돌현상 예측평가',
    subText: '건축계획을 기반으로 연돌현상이 건물에 미치는 영향을 평가하고, 개선안에 관한 방향을 제공합니다.\n건물 공기유동 전문가가 연돌효과 평가 결과를 검토하여 개선안에 필요한 데이터를 제공합니다.',
    free: {
      label: '연돌현상 평가하기 (무료서비스)',
      desc: [
        '연돌현상 영향도',
        '주요층 압력차 및 문제발생비율',
        '개선방향 목록',
      ],
    },
    request: {
      label: '서비스 요청하기 (1~2일 소요)',
      desc: [
        '개선안 리스트',
        '개선안에 따른 저감효과',
        '전문가 검토 의견',
      ],
    },
    sample: [
      { icon: <FaFileAlt />, label: '검토결과 보고서', strong: true },
      { icon: <FaDraftingCompass />, label: '개선안 설계도면', strong: false },
      { icon: <FaChartBar />, label: '시뮬레이션 분석결과', strong: false },
    ],
  },
  {
    key: 'pro',
    level: 'PROFESSIONAL',
    subTitle: '개선안 도면 지원',
    title: '연돌현상 설계검토',
    subText: '건축/설비도면 검토를 통해 맞춤형 해결방안을 마련하고,\n적용가능성을 고려하여 개선안 도면을 제공합니다.',
    request: {
      label: '서비스 요청하기 (1~2주)',
      desc: [
        '개선안 상세 데이터',
        '기밀화 구획도',
        '개선안에 관한 상세 도면',
      ],
    },
    sample: [
      { icon: <FaFileAlt />, label: '검토결과 보고서', strong: true },
      { icon: <FaDraftingCompass />, label: '개선안 설계도면', strong: true },
      { icon: <FaChartBar />, label: '시뮬레이션 분석결과', strong: false },
    ],
  },
  {
    key: 'plus',
    level: 'PROFESSIONAL PLUS',
    subTitle: '정밀 시뮬레이션 분석',
    title: '연돌현상 시뮬레이션',
    subText: '공기유동 시뮬레이션 기반 연돌효과를 정밀 분석하여\n층별/존별 데이터 및 관리 요소를 제공합니다.',
    request: {
      label: '서비스 요청하기 (2~3주)',
      desc: [
        '개선안 우선순위 평가',
        '케이스별 저감효과 비교분석',
        '시뮬레이션을 통한 연돌효과 정밀 분석',
      ],
    },
    sample: [
      { icon: <FaFileAlt />, label: '검토결과 보고서', strong: true },
      { icon: <FaDraftingCompass />, label: '개선안 설계도면', strong: true },
      { icon: <FaChartBar />, label: '시뮬레이션 분석결과', strong: true },
    ],
  },
];

export default function PlanTiers() {
  return (
    <div className="plan-tiers-wrap flex items-stretch justify-center w-full mb-16 relative"
      style={{marginTop: '0 !important'}}
    >
      {plans.map((plan, idx) => (
        <div
          key={plan.key}
          className={`plan-card plan-card-${plan.key} ${idx === 2 ? 'plan-card-last' : ''}`} style={{ marginLeft: idx === 0 ? 0 : -65, zIndex: 100 - idx } }
        >
          <div className={`plan-level plan-level-${plan.key} mb-2`}>{plan.level}</div>
          <div className="plan-subtitle text-sm font-semibold text-blue-600 mb-2">{plan.subTitle}</div>
          <div className="plan-title text-2xl font-bold mb-3">{plan.title}</div>
          <div className="plan-desc text-gray-600 text-sm whitespace-pre-line">{plan.subText}</div>

          {/* 무료/요청 버튼 및 설명 */}
          {plan.free && (
            <div className="w-full mb-6">
              <ul className="plan-checklist text-xs text-gray-700 mb-4 pl-4">
                {plan.free.desc.map((txt, i) => (
                  <li key={i} className='check'>{txt}</li>
                ))}
              </ul>
              <button className="plan-btn-free w-full py-2 rounded bg-gray-100 text-blue-700 font-semibold border border-blue-200 mb-2">{plan.free.label}</button>
            </div>
          )}
          <div className="w-full mb-6">
            <ul className="plan-checklist text-xs text-gray-700 mb-4 pl-4">
              {plan.request.desc.map((txt, i) => (
                <li key={i} className='plus'>{txt}</li>
              ))}
            </ul>
            <button className="plan-btn-request w-full py-2 rounded bg-blue-600 text-white font-semibold mb-2">{plan.request.label}</button>
          </div>

          {/* 결과물 샘플 다운로드 */}
          <div className="plan-sample-wrap w-full mt-auto">
            <div className="flex items-center justify-center gap-4 mt-2 mb-6">
              {plan.sample.map((s) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center text-xs text-center ${s.strong ? 'text-blue-700 font-bold' : 'text-gray-400 opacity-50'}`}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div>{s.label}</div>
                </div>
              ))}
            </div>
            <button className="plan-sample-btn w-full py-2 rounded bg-gray-50 border border-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2 mb-2">
              결과물 샘플 다운로드
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
