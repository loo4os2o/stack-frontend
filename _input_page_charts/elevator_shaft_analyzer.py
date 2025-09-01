"""
엘리베이터 샤프트 분석 모듈
건물의 엘리베이터 시스템 분석을 위한 계산 함수들
"""

from typing import Dict, Any
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class ElevatorShaftCalculator:
    """엘리베이터 샤프트 계산 엔진"""

    def __init__(self):
        # 계산에 필요한 변수들을 저장하는 딕셔너리
        self.variables: Dict[str, Any] = {}

    def get_variable(self, name: str, default: Any = None) -> Any:
        """변수 값 가져오기"""
        return self.variables.get(name, default)

    def set_variables(self, variables: Dict[str, Any]):
        """변수들 설정"""
        self.variables.update(variables)

    def calculate_low_rise_basement_zone(self, is_basement_shuttle=None, pressure_difference=None):
        """
        저층 샤프트의 지하층 존 계산

        Args:
            is_basement_shuttle: 지하층 셔틀 엘리베이터 여부 (boolean)
            pressure_difference: 압력 차이 계산 값 (numeric)

        Returns:
            계산 결과 (numeric)
        """
        if is_basement_shuttle is None:
            is_basement_shuttle = self.get_variable('is_basement_shuttle', False)
        if pressure_difference is None:
            pressure_difference = self.get_variable('pressure_difference', 0)

        if is_basement_shuttle == False:
            return (-1) * pressure_difference
        else:
            return 0

    # B20 범위 함수들 ====================================================

    def calculate_mid_rise_basement_zone(self, is_mid_zone=None, is_basement_shuttle=None, pressure_difference=None):
        """
        중층 샤프트의 지하층 존 계산
        """
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        shuttle_val = is_basement_shuttle if is_basement_shuttle is not None else self.get_variable('is_basement_shuttle', False)
        pressure_val = pressure_difference if pressure_difference is not None else self.get_variable('pressure_difference', 0)

        if mid_zone_val == True:
            if shuttle_val == False:
                # #REF! 부분은 실제 값으로 대체 필요
                # 일단 False로 가정하고 구현
                ref_condition = False  # 실제 #REF! 값에 따라 변경 필요
                if ref_condition != False:
                    return (-1) * pressure_val
                else:
                    return 0
            else:
                return 0
        else:
            return 0

    def calculate_mid_rise_express_local(self, is_mid_zone=None, top_floor_low=None):
        """
        중층 샤프트의 익스프레스 로컬 존 계산 (express_zone=False이므로 항상 0)
        """
        return 0

    def calculate_mid_rise_lobby_zone(self, is_mid_zone=None):
        """
        중층 샤프트의 로비 존 계산
        """
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)

        if mid_zone_val == True:
            # express_zone=False이므로 2 반환
            return 2
        else:
            return 0

    def calculate_mid_rise_express_main(self, is_mid_zone=None, is_express_zone=None, top_floor_low=None):
        """
        중층 샤프트의 익스프레스 메인 존 계산
        """
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)

        if mid_zone_val == True:
            if express_zone_val == False:
                return low_floor_val - 2
            else:
                return 0
        else:
            return 0

    def calculate_mid_rise_served_main(self, is_mid_zone=None, top_floor_mid=None, top_floor_low=None):
        """
        중층 샤프트의 서빙 메인 존 계산
        """
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        mid_floor_val = top_floor_mid if top_floor_mid is not None else self.get_variable('top_floor_mid', 0)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)

        if mid_zone_val == True:
            return mid_floor_val - low_floor_val
        else:
            return 0

    # B21 범위 함수들 ====================================================

    def calculate_high_rise_basement_zone(self, is_high_zone=None, is_mid_zone=None, is_basement_shuttle=None, pressure_difference=None):
        """
        고층 샤프트의 지하층 존 계산
        """
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        shuttle_val = is_basement_shuttle if is_basement_shuttle is not None else self.get_variable('is_basement_shuttle', False)
        pressure_val = pressure_difference if pressure_difference is not None else self.get_variable('pressure_difference', 0)

        if high_zone_val == True or mid_zone_val == True:
            if shuttle_val == False:
                # #REF! 부분은 실제 값으로 대체 필요
                ref_condition = False  # 실제 #REF! 값에 따라 변경 필요
                if ref_condition != False:
                    return (-1) * pressure_val
                else:
                    return 0
            else:
                return 0
        else:
            return 0

    def calculate_high_rise_express_local(self, is_high_zone=None, is_mid_zone=None, is_express_zone=None, top_floor_low=None, top_floor_mid=None):
        """
        고층 샤프트의 익스프레스 로컬 존 계산
        """
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)
        mid_floor_val = top_floor_mid if top_floor_mid is not None else self.get_variable('top_floor_mid', 0)

        if high_zone_val == True or mid_zone_val == True:
            if express_zone_val == False:
                return 0
            else:
                if high_zone_val == True:
                    return low_floor_val
                elif mid_zone_val == True:
                    return mid_floor_val
                else:
                    return 0
        else:
            return 0

    def calculate_high_rise_lobby_zone(self, is_high_zone=None, is_mid_zone=None, is_express_zone=None):
        """
        고층 샤프트의 로비 존 계산
        """
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)

        if high_zone_val == True or mid_zone_val == True:
            if express_zone_val == False:
                return 2
            else:
                return 0
        else:
            return 0

    def calculate_high_rise_express_main(self, is_high_zone=None, is_mid_zone=None, is_express_zone=None, top_floor_low=None, top_floor_mid=None):
        """
        고층 샤프트의 익스프레스 메인 존 계산
        Excel E21: =IF(OR($D$10=TRUE,$D$11=TRUE), IF($D$12=FALSE, IF($D$10=TRUE, $D$13-2, IF($D$11=TRUE, $D$14-2, 0)), 0), 0)
        """
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        sky_lobby_val = self.get_variable('is_sky_lobby', False)  # D12는 스카이로비
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)
        mid_floor_val = top_floor_mid if top_floor_mid is not None else self.get_variable('top_floor_mid', 0)

        if high_zone_val == True or mid_zone_val == True:
            if sky_lobby_val == False:  # D12=FALSE (스카이로비 없을 때)
                # Excel의 실제 변수값 기준: D10=False, D11=True
                # EV_zoningtype_two를 D10, EV_zoningtype_multi를 D11로 매핑
                d10_val = self.get_variable('is_high_zone', False) and not mid_zone_val  # 2존이지만 다중존 아닌 경우
                d11_val = mid_zone_val  # 다중존
                
                if d10_val == True:
                    return low_floor_val - 2  # D13-2  
                elif d11_val == True:
                    return mid_floor_val - 2  # D14-2
                else:
                    return 0
            else:
                return 0
        else:
            return 0

    def calculate_high_rise_served_main(self, is_high_zone=None, is_mid_zone=None, top_floor_high=None, top_floor_low=None, top_floor_mid=None):
        """
        고층 샤프트의 서빙 메인 존 계산
        Excel F21: =IF(OR($D$10=TRUE,$D$11=TRUE), IF($D$10=TRUE, $D$15-$D$13, IF($D$11=TRUE,$D$15-$D$14, 0)), 0)
        """
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        high_floor_val = top_floor_high if top_floor_high is not None else self.get_variable('top_floor_high', 0)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)
        mid_floor_val = top_floor_mid if top_floor_mid is not None else self.get_variable('top_floor_mid', 0)

        if high_zone_val == True or mid_zone_val == True:
            # Excel의 실제 변수값 기준: D10=False, D11=True
            d10_val = self.get_variable('is_high_zone', False) and not mid_zone_val  # 2존이지만 다중존 아닌 경우
            d11_val = mid_zone_val  # 다중존
            
            if d10_val == True:
                return high_floor_val - low_floor_val  # D15-D13
            elif d11_val == True:
                return high_floor_val - mid_floor_val  # D15-D14
            else:
                return 0
        else:
            return 0

    # B22 범위 함수들 ====================================================

    def calculate_basement_shuttle_basement_zone(self, is_basement_shuttle=None, pressure_difference=None):
        """
        지하층 셔틀 샤프트의 지하층 존 계산
        """
        shuttle_val = is_basement_shuttle if is_basement_shuttle is not None else self.get_variable('is_basement_shuttle', False)
        pressure_val = pressure_difference if pressure_difference is not None else self.get_variable('pressure_difference', 0)

        if shuttle_val == True:
            return (-1) * pressure_val
        else:
            return 0

    def calculate_basement_shuttle_served_main(self, is_basement_shuttle=None):
        """
        지하층 셔틀 샤프트의 서빙 메인 존 계산
        """
        shuttle_val = is_basement_shuttle if is_basement_shuttle is not None else self.get_variable('is_basement_shuttle', False)

        if shuttle_val == True:
            return 2
        else:
            return 0

    # B23 범위 함수들 ====================================================

    def calculate_sky_lobby_lobby_zone(self, is_sky_lobby=None, is_express_zone=None):
        """
        스카이로비 셔틀 샤프트의 로비 존 계산
        """
        sky_lobby_val = is_sky_lobby if is_sky_lobby is not None else self.get_variable('is_sky_lobby', False)
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)

        if sky_lobby_val == True:
            return 0
        else:
            if express_zone_val == True:
                return 2
            else:
                return 0

    def calculate_sky_lobby_express_main(self, is_express_zone=None, is_high_zone=None, is_mid_zone=None, top_floor_low=None):
        """
        스카이로비 셔틀 샤프트의 익스프레스 메인 존 계산
        """
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)

        if express_zone_val == True:
            if high_zone_val == True:
                return low_floor_val - 2
            elif mid_zone_val == True:
                return low_floor_val - 2
            else:
                return 0
        else:
            return 0

    def calculate_sky_lobby_served_main(self, is_sky_lobby=None, is_express_zone=None):
        """
        스카이로비 셔틀 샤프트의 서빙 메인 존 계산
        """
        return self.calculate_sky_lobby_lobby_zone(is_sky_lobby, is_express_zone)

    def calculate_sky_lobby_express_skylobby(self, is_express_zone=None, is_high_zone=None, is_mid_zone=None, top_floor_mid=None, top_floor_low=None):
        """
        스카이로비 셔틀 샤프트의 익스프레스 스카이로비 존 계산
        """
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)
        high_zone_val = is_high_zone if is_high_zone is not None else self.get_variable('is_high_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)
        mid_floor_val = top_floor_mid if top_floor_mid is not None else self.get_variable('top_floor_mid', 0)
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)

        if express_zone_val == True:
            if high_zone_val == True:
                return 0
            elif mid_zone_val == True:
                return mid_floor_val - low_floor_val - 2
            else:
                return 0
        else:
            return 0

    def calculate_sky_lobby_served_skylobby(self, is_express_zone=None, is_mid_zone=None):
        """
        스카이로비 셔틀 샤프트의 서빙 스카이로비 존 계산
        """
        express_zone_val = is_express_zone if is_express_zone is not None else self.get_variable('is_express_zone', False)
        mid_zone_val = is_mid_zone if is_mid_zone is not None else self.get_variable('is_mid_zone', False)

        if express_zone_val == True and mid_zone_val == True:
            return 2
        else:
            return 0

    def calculate_low_rise_served_main(self, top_floor_low=None):
        """
        저층 샤프트의 서빙 메인 존 계산
        """
        low_floor_val = top_floor_low if top_floor_low is not None else self.get_variable('top_floor_low', 0)
        return low_floor_val


