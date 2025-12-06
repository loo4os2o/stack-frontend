// app/components/HorizontalFillWithMarkers.tsx
'use client';

import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  fillValue: number; // 빨간 채움 값
  fillLabel?: string; // 채움 bullet 텍스트
  markerValue: number; // 수직 실선/마커 값
  markerLabel?: string; // 마커 bullet 텍스트
  max?: number; // 최대값 (기본 100)
  height?: number; // 전체 높이 (기본 60px)
  showTooltip?: boolean;
};

const TriangleDownWithText: React.FC<{
  cx?: number;
  cy?: number;
  size?: number;
  color?: string;
  text?: string;
  yOffset?: number; // 음수면 위로
}> = ({ cx = 0, cy = 0, size = 6, color = '#111827', text, yOffset = -12 }) => {
  const topY = cy + yOffset;
  const tipY = topY + size;
  const leftX = cx - size;
  const rightX = cx + size;

  return (
    <g>
      {text ? (
        <text x={cx} y={topY - 4} textAnchor="middle" fontSize="12" fill={color} fontWeight={600}>
          {text}
        </text>
      ) : null}
      <polygon points={`${cx},${tipY} ${leftX},${topY} ${rightX},${topY}`} fill={color} />
    </g>
  );
};

const HorizontalFillWithMarkers: React.FC<Props> = ({
  fillValue,
  fillLabel,
  markerValue,
  markerLabel,
  max = 100,
  height = 120,
  showTooltip = false,
}) => {
  const safeMax = Math.max(1, max);
  const safeFill = Math.min(Math.max(fillValue, 0), safeMax);
  const safeMarker = Math.min(Math.max(markerValue, 0), safeMax);

  // 수평 바는 layout="vertical" + 카테고리 1개
  const data = useMemo(() => [{ name: 'bar', value: safeFill }], [safeFill]);

  return (
    <>
      <div style={{ width: '100%',
        borderLeft: '1px solid #666666', 
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ width: '100%', height: '38px' }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              // margin={{ top: 22, right: 60, bottom: 8, left: 60 }}
              margin={{ top: 0, right: 60, bottom: 0, left: 60 }}
            >
              {/* 값 축(가로) */}
              <XAxis type="number" domain={[0, safeMax]} hide />

              {/* 카테고리 축(세로) */}
              <YAxis type="category" dataKey="name" hide />

              {/* 좌/우 라벨 */}
              <ReferenceLine
                x={0}
                ifOverflow="extendDomain"
                label={{
                  value: '문제 없음',
                  position: 'left',
                  offset: 4,
                  fontSize: 12,
                  fill: '#4B5563',
                }}
                stroke="#fff"
              />
              <ReferenceLine
                x={safeMax}
                ifOverflow="extendDomain"
                label={{
                  value: '문제 심각',
                  position: 'right',
                  offset: 4,
                  fontSize: 12,
                  fill: '#4B5563',
                }}
                stroke="#fff"
              />

              {/* 회색 배경 + 빨간 채움 */}
              <Bar
                dataKey="value"
                background={{ fill: '#e5e7eb' }}
                fill="#ef4444"
                radius={[6, 6, 6, 6]}
                // barSize 대신 maxBarSize로 과대설정 방지
                // maxBarSize={Math.max(12, Math.min(28, height - 20))}
                maxBarSize={Math.max(12, Math.min(30, height - 20))}
                isAnimationActive={false}
                minPointSize={1} // 0에 가까운 값도 보이게
              />

              {/* 수직 실선(마커) */}
              <ReferenceLine x={safeMarker} stroke="blue" strokeWidth={2} />

              {/* fillValue 위치 bullet */}
              <ReferenceDot
                x={safeFill}
                y="bar"
                r={0} // 기본 원 숨김
                shape={
                  <TriangleDownWithText
                    size={6}
                    color="#ef4444"
                    text={fillLabel ?? `${safeFill}`}
                    yOffset={-(height / 2) + 8}
                  />
                }
              />

              {/* markerValue 위치 bullet */}
              <ReferenceDot
                x={safeMarker}
                y="bar"
                r={0}
                shape={
                  <TriangleDownWithText
                    size={6}
                    color="blue"
                    text={markerLabel ?? `${safeMarker}`}
                    yOffset={-(height / 2) + 8}
                  />
                }
              />

              {showTooltip && (
                <Tooltip
                  formatter={(val: any) => [`${val}`, 'Value']}
                  cursor={{ fill: 'transparent' }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 연돌효과 영향도 바차트 범례 영역 - 디자인(2025-12-06) */}
        <div className='legend-area'>
          <div className='legend-wrap'>
            <div className='items noProblem'>문제없음</div>
            <div className='items concerns'>문제우려</div>
            <div className='items occurred'>문제발생</div>
            <div className='items serious'>문제심각</div>
          </div>
        </div>

      </div>

      <div className='formula'>
        <span><b>SEI = </b></span>
        [ <span><b>f(Iₚ,</b></span> 최대 압력차)] + 
        [ <span><b>f(Iᵣ,</b></span> 문제 발생층 비율)] + 
        [ <span><b>f(Iₐ,</b></span> 건축계획 요소)]
      </div>
    </>
  );
};

export default HorizontalFillWithMarkers;
