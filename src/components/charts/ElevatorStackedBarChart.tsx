'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartDataItem = {
  shaftType: string;
  servedZoneBasement: number;
  expressZoneLocalShaft: number;
  servedZoneLobby: number;
  expressZoneMain: number;
  servedZoneMain: number;
};

interface StackedBarChartProps {
  data: ChartDataItem[];
  width?: number | string;
  height?: number;
}

export default function StackedBarChart({
  data,
  width = '100%',
  height = 400,
}: StackedBarChartProps) {
  return (
    <ResponsiveContainer width={width} height={height} style={{ marginLeft: '-15px' }}>
      <BarChart data={data} stackOffset="sign">
        <YAxis tickCount={5} />
        <CartesianGrid vertical={false} />
        <ReferenceLine y={0} stroke="black" strokeWidth={2} />
        <XAxis
          dataKey="shaftType"
          tickFormatter={(_, index) => (index + 1).toString()}
          axisLine={false}
          tickLine={false}
          y={0}
        />
        <Tooltip />
        <Bar dataKey="servedZoneBasement" stackId="stack" fill="black" />
        <Bar dataKey="expressZoneLocalShaft" stackId="stack" fill="white" stroke="black" />
        <Bar dataKey="servedZoneLobby" stackId="stack" fill="black" />
        <Bar dataKey="expressZoneMain" stackId="stack" fill="gray" />
        <Bar dataKey="servedZoneMain" stackId="stack" fill="black" />
      </BarChart>
    </ResponsiveContainer>
  );
}
