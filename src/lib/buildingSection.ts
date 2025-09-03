/**
 * 12개 고정 구간 데이터 생성
 * - props로 받은 값 기반
 * - 결과: { section, basement, soil, envelope }[]
 */

export type SectionData = {
  section: number;
  basement: number;
  soil: number;
  envelope: number;
};

export type SectionProps = {
  groundFloors: number;
  basementFloors: number;
  hasPodium: boolean;
  podiumFloors: number;
};

export function generateSectionDataArray(props: SectionProps): SectionData[] {
  const { groundFloors, basementFloors, hasPodium, podiumFloors } = props;

  const sections: SectionData[] = [];

  for (let i = 1; i <= 12; i++) {
    let basement = 0;
    let soil = 0;
    let envelope = 0;

    if (i === 1 || i === 12) {
      soil = -(basementFloors + 10);
    } else if (i >= 2 && i <= 11) {
      basement = -basementFloors;
      soil = -(basementFloors + 3);

      if (i >= 3 && i <= 8) {
        envelope = groundFloors;
      } else if (i === 9 || i === 10) {
        envelope = hasPodium ? podiumFloors : groundFloors;
      }
    }

    sections.push({
      section: i,
      basement,
      soil,
      envelope,
    });
  }

  return sections;
}

/**
 * 샘플 실행
 */
export function runSampleAnalysis(): SectionData[] {
  return generateSectionDataArray({
    groundFloors: 30,
    basementFloors: 7,
    hasPodium: true,
    podiumFloors: 5,
  });
}