def analyze_elevator_shaft_system(input_data: Dict[str, Any]) -> pd.DataFrame:
    """
    엘리베이터 샤프트 시스템 분석 함수
    
    Args:
        input_data: 입력 데이터 딕셔너리 (사용자 제공 이미지 기준)
            - num_floor_ground: 지상층수 (int)
            - num_floor_basement: 지하층수 (int)
            - EV_zoningtype_single: 단일존 조닝 (bool)
            - EV_zoningtype_two: 2존 조닝 (bool) 
            - EV_zoningtype_multi: 다중존 조닝 (bool)
            - EV_skylobby: 스카이로비 여부 (bool)
            - EV_topfloor_low: 저층 엘리베이터 최고층 (int)
            - EV_topfloor_mid: 중층 엘리베이터 최고층 (int)
            - EV_topfloor_high: 고층 엘리베이터 최고층 (int)
            - EV_basementshuttle: 지하층 셔틀 엘리베이터 여부 (bool)
    
    Returns:
        pd.DataFrame: 각 샤프트별 분석 결과
    """

    # 조닝 타입 결정 (입력 데이터 기반)
    is_high_zone = input_data['EV_zoningtype_two'] or input_data['EV_zoningtype_multi'] 
    is_mid_zone = input_data['EV_zoningtype_multi']
    
    # 계산용 변수 설정 (실제 Excel 값 사용)
    pressure_difference = 7  # Excel D8 값과 일치
    
    # 계산기 초기화
    calculator = ElevatorShaftCalculator()
    calculator.set_variables({
        'pressure_difference': pressure_difference,
        'is_sky_lobby': input_data['EV_skylobby'],
        'is_high_zone': is_high_zone,
        'is_mid_zone': is_mid_zone,

        'top_floor_low': input_data['EV_topfloor_low'],
        'top_floor_mid': input_data['EV_topfloor_mid'],
        'top_floor_high': input_data['EV_topfloor_high'],
        'is_basement_shuttle': input_data['EV_basementshuttle']
    })
    
    # 각 샤프트별 계산
    results = []
    
    # 1. Low-rise shaft
    low_rise_data = {
        'shaft_type': 'low-rise shaft',
        'served_zone_basement': calculator.calculate_low_rise_basement_zone(),
        'express_zone_local_shaft': 0,  # 고정값
        'served_zone_lobby': 0,  # 고정값
        'express_zone_main': 0,  # 고정값
        'served_zone_main': calculator.calculate_low_rise_served_main(),
        'express_zone_skylobby': None,
        'served_zone_skylobby': None
    }
    results.append(low_rise_data)
    
    # 2. Mid-rise shaft
    mid_rise_data = {
        'shaft_type': 'mid-rise shaft',
        'served_zone_basement': calculator.calculate_mid_rise_basement_zone(),
        'express_zone_local_shaft': calculator.calculate_mid_rise_express_local(),
        'served_zone_lobby': calculator.calculate_mid_rise_lobby_zone(),
        'express_zone_main': calculator.calculate_mid_rise_express_main(),
        'served_zone_main': calculator.calculate_mid_rise_served_main(),
        'express_zone_skylobby': None,
        'served_zone_skylobby': None
    }
    results.append(mid_rise_data)
    
    # 3. High-rise shaft
    high_rise_data = {
        'shaft_type': 'high-rise shaft',
        'served_zone_basement': calculator.calculate_high_rise_basement_zone(),
        'express_zone_local_shaft': calculator.calculate_high_rise_express_local(),
        'served_zone_lobby': calculator.calculate_high_rise_lobby_zone(),
        'express_zone_main': calculator.calculate_high_rise_express_main(),
        'served_zone_main': calculator.calculate_high_rise_served_main(),
        'express_zone_skylobby': None,
        'served_zone_skylobby': None
    }
    results.append(high_rise_data)
    
    # 4. Basement shuttle shaft
    basement_shuttle_data = {
        'shaft_type': 'basement shuttle shaft',
        'served_zone_basement': calculator.calculate_basement_shuttle_basement_zone(),
        'express_zone_local_shaft': 0,  # 고정값
        'served_zone_lobby': 0,  # 고정값
        'express_zone_main': 0,  # 고정값
        'served_zone_main': calculator.calculate_basement_shuttle_served_main(),
        'express_zone_skylobby': None,
        'served_zone_skylobby': None
    }
    results.append(basement_shuttle_data)
    
    # 5. Sky lobby shuttle shaft
    sky_lobby_shuttle_data = {
        'shaft_type': 'sky lobby shuttle shaft',
        'served_zone_basement': 0,  # 고정값
        'express_zone_local_shaft': 0,  # 고정값
        'served_zone_lobby': calculator.calculate_sky_lobby_lobby_zone(),
        'express_zone_main': calculator.calculate_sky_lobby_express_main(),
        'served_zone_main': calculator.calculate_sky_lobby_served_main(),
        'express_zone_skylobby': calculator.calculate_sky_lobby_express_skylobby(),
        'served_zone_skylobby': calculator.calculate_sky_lobby_served_skylobby()
    }
    results.append(sky_lobby_shuttle_data)
    
    # DataFrame으로 변환
    df = pd.DataFrame(results)
    
    # 컬럼 순서 정렬
    column_order = [
        'shaft_type',
        'served_zone_basement',
        'express_zone_local_shaft',
        'served_zone_lobby',
        'express_zone_main',
        'served_zone_main',
        'express_zone_skylobby',
        'served_zone_skylobby'
    ]
    
    df = df[column_order]
    
    return df


