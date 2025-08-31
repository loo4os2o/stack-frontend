import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const StackedRangeBar = () => {
  const data = [
    { section: 1, basement: 0, soil: -10, envelope: 0 },
    { section: 2, basement: -3, soil: -10, envelope: 0 },
    { section: 3, basement: -3, soil: -10, envelope: 20 },
    { section: 4, basement: -3, soil: -10, envelope: 20 },
    { section: 5, basement: -3, soil: -10, envelope: 20 },
    { section: 6, basement: -3, soil: -10, envelope: 20 },
    { section: 7, basement: -3, soil: -10, envelope: 20 },
    { section: 8, basement: -3, soil: -10, envelope: 20 },
    { section: 9, basement: -3, soil: -10, envelope: 3 },
    { section: 10, basement: -3, soil: -10, envelope: 3 },
    { section: 11, basement: -3, soil: -10, envelope: 0 },
    { section: 12, basement: 0, soil: -10, envelope: 0 },
  ];

  // 스택 차트용 데이터 변환
  const stackData = data.map((item) => {
    const basementDepth = item.basement === 0 ? 0 : Math.abs(item.basement); // 지하층 깊이
    const totalSoilDepth = Math.abs(item.soil); // 전체 토양 깊이

    return {
      section: item.section,
      // 토양 높이 (전체 토양에서 지하층이 파고든 만큼 제외)
      soilHeight: totalSoilDepth - basementDepth, // 지하층이 파고든 만큼 토양 감소
      // 지하층 높이 (토양을 파고든 부분)
      basementHeight: basementDepth,
      // 지상층 높이
      buildingHeight: item.envelope,
    };
  });
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stackData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barCategoryGap="0%" // 막대 간격을 0으로 설정하여 붙임
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="section"
              label={{ value: '구역 (1-12)', position: 'insideBottom', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: '높이 (m)', angle: -90, position: 'insideLeft' }}
              domain={[-15, 25]}
              tickFormatter={(value) => {
                if (value === 0) return '지면';
                if (value > 0) return `+${value}`;
                return `${value}`;
              }}
            />

            {/* 토양 (가장 아래, 음수에서 시작) */}
            <Bar dataKey="soilHeight" stackId="building" fill="#92400e" name="토양" />

            {/* 지하층 (토양 위에 스택, -3지점에서 시작) */}
            <Bar dataKey="basementHeight" stackId="building" fill="#3b82f6" name="지하층" />

            {/* 지상층 (지면에서 시작) */}
            <Bar dataKey="buildingHeight" stackId="building" fill="#6b7280" name="지상층" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedRangeBar;
