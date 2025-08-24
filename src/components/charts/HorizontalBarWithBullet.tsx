// components/HorizontalBarWithBullet.tsx
import ReactECharts from 'echarts-for-react';
// 최대 연돌 압력차

interface HorizontalBarWithBulletProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const HorizontalBarWithBullet: React.FC<HorizontalBarWithBulletProps> = ({
  width = '100%',
  height = 200,
  className = '',
}) => {
  const data = [
    { name: '최상층', value: 25 },
    { name: '로비층', value: 35 },
  ];

  const option = {
    xAxis: {
      type: 'value',
      min: 0,
      max: 40,
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: data.map((item) => item.name),
      axisTick: { show: false },
      axisLine: { show: false },
    },
    series: [
      {
        name: '층별',
        type: 'bar',
        data: data.map((item) => item.value),
        barWidth: 6,
        itemStyle: {
          color: '#ff4d4f',
        },
        label: {
          show: false,
        },
        z: 1,
      },
      {
        name: 'bullet',
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 12,
        data: data.map((item) => [item.value, item.name]),
        itemStyle: {
          color: '#ff4d4f',
        },
        z: 2,
      },
      {
        name: 'threshold',
        type: 'line',
        data: [20, 20],
        xAxisIndex: 0,
        yAxisIndex: 0,
        lineStyle: {
          type: 'dashed',
          color: '#999',
          width: 1.5,
        },
        // label: {
        //   show: true,
        //   formatter: "기준선 (20)",
        //   position: "insideTopRight",
        //   color: "#999",
        // },
        markLine: {
          silent: true,
          symbol: 'none',
          label: {
            show: false,
          },
          data: [
            {
              xAxis: 20,
            },
          ],
          lineStyle: {
            type: 'dashed',
            color: '#999',
            width: 1.5,
          },
        },
      },
    ],
    grid: {
      left: 80,
      right: 30,
      top: 20,
      bottom: 30,
    },
  };

  return <ReactECharts option={option} style={{ height, width }} className={className} />;
};

export default HorizontalBarWithBullet;