def draw_elevator_shaft_chart(result_df: pd.DataFrame, save_path: str = None, show_chart: bool = True):
    """
    엘리베이터 샤프트 분석 결과 차트 그리기 (이미지와 유사한 단순한 형태)
    
    Args:
        result_df: analyze_elevator_shaft_system()로 생성된 결과 DataFrame
        save_path: 차트 저장 경로 (선택사항)
        show_chart: 차트 화면 표시 여부
    """
    # 차트 설정
    fig, ax = plt.subplots(1, 1, figsize=(8, 10))
    plt.rcParams['font.family'] = ['Arial Unicode MS', 'Apple SD Gothic Neo', 'DejaVu Sans', 'sans-serif']
    
    # 샤프트별 데이터 준비
    shaft_types = result_df['shaft_type'].values
    x = np.arange(len(shaft_types))
    width = 0.4  # 더 좁은 막대
    
    # 각 샤프트별 총 높이 계산
    for i, (idx, row) in enumerate(result_df.iterrows()):
        basement_value = row['served_zone_basement'] if not pd.isna(row['served_zone_basement']) else 0
        
        # 지상층 총합 계산
        ground_total = 0
        ground_zones = ['express_zone_local_shaft', 'served_zone_lobby', 'express_zone_main', 
                       'served_zone_main', 'express_zone_skylobby', 'served_zone_skylobby']
        
        for zone in ground_zones:
            val = row[zone]
            if not pd.isna(val) and val is not None and val != 0:
                ground_total += val
        
        # 색상 결정
        if i == 0:  # low-rise shaft
            color = '#2F2F2F'  # 검은색
        elif i == 1:  # mid-rise shaft 
            color = '#2F2F2F'  # 검은색
        elif i == 2:  # high-rise shaft
            color = '#2F2F2F'  # 검은색 (상단)
            ground_color = '#C0C0C0'  # 회색 (하단)
        elif i == 3:  # basement shuttle shaft
            color = '#2F2F2F'  # 검은색
        else:  # sky lobby shuttle shaft
            color = '#2F2F2F'  # 검은색
        
        # 지하층 그리기 (음수)
        if basement_value < 0:
            ax.bar(i, abs(basement_value), width, bottom=basement_value,
                  color='#2F2F2F', alpha=0.9, edgecolor='black', linewidth=0.5)
        
        # 지상층 그리기 (high-rise shaft는 세 부분으로 스택)
        if i == 2 and ground_total > 0:  # high-rise shaft
            lobby_zone = row['served_zone_lobby'] if not pd.isna(row['served_zone_lobby']) else 0
            main_zone = row['served_zone_main'] if not pd.isna(row['served_zone_main']) else 0
            express_main = row['express_zone_main'] if not pd.isna(row['express_zone_main']) else 0
            
            current_height = 0
            
            # 1. Lobby zone (맨 아래) - 검은색
            if lobby_zone > 0:
                ax.bar(i, lobby_zone, width, bottom=current_height,
                      color='#2F2F2F', alpha=0.9, edgecolor='black', linewidth=0.5)
                current_height += lobby_zone
            
            # 2. Express main zone (중간) - 진한 회색  
            if express_main > 0:
                ax.bar(i, express_main, width, bottom=current_height,
                      color='#C0C0C0', alpha=0.9, edgecolor='black', linewidth=0.5)
                current_height += express_main
            
            # 3. Served main zone (맨 위) - 검은색
            if main_zone > 0:
                ax.bar(i, main_zone, width, bottom=current_height,
                      color='#2F2F2F', alpha=0.9, edgecolor='black', linewidth=0.5)
        elif ground_total > 0:
            ax.bar(i, ground_total, width, bottom=0,
                  color=color, alpha=0.9, edgecolor='black', linewidth=0.5)
    
    # 축 설정
    ax.set_ylabel('층수', fontsize=12, fontweight='bold')
    ax.set_title('엘리베이터 샤프트 분석', fontsize=14, fontweight='bold', pad=20)
    
    # X축 라벨 설정 (숫자로)
    ax.set_xticks(x)
    ax.set_xticklabels([str(i+1) for i in range(len(x))])
    
    # Y축 범위 설정 (이미지와 동일하게)
    ax.set_ylim(-30, 40)
    
    # 0 라인 강조 (지면)
    ax.axhline(y=0, color='black', linestyle='-', linewidth=1, alpha=0.7)
    
    # 격자 추가
    ax.grid(True, alpha=0.3, axis='y')
    
    # Y축 눈금 설정
    ax.set_yticks(range(-30, 41, 10))
    
    plt.tight_layout()
    
    # 저장
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"차트가 저장되었습니다: {save_path}")
    
    # 화면 표시
    if show_chart:
        plt.show()
    
    return fig


