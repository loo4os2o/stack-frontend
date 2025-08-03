// components/GaugeNestedFullDonut.tsx
import ReactECharts from "echarts-for-react";
import React from "react";
// 문제 발생 예상층
interface Props {
  dangerPercent: number; // 예: 0.49
  warningPercent: number; // 예: 0.68
  width?: string | number;
  height?: string | number;
  className?: string;
}

const GaugeNestedFullDonut: React.FC<Props> = ({
  dangerPercent,
  warningPercent,
  width = '100%',
  height = 360,
  className = '',
}) => {
  const option = {
    title: [
      {
        text: `${Math.round(dangerPercent * 100)}%`,
        left: "center",
        top: "40%",
        textStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#a32020",
        },
      },
      {
        text: `${Math.round(warningPercent * 100)}%`,
        left: "center",
        top: "70%",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#e78f8f",
        },
      },
    ],
    legend: {
      orient: "horizontal",
      top: 10,
      left: "center",
      data: [
        {
          name: "문제 주의층",
          icon: "circle",
          itemStyle: { color: "#e78f8f" },
        },
        {
          name: "문제 발생층",
          icon: "circle",
          itemStyle: { color: "#a32020" },
        },
      ],
      textStyle: {
        fontSize: 14,
      },
      itemWidth: 14,
      itemHeight: 14,
    },
    series: [
      // 바깥쪽 (더 굵음): 문제 주의층
      {
        name: "문제 주의층",
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        radius: "80%",
        center: ["50%", "55%"],
        progress: {
          show: true,
          roundCap: true,
          width: 16,
          itemStyle: {
            color: "#e78f8f",
          },
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [[1, "#eee"]],
          },
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [{ value: warningPercent * 100 }],
        detail: { show: false },
        z: 1,
      },
      // 안쪽 (얇음): 문제 발생층
      {
        name: "문제 발생층",
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        radius: "65%",
        center: ["50%", "55%"],
        progress: {
          show: true,
          roundCap: true,
          width: 10,
          itemStyle: {
            color: "#a32020",
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, "#eee"]],
          },
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        data: [{ value: dangerPercent * 100 }],
        detail: { show: false },
        z: 2,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width }} className={className} />;
};

export default GaugeNestedFullDonut;
