/**
 * 12개 고정 구간 스택 차트 데이터 생성
 * 엑셀 로직을 기반으로 basement, soil, envelope 데이터 제공
 */

/**
 * 기본 정보를 사용해서 12개 구간 데이터를 로직으로 생성
 * @param {number} groundFloors - 지상층수
 * @param {number} basementFloors - 지하층수  
 * @param {boolean} hasPodium - 포디움 여부
 * @param {number} podiumFloors - 포디움 층수
 * @returns {Array<Array>} 섹션 데이터 배열
 */
function generateSectionData(groundFloors = 30, basementFloors = 7, hasPodium = true, podiumFloors = 5) {
    const sectionData = [];
    
    for (let i = 1; i <= 12; i++) { // 12개 구간
        // 기본값
        let basement = 0;
        let soil = 0;  
        let envelope = 0;
        
        // 로직으로 값 생성
        if (i === 1 || i === 12) {
            // 양 끝 구간: soil만
            soil = -(basementFloors + 10);  // -17
        } else if (i >= 2 && i <= 11) {
            // 중간 구간들: basement + soil 
            basement = -basementFloors;  // -7
            soil = -(basementFloors + 3);  // -10
            
            // envelope 로직
            if (i >= 3 && i <= 8) {
                envelope = groundFloors;  // 30
            } else if (i === 9 || i === 10) {
                if (hasPodium) {
                    envelope = podiumFloors;  // 5 (포디움 있을 때)
                } else {
                    envelope = groundFloors;  // 30 (포디움 없을 때, 3~8과 동일)
                }
            }
        }
        
        sectionData.push([i, basement, soil, envelope]);
    }
    
    return sectionData;
}

/**
 * 12개 고정 구간 데이터 생성 클래스
 */
class BuildingSectionDataGenerator {
    /**
     * @param {Array<Array>} sectionData - 섹션 데이터 (없으면 자동 생성)
     * @param {string} projectName - 프로젝트명
     * @param {number} groundFloors - 지상층수
     * @param {number} basementFloors - 지하층수
     * @param {boolean} hasPodium - 포디움 여부
     * @param {number} podiumFloors - 포디움 층수
     */
    constructor(sectionData = null, projectName = "TEST", groundFloors = 30, basementFloors = 7, hasPodium = true, podiumFloors = 5) {
        this.projectName = projectName;
        this.groundFloors = groundFloors;
        this.basementFloors = basementFloors;
        this.hasPodium = hasPodium;
        this.podiumFloors = podiumFloors;
        
        // 외부에서 데이터를 받거나 기본 데이터 생성
        if (sectionData === null) {
            sectionData = generateSectionData(groundFloors, basementFloors, hasPodium, podiumFloors);
        }
        
        // 12개 구간 데이터
        this.sections = sectionData.map(data => data[0]);  // [1,2,3,...,12]
        this.basementValues = sectionData.map(data => data[1]);
        this.soilValues = sectionData.map(data => data[2]);
        this.envelopeValues = sectionData.map(data => data[3]);
    }
    
    /**
     * 수정된 스택 데이터 변환
     * - soil: 맨 아래, 항상 -(지하층수 + 10) = -(7 + 10) = -17
     * - basement: 지하층 (음수 값)
     * - envelope: 지상층 높이 (양수)
     * @returns {Object} 변환된 데이터
     */
    transformStackData() {
        const soilPositions = [];
        const basementPositions = [];
        const envelopeHeights = [];
        
        // Soil은 항상 동일한 깊이 (지하층수 + 10)
        const soilDepth = -(this.basementFloors + 10);  // -(7 + 10) = -17
        
        for (let i = 0; i < 12; i++) {
            const basement = this.basementValues[i];
            const envelope = this.envelopeValues[i];
            
            // Soil 위치 (모든 구간에서 동일)
            soilPositions.push(soilDepth);
            
            // Basement 위치 (지하층, 음수 값 그대로)
            basementPositions.push(basement);
            
            // Envelope 높이 (지상층, 양수)
            envelopeHeights.push(envelope > 0 ? envelope : 0);
        }
        
        return {
            soilPositions,
            basementPositions,
            envelopeHeights
        };
    }
    
