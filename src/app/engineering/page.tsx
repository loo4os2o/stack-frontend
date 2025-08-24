'use client';

import PlanTiers from './PlanTiers';
import ServiceComparisonTable from './ServiceComparisonTable';
import '../../css/engineering.css';

export default function EngineeringPage() {
  return (
    <div className="container mx-auto pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-5">엔지니어링 서비스</h1>

      {/* 엔지니어링 서비스 요금제 */}
      <PlanTiers />

      {/* 모든 서비스 비교표 */}
      <ServiceComparisonTable />
    </div>
  );
}
