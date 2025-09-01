"""
12개 고정 구간 스택 차트 데이터 생성
엑셀 로직을 기반으로 basement, soil, envelope 데이터 제공
"""

from typing import List, Tuple, Dict, Any
import matplotlib.pyplot as plt
import numpy as np



def generate_section_data(ground_floors=30, basement_floors=7, has_podium=True, podium_floors=5):
    """
    기본 정보를 사용해서 12개 구간 데이터를 로직으로 생성
    """
    section_data = []
    
    for i in range(1, 13):  # 12개 구간
        # 기본값
        basement = 0
        soil = 0  
        envelope = 0
        
        # 로직으로 값 생성
        if i == 1 or i == 12:
            # 양 끝 구간: soil만
            soil = -(basement_floors + 10)  # -17
        elif 2 <= i <= 11:
            # 중간 구간들: basement + soil 
            basement = -basement_floors  # -7
            soil = -(basement_floors + 3)  # -10
            
            # envelope 로직
            if 3 <= i <= 8:
                envelope = ground_floors  # 30
            elif i == 9 or i == 10:
                if has_podium:
                    envelope = podium_floors  # 5 (포디움 있을 때)
                else:
                    envelope = ground_floors  # 30 (포디움 없을 때, 3~8과 동일)
        
        section_data.append((i, basement, soil, envelope))
    
    return section_data

class BuildingSectionDataGenerator:
    """12개 고정 구간 데이터 생성 클래스"""
    
    def __init__(self, section_data=None, project_name="TEST", ground_floors=30, basement_floors=7, has_podium=True, podium_floors=5):
        self.project_name = project_name
        self.ground_floors = ground_floors
        self.basement_floors = basement_floors
        self.has_podium = has_podium
        self.podium_floors = podium_floors
        
        # 외부에서 데이터를 받거나 기본 데이터 생성
        if section_data is None:
            section_data = generate_section_data(ground_floors, basement_floors, has_podium, podium_floors)
        
        # 12개 구간 데이터
        self.sections = [data[0] for data in section_data]  # [1,2,3,...,12]
        self.basement_values = [data[1] for data in section_data]
        self.soil_values = [data[2] for data in section_data]
        self.envelope_values = [data[3] for data in section_data]
    
    def transform_stack_data(self) -> Tuple[List[float], List[float], List[float]]:
        """
        수정된 스택 데이터 변환
        - soil: 맨 아래, 항상 -(지하층수 + 10) = -(7 + 10) = -17
        - basement: 지하층 (음수 값)
        - envelope: 지상층 높이 (양수)
        """
        soil_positions = []
        basement_positions = []
        envelope_heights = []
        
        # Soil은 항상 동일한 깊이 (지하층수 + 10)
        soil_depth = -(self.basement_floors + 10)  # -(7 + 10) = -17
        
        for i in range(12):
            basement = self.basement_values[i]
            envelope = self.envelope_values[i]
            
            # Soil 위치 (모든 구간에서 동일)
            soil_positions.append(soil_depth)
            
            # Basement 위치 (지하층, 음수 값 그대로)
            basement_positions.append(basement)
            
            # Envelope 높이 (지상층, 양수)
            envelope_heights.append(envelope if envelope > 0 else 0)
        
        return soil_positions, basement_positions, envelope_heights
    
    def get_chart_data(self) -> Dict[str, Any]:
        """
        차트 생성에 필요한 모든 데이터를 딕셔너리로 반환
        """
        soil_positions, basement_positions, envelope_heights = self.transform_stack_data()
        
        return {
            'sections': self.sections,
            'soil_positions': soil_positions,
            'basement_positions': basement_positions,
            'envelope_heights': envelope_heights,
            'project_name': self.project_name,
            'ground_floors': self.ground_floors,
            'basement_floors': self.basement_floors,
            'has_podium': self.has_podium,
            'podium_floors': self.podium_floors
        }
    



def generate_building_section_data(section_data=None, project_name="TEST", ground_floors=30, basement_floors=7, has_podium=True, podium_floors=5) -> Dict[str, Any]:
    """
    12개 고정 구간 데이터 생성 함수
    
    Args:
        section_data: 외부 섹션 데이터 (없으면 기본값 사용)
        project_name: 프로젝트명
        ground_floors: 지상층수
        basement_floors: 지하층수
        has_podium: 포디움 여부
        podium_floors: 포디움 층수
    
    Returns:
        Dict[str, Any]: 차트 생성에 필요한 모든 데이터
    """
    generator = BuildingSectionDataGenerator(section_data, project_name, ground_floors, basement_floors, has_podium, podium_floors)
    return generator.get_chart_data()