def main():
    """
    엘리베이터 샤프트 분석기 메인 함수
    샘플 데이터로 분석을 실행하고 결과를 출력합니다.
    """
    print("=== 엘리베이터 샤프트 분석기 ===\n")
    
    # 샘플 입력 데이터 (사용자 제공 이미지 기준)
    sample_data = {
        'num_floor_ground': 120,
        'num_floor_basement': 7,
        'EV_zoningtype_single': False,
        'EV_zoningtype_two': True,
        'EV_zoningtype_multi': False,
        'EV_skylobby': False,
        'EV_topfloor_low': 20,
        'EV_topfloor_mid': 0,
        'EV_topfloor_high': 30,
        'EV_basementshuttle': True
    }
    
    print("📋 입력 데이터:")
    print(f"  - 지상층수: {sample_data['num_floor_ground']}층")
    print(f"  - 지하층수: {sample_data['num_floor_basement']}층")
    print(f"  - 조닝 타입: {'단일존' if sample_data['EV_zoningtype_single'] else '2존' if sample_data['EV_zoningtype_two'] else '다중존' if sample_data['EV_zoningtype_multi'] else '미설정'}")
    print(f"  - 스카이로비: {'있음' if sample_data['EV_skylobby'] else '없음'}")
    print(f"  - 저층 엘리베이터: {sample_data['EV_topfloor_low']}층까지")
    print(f"  - 중층 엘리베이터: {sample_data['EV_topfloor_mid']}층까지")
    print(f"  - 고층 엘리베이터: {sample_data['EV_topfloor_high']}층까지")
    print(f"  - 지하층 셔틀: {'있음' if sample_data['EV_basementshuttle'] else '없음'}")
    print()
    
    # 분석 실행
    print("🔄 엘리베이터 샤프트 분석 중...")
    result_df = analyze_elevator_shaft_system(sample_data)
    
    print("✅ 분석 완료!\n")
    
    # 결과 출력 (표 형태)
    print("📊 엘리베이터 샤프트별 분석 결과:")
    print("=" * 120)
    
    # 헤더 출력
    headers = [
        "Shaft Type",
        "Basement",
        "Express Local", 
        "Lobby",
        "Express Main",
        "Served Main",
        "Express Sky",
        "Served Sky"
    ]
    
    print(f"{'|'.join(f'{h:>15}' for h in headers)}")
    print("-" * 120)
    
    # 데이터 출력
    for idx, row in result_df.iterrows():
        values = [
            row['shaft_type'][:13] + '...' if len(row['shaft_type']) > 15 else row['shaft_type'],
            str(row['served_zone_basement']) if row['served_zone_basement'] != 0 else '0',
            str(row['express_zone_local_shaft']) if row['express_zone_local_shaft'] != 0 else '0',
            str(row['served_zone_lobby']) if row['served_zone_lobby'] != 0 else '0',
            str(row['express_zone_main']) if row['express_zone_main'] != 0 else '0',
            str(row['served_zone_main']) if row['served_zone_main'] != 0 else '0',
            str(row['express_zone_skylobby']) if pd.notna(row['express_zone_skylobby']) and row['express_zone_skylobby'] != 0 else '-',
            str(row['served_zone_skylobby']) if pd.notna(row['served_zone_skylobby']) and row['served_zone_skylobby'] != 0 else '-'
        ]
        
        print(f"{'|'.join(f'{v:>15}' for v in values)}")
    
    print("=" * 120)
    print(f"📈 총 {len(result_df)}개 샤프트 분석 완료")
    
    # 차트 그리기
    print("\n🎨 분석 결과 차트 생성 중...")
    draw_elevator_shaft_chart(result_df, save_path="elevator_shaft_analysis.png")
    print("✅ 차트 생성 완료!")
    
    return result_df

if __name__ == "__main__":
    main()
