// components/RangeBarWithBullet.tsx
import ReactECharts from 'echarts-for-react';
import React from 'react';
// 중성대 위치
interface Range {
  x: number; // 카테고리 위치 (예: 1, 2, 3)
  start: number; // 시작값
  end: number; // 끝값
  isGap?: boolean; // 중간 끊긴 영역 여부
}

interface Bullet {
  x: number; // 카테고리 위치
  y: number; // 해당 y값 (표시 위치)
}

interface Props {
  ranges: Range[];
  bullets: Bullet[];
  width?: string | number;
  height?: string | number;
  className?: string;
}

const RangeBarWithBullet: React.FC<Props> = ({
  ranges,
  bullets,
  width = '100%',
  height = 500,
  className = '',
}) => {
  const option = {
    title: {
      text: '중성대 위치',
      left: 'center',
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 4,
      name: '샤프트',
      nameLocation: 'end',
      nameGap: -25,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        verticalAlign: 'bottom',
        lineHeight: -70,
      },
      axisLine: { onZero: false },
      interval: 1,
    },
    yAxis: {
      type: 'value',
      min: -40,
      max: 140,
      name: '높이 (m)',
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: function (
          params: echarts.CustomSeriesRenderItemParams,
          api: echarts.CustomSeriesRenderItemAPI
        ) {
          const x = api.value(0);
          const yStart = api.coord([x, api.value(1)]);
          const yEnd = api.coord([x, api.value(2)]);
          const isGap = api.value(3) === 1;

          const barWidth = 10;
          const color = isGap ? '#ccc' : '#000';

          return {
            type: 'rect',
            shape: {
              x: yStart[0] - barWidth / 2,
              y: yEnd[1],
              width: barWidth,
              height: yStart[1] - yEnd[1],
            },
            style: {
              fill: color,
            },
          };
        },
        encode: { x: 0, y: [1, 2] },
        data: ranges.map((r) => [r.x, r.start, r.end, r.isGap ? 1 : 0]),
        z: 2,
      },
      {
        type: 'scatter',
        data: bullets.map((b) => [b.x, b.y]),
        symbol: 'diamond',
        symbolSize: 14,
        itemStyle: {
          color: 'red',
        },
        z: 3,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width }} className={className} />;
};

export default RangeBarWithBullet;