def draw_building_section_chart(chart_data: Dict[str, Any], save_path: str = None, show_chart: bool = True):
    """
    건물 구간 스택 차트 그리기 (JavaScript StackedRangeBar 로직 기반)
    
    Args:
        chart_data: get_chart_data()로 생성된 차트 데이터
        save_path: 차트 저장 경로 (선택사항)
        show_chart: 차트 화면 표시 여부
    """
    sections = chart_data['sections']
    soil_positions = chart_data['soil_positions'] 
    basement_positions = chart_data['basement_positions']
    envelope_heights = chart_data['envelope_heights']
    project_name = chart_data['project_name']
    
    # 차트 설정
    plt.figure(figsize=(14, 8))
    plt.rcParams['font.family'] = ['Arial Unicode MS', 'Apple SD Gothic Neo', 'DejaVu Sans', 'sans-serif']
    
    x = np.arange(len(sections))
    width = 1.0  # bar 사이의 간격 없애기
    
    # JavaScript 로직에 따른 스택 데이터 변환
    soil_heights = []
    basement_heights = []
    building_heights = []
    
    for i in range(len(sections)):
        basement = basement_positions[i]
        soil = soil_positions[i]
        envelope = envelope_heights[i]
        
        # JavaScript 로직: basementDepth, totalSoilDepth 계산
        basement_depth = 0 if basement == 0 else abs(basement)  # 지하층 깊이
        total_soil_depth = abs(soil)  # 전체 토양 깊이
        
        # 토양 높이 (전체 토양에서 지하층이 파고든 만큼 제외)
        soil_height = total_soil_depth - basement_depth
        
        # 지하층 높이 (토양을 파고든 부분)
        basement_height = basement_depth
        
        # 지상층 높이  
        building_height = envelope
        
        soil_heights.append(soil_height)
        basement_heights.append(basement_height)
        building_heights.append(building_height)
    
    # 스택 차트 그리기 - JavaScript 버전과 동일한 순서
    # 1. 토양 (가장 아래, 음수에서 시작)
    soil_bottoms = [soil_positions[i] for i in range(len(sections))]
    bars_soil = plt.bar(x, soil_heights, width,
                       bottom=soil_bottoms,
                       label='토양 (Soil)', color='#92400e', alpha=0.8)
    
    # 2. 지하층 (토양 위에 스택)
    basement_bottoms = [soil_bottoms[i] + soil_heights[i] for i in range(len(sections))]
    bars_basement = plt.bar(x, basement_heights, width,
                           bottom=basement_bottoms,
                           label='지하층 (Basement)', color='#3b82f6', alpha=0.8)
    
    # 3. 지상층 (지면에서 시작, 별도 스택)
    bars_building = plt.bar(x, building_heights, width,
                           bottom=0,
                           label='지상층 (Building)', color='#6b7280', alpha=0.8)
    
    # 차트 꾸미기
    plt.xlabel('구역 (1-12)', fontsize=12, fontweight='bold')
    plt.ylabel('높이 (m)', fontsize=12, fontweight='bold')
    plt.title(f'Building Section Chart - {project_name}', fontsize=14, fontweight='bold')
    plt.xticks(x, sections)
    
    # Y축 설정 (JavaScript와 동일하게)
    plt.ylim(-15, 25)
    
    # Y축 레이블 포맷터 (JavaScript와 동일하게)
    def y_formatter(value, pos):
        if value == 0:
            return '지면'
        elif value > 0:
            return f'+{int(value)}'
        else:
            return f'{int(value)}'
    
    plt.gca().yaxis.set_major_formatter(plt.FuncFormatter(y_formatter))
    
    # 격자 추가
    plt.grid(True, alpha=0.3, linestyle='--')
    
    # 범례 추가
    plt.legend(loc='upper right')
    
    # 0 라인 강조 (지면 표시)
    plt.axhline(y=0, color='black', linestyle='-', linewidth=2, alpha=0.8)
    
    # 차트 정보 텍스트 추가
    info_text = f"Ground: {chart_data['ground_floors']}F, Basement: {chart_data['basement_floors']}F"
    if chart_data['has_podium']:
        info_text += f", Podium: {chart_data['podium_floors']}F"
    plt.text(0.02, 0.98, info_text, transform=plt.gca().transAxes, 
             verticalalignment='top', fontsize=10, 
             bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    
    plt.tight_layout()
    
    # 저장
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"차트가 저장되었습니다: {save_path}")
    
    # 화면 표시
    if show_chart:
        plt.show()
    
    return plt.gcf()


def main():
    """메인 실행 함수 - 샘플 데이터로 테스트"""
    # 샘플 입력 데이터
    sample_config = {
        'project_name': "TEST",
        'ground_floors': 30,
        'basement_floors': 7,
        'has_podium': True,
        'podium_floors': 5
    }
    
    result = generate_building_section_data(**sample_config)
    
    # 결과 출력
    print("=== 건물 구간 데이터 생성 결과 ===")
    print(f"프로젝트명: {result['project_name']}")
    print(f"지상층수: {result['ground_floors']}층")
    print(f"지하층수: {result['basement_floors']}층")
    print(f"포디움: {'있음' if result['has_podium'] else '없음'}")
    if result['has_podium']:
        print(f"포디움 층수: {result['podium_floors']}층")
    
    print(f"\n구간 데이터: {len(result['sections'])}개 구간")
    print("구간 | Soil | Basement | Envelope")
    print("-" * 35)
    
    for i in range(len(result['sections'])):
        section = result['sections'][i]
        soil = result['soil_positions'][i]
        basement = result['basement_positions'][i]
        envelope = result['envelope_heights'][i]
        print(f"  {section:2d} | {soil:4.0f} |    {basement:4.0f} |    {envelope:4.0f}")
    
    # 차트 그리기
    print("\n=== 차트 생성 중 ===")
    draw_building_section_chart(result, save_path="building_section_chart.png")
    
    return result

if __name__ == "__main__":
    main()
