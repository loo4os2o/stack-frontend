import ReactECharts from 'echarts-for-react';
import React from 'react';
// 문제발생 예상층
interface DonutGaugeProps {
  percentage: number; // 0 ~ 100
  width?: string | number;
  height?: string | number;
  className?: string;
}

const DonutGauge: React.FC<DonutGaugeProps> = ({
  percentage,
  width = '100%',
  height = 300,
  className = '',
}) => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        progress: {
          show: true,
          overlap: false,
          roundCap: true, // ✅ 양 끝 둥글게
          clip: false,
          itemStyle: {
            color: '#ff4d4f',
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, '#eee']],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value: percentage,
          },
        ],
        detail: {
          valueAnimation: true,
          fontSize: 24,
          offsetCenter: [0, 0],
          color: '#ff4d4f',
          formatter: `{value}%`,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width }} className={className} />;
};

export default DonutGauge;
