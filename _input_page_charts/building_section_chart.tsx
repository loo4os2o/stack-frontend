import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const BuildingChart = () => {
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
    { section: 12, basement: 0, soil: -10, envelope: 0 }
  ];

  // 스택 차트용 데이터 변환
  const stackData = data.map(item => {
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
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">건물 단면도 모델링</h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600"></div>
            <span>지상층</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500"></div>
            <span>지하층</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-700"></div>
            <span>토양</span>
          </div>
        </div>
      </div>

      {/* 통합 건물 단면도 - 스택 방식 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">통합 건물 단면도</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stackData}
              margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
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
              <Bar 
                dataKey="soilHeight" 
                stackId="building"
                fill="#92400e"
                name="토양"
              />
              
              {/* 지하층 (토양 위에 스택, -3지점에서 시작) */}
              <Bar 
                dataKey="basementHeight" 
                stackId="building"
                fill="#3b82f6"
                name="지하층"
              />
              
              {/* 지상층 (지면에서 시작) */}
              <Bar 
                dataKey="buildingHeight" 
                stackId="building"
                fill="#6b7280"
                name="지상층"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* 범례 */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            지하층이 토양을 파고 들어간 형태로 표현됩니다. 토양(갈색)은 지하층(파랑)이 파고든 만큼 줄어듭니다.
          </div>
        </div>
      </div>

      {/* 데이터 확인용 테이블 */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4">변환된 스택 데이터</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">구역</th>
                <th className="border border-gray-300 px-3 py-2">토양 높이</th>
                <th className="border border-gray-300 px-3 py-2">지하층 높이</th>
                <th className="border border-gray-300 px-3 py-2">지상층 높이</th>
                <th className="border border-gray-300 px-3 py-2">총 높이</th>
              </tr>
            </thead>
            <tbody>
              {stackData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.section}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.soilHeight}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.basementHeight}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.buildingHeight}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                    {(row.soilHeight + row.basementHeight + row.buildingHeight).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuildingChart;