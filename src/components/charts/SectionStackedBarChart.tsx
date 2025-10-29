import React from 'react';

// Types
export type SectionDatum = {
  section: number;
  basement: number;
  soil: number;
  envelope: number;
};

export type SectionStackedBarChartProps = {
  data: SectionDatum[];
  width?: number;
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  barGapRatio?: number;
  fontSize?: number;
};

export default function SectionStackedBarChart({
  data,
  width = 600,
  height = 360,
  margin = { top: 16, right: 16, bottom: 36, left: 44 },
  barGapRatio = 0,
  fontSize = 12,
}: SectionStackedBarChartProps) {
  const mTop = margin.top ?? 0;
  const mRight = margin.right ?? 0;
  const mBottom = margin.bottom ?? 0;
  const mLeft = margin.left ?? 0;

  const innerW = Math.max(10, width - mLeft - mRight);
  const innerH = Math.max(10, height - mTop - mBottom);

  if (!data || data.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center text-gray-500"
        style={{ width, height }}
      >
        No data
      </div>
    );
  }

  let maxPos = 0;
  let minNeg = 0;
  for (const d of data) {
    if (d.envelope > maxPos) maxPos = d.envelope;
    const low = Math.min(d.basement ?? 0, d.soil ?? 0);
    if (low < minNeg) minNeg = low;
  }
  if (maxPos === 0) maxPos = 1;
  if (minNeg === 0) minNeg = -1;

  const yScale = (v: number) => mTop + (maxPos - v) * (innerH / (maxPos - minNeg));
  const zeroY = yScale(0);

  const n = data.length;
  const fullBarW = innerW / n;
  const actualBarW = fullBarW * (1 - barGapRatio);

  const gridLines = [];
  for (let i = 10; i <= maxPos; i += 10) {
    const y = yScale(i);
    gridLines.push(
      <line
        key={`grid-${i}`}
        x1={mLeft}
        y1={y}
        x2={mLeft + innerW}
        y2={y}
        stroke="lightgray"
        strokeWidth={1}
      />
    );
  }

  const yLabels = [];
  for (let i = Math.ceil(minNeg / 10) * 10; i <= maxPos; i += 10) {
    const y = yScale(i);
    yLabels.push(
      <text key={`label-${i}`} x={mLeft - 6} y={y} textAnchor="end" dominantBaseline="central">
        {i}
      </text>
    );
  }

  return (
    <svg
      role="img"
      aria-label="Section stacked bar chart"
      width={width}
      height={height}
      className="block"
    >
      <defs>
        <pattern
          id="soilHatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          patternTransform="rotate(45)"
        >
          <rect x="0" y="0" width="4" height="4" fill="white" />
          <line x1="0" y1="0" x2="0" y2="4" stroke="black" strokeWidth="2" />
        </pattern>
      </defs>

      <rect x={0} y={0} width={width} height={height} fill="transparent" />

      {/* Only keep main axes */}
      <line x1={mLeft} y1={mTop} x2={mLeft} y2={mTop + innerH} />

      {gridLines}

      <g fontSize={fontSize} fill="currentColor">
        {yLabels}
      </g>

      <line x1={mLeft} y1={zeroY} x2={mLeft + innerW} y2={zeroY} stroke="black" strokeWidth={1} />

      {data.map((d, i) => {
        const x = mLeft + i * fullBarW;
        const xCenter = x + actualBarW / 2;

        const parts: React.ReactNode[] = [];

        if ((d.envelope ?? 0) > 0) {
          const yTop = yScale(d.envelope);
          const h = zeroY - yTop;
          parts.push(
            <rect key={`env-${i}`} x={x} y={yTop} width={actualBarW} height={h} fill="#9CA3AF" />
          );
        }

        if ((d.basement ?? 0) < 0) {
          const yBaseTop = zeroY;
          const yBaseBottom = yScale(d.basement);
          const hBase = yBaseBottom - yBaseTop;
          parts.push(
            <rect
              key={`base-${i}`}
              x={x}
              y={yBaseTop}
              width={actualBarW}
              height={hBase}
              fill="white"
            />
          );
        }

        if ((d.soil ?? 0) < (d.basement ?? 0)) {
          const ySoilTop = yScale(d.basement);
          const ySoilBottom = yScale(d.soil);
          const hSoil = ySoilBottom - ySoilTop;
          parts.push(
            <rect
              key={`soil-${i}`}
              x={x}
              y={ySoilTop}
              width={actualBarW}
              height={hSoil}
              fill="url(#soilHatch)"
              stroke="black"
              strokeWidth={0}
            />
          );
        }

        return <g key={i}>{parts}</g>;
      })}
    </svg>
  );
}
