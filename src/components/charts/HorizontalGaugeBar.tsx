import React from 'react';
// 주요층 압력차
interface Props {
  value: number; // 퍼센트 값 (예: 149)
  className?: string;
  label?: string;
}

const HorizontalCriteriaBar: React.FC<Props> = ({ value, label, className = '' }) => {
  const fullBarWidth = 180;
  const cappedValue = Math.min(value, 200);
  const fillWidth = (cappedValue / 100) * fullBarWidth;
  const criteriaX = fullBarWidth; // 100% 위치
  const barHeight = 48;

  return (
    <div
      className={className}
      style={{
        width: fullBarWidth + 40,
        height: 'auto',
        paddingBottom: 30,
        position: 'relative',
        left: -120,
        // border: "1px solid red",
      }}
    >
      {/* 텍스트 라벨 */}
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
        {label === '최상층' ? '최상층: 145 - 150 Pa' : '로비층: 230 - 240 Pa'}
      </div>

      {/* Bar Wrapper */}
      <div
        style={{
          position: 'relative',
          height: barHeight,
          width: fullBarWidth,
          background: '#f5f5f5',
          margin: '0 auto',
        }}
      >
        {/* 0% 수직 회색선 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            top: -10,
            height: barHeight * 1.5,
            width: 2,
            backgroundColor: '#888',
            zIndex: 2,
          }}
        />

        {/* 100% 수직 dashed 기준선 */}
        <div
          style={{
            position: 'absolute',
            left: `${criteriaX}px`,
            bottom: 0,
            height: barHeight,
            width: 0,
            borderLeft: '2px dashed #111111',
            zIndex: 2,
          }}
        />

        {/* 채워진 영역 */}
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: fillWidth,
            background:
              value <= 100
                ? '#f4bcbc'
                : `linear-gradient(to right, #f4bcbc 0%, #f4bcbc ${criteriaX}px, #a32020 ${criteriaX}px, #a32020 ${fillWidth}px)`,
            transition: 'width 0.3s ease',
          }}
        />

        {/* 값 라벨 */}
        <div
          style={{
            position: 'absolute',
            left: fillWidth + 6,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a32020',
            fontWeight: 600,
          }}
        >
          {value}%
        </div>
      </div>

      {/* 기준선 라벨 */}
      <div
        style={{
          position: 'absolute',
          left: `${criteriaX + 20}px`,
          top: barHeight + 40,
          transform: 'translateX(-50%)',
          fontSize: 12,
          color: '#888',
        }}
      >
        Criteria
      </div>
    </div>
  );
};

export default HorizontalCriteriaBar;
