// components/VerticalRangeBar.tsx
'use client';
import React, { useMemo } from 'react';

// 문제 발생 예상층
interface Block {
  start: number; // 0 ~ N (퍼센트처럼 쓰되 최대값은 동적)
  end: number; // 0 ~ N
  type: 'danger' | 'warning' | 'normal';
}

interface Props {
  data: { name: string; blocks: Block[] }[];
  width?: string | number;
  height?: string | number;
  className?: string;
  /** 라벨 포맷 (예: 층 표시) */
  labelFormatter?: (v: number) => string | number;
  /** 라벨 영역 너비(px) */
  labelWidth?: number;
}

function getMaxEnd(blocks: Block[]): number {
  if (!blocks?.length) return 100;
  const last = blocks[blocks.length - 1];
  const maxEnd = Math.max(...blocks.map((b) => b.end), last?.end ?? 100);
  return maxEnd > 0 ? maxEnd : 100;
}

/** 10, 20, 30... 처럼 보이도록 step을 계산 (목표 틱 개수 ~6) */
function getTickStep(maxEnd: number, targetTicks = 6): number {
  if (maxEnd <= 0) return 10;
  const rough = maxEnd / Math.max(1, targetTicks - 1);
  // 10 단위 올림
  const step = Math.ceil(rough / 10) * 10;
  return Math.max(1, step);
}

function buildTicks(maxEnd: number): number[] {
  const step = getTickStep(maxEnd);
  const ticks: number[] = [];
  for (let t = 0; t <= maxEnd; t += step) ticks.push(t);
  // maxEnd가 step의 배수가 아니면 마지막 값 보장
  if (ticks[ticks.length - 1] !== maxEnd) ticks.push(maxEnd);
  return ticks;
}

const VerticalRangeBar: React.FC<Props> = ({
  data,
  width = 30,
  height = 300,
  className = '',
  labelFormatter,
  labelWidth = 36,
}) => {
  console.log('blocks', data);
  const maxEnd = useMemo(() => getMaxEnd(data.flatMap((d) => d.blocks)), [data]);
  const ticks = useMemo(() => buildTicks(maxEnd), [maxEnd]);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {/* Y축 라벨 영역 */}
      <div
        style={{
          position: 'relative',
          width: labelWidth,
          height,
        }}
      >
        {ticks.map((t, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: `${(t / maxEnd) * 100}%`,
              transform: 'translateY(50%)', // 라벨을 값 중앙에 정렬
              fontSize: 12,
              lineHeight: 1,
              color: '#444',
              whiteSpace: 'nowrap',
            }}
          >
            {labelFormatter ? labelFormatter(t) : t}
          </div>
        ))}
      </div>

      {/* 차트 본체 */}
      {data.map((datum, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div
            className={className}
            style={{
              position: 'relative',
              width,
              height,
              background: '#e0e0e0',
              margin: 'auto',
              overflow: 'hidden',
            }}
          >
            {datum.blocks.map((block, idx) => {
              const segHeightPct = ((block.end - block.start) / maxEnd) * 100;
              const segBottomPct = (block.start / maxEnd) * 100;
              const color =
                block.type === 'danger'
                  ? '#a32020'
                  : block.type === 'warning'
                    ? '#e78f8f'
                    : '#e0e0e0';
              const opacity = 0.85;

              // 잘못된 범위 방지
              if (segHeightPct <= 0) return null;

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    bottom: `${segBottomPct}%`,
                    height: `${segHeightPct}%`,
                    width: '100%',
                    backgroundColor: color,
                    opacity,
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalRangeBar;