    /**
     * 차트 생성에 필요한 모든 데이터를 객체로 반환
     * @returns {Object} 차트 데이터
     */
    getChartData() {
        const { soilPositions, basementPositions, envelopeHeights } = this.transformStackData();
        
        return {
            sections: this.sections,
            soilPositions: soilPositions,
            basementPositions: basementPositions,
            envelopeHeights: envelopeHeights,
            projectName: this.projectName,
            groundFloors: this.groundFloors,
            basementFloors: this.basementFloors,
            hasPodium: this.hasPodium,
            podiumFloors: this.podiumFloors
        };
    }
}

/**
 * 12개 고정 구간 데이터 생성 함수
 * 
 * @param {Array<Array>} sectionData - 외부 섹션 데이터 (없으면 기본값 사용)
 * @param {string} projectName - 프로젝트명
 * @param {number} groundFloors - 지상층수
 * @param {number} basementFloors - 지하층수
 * @param {boolean} hasPodium - 포디움 여부
 * @param {number} podiumFloors - 포디움 층수
 * @returns {Object} 차트 생성에 필요한 모든 데이터
 */
function generateBuildingSectionData(sectionData = null, projectName = "TEST", groundFloors = 30, basementFloors = 7, hasPodium = true, podiumFloors = 5) {
    const generator = new BuildingSectionDataGenerator(sectionData, projectName, groundFloors, basementFloors, hasPodium, podiumFloors);
    return generator.getChartData();
}

/**
 * 샘플 데이터로 분석을 실행하는 함수
 * @returns {Object} 분석 결과
 */
function runSampleAnalysis() {
    // 샘플 입력 데이터
    const sampleConfig = {
        projectName: "TEST",
        groundFloors: 30,
        basementFloors: 7,
        hasPodium: true,
        podiumFloors: 5
    };
    
    const result = generateBuildingSectionData(
        null,
        sampleConfig.projectName,
        sampleConfig.groundFloors,
        sampleConfig.basementFloors,
        sampleConfig.hasPodium,
        sampleConfig.podiumFloors
    );
    
    // 결과 출력 (JSON 형식)
    console.log("=== 건물 구간 데이터 생성 결과 ===");
    console.log(`프로젝트명: ${result.projectName}`);
    console.log(`지상층수: ${result.groundFloors}층`);
    console.log(`지하층수: ${result.basementFloors}층`);
    console.log(`포디움: ${result.hasPodium ? '있음' : '없음'}`);
    if (result.hasPodium) {
        console.log(`포디움 층수: ${result.podiumFloors}층`);
    }
    
    console.log(`\n구간 데이터: ${result.sections.length}개 구간`);
    console.log("구간 | Soil | Basement | Envelope");
    console.log("-".repeat(35));
    
    for (let i = 0; i < result.sections.length; i++) {
        const section = result.sections[i];
        const soil = result.soilPositions[i];
        const basement = result.basementPositions[i];
        const envelope = result.envelopeHeights[i];
        console.log(`  ${section.toString().padStart(2)} | ${soil.toString().padStart(4)} |    ${basement.toString().padStart(4)} |    ${envelope.toString().padStart(4)}`);
    }
    
    console.log('\n📊 JSON 형식 결과:');
    console.log(JSON.stringify(result, null, 2));
    
    return result;
}

// ES6 모듈 export
export {
    generateSectionData,
    BuildingSectionDataGenerator,
    generateBuildingSectionData,
    runSampleAnalysis
};

// Node.js에서 직접 실행 시 샘플 분석 실행
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].endsWith('building-section-chart.js')) {
    console.log('🚀 건물 구간 차트 데이터 생성기 직접 실행 모드\n');
    runSampleAnalysis();
}
