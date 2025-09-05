/**
 * 엘리베이터 샤프트 분석 모듈 (결과를 배열 형태로만 반환)
 */

export type ElevatorInput = {
  numFloorGround: number;
  numFloorBasement: number;
  EVZoningtypeSingle: boolean;
  EVZoningtypeTwo: boolean;
  EVZoningtypeMulti: boolean;
  EVSkylobby: boolean;
  EVTopfloorLow: number;
  EVTopfloorMid: number;
  EVTopfloorHigh: number;
  EVBasementshuttle: boolean;
};

export type ShaftResult = {
  shaftType: string;
  servedZoneBasement: number;
  expressZoneLocalShaft: number;
  servedZoneLobby: number;
  expressZoneMain: number;
  servedZoneMain: number;
  //   expressZoneSkylobby: number | null;
  //   servedZoneSkylobby: number | null;
};

/**
 * 엘리베이터 샤프트 계산 엔진
 */
class ElevatorShaftCalculator {
  private variables: Record<string, any> = {};

  getVariable<T = any>(name: string, defaultValue: T | null = null): T | null {
    return this.variables[name] !== undefined ? (this.variables[name] as T) : defaultValue;
  }

  setVariables(vars: Record<string, any>) {
    Object.assign(this.variables, vars);
  }

  // === Low-rise ===
  calculateLowRiseBasementZone(
    isBasementShuttle: boolean | null = null,
    pressureDifference: number | null = null
  ) {
    const shuttle = isBasementShuttle ?? this.getVariable('isBasementShuttle', false) ?? false;
    const pressure = pressureDifference ?? this.getVariable('pressureDifference', 0) ?? 0;
    return shuttle === false ? -pressure : 0;
  }

  calculateLowRiseServedMain(topFloorLow: number | null = null) {
    const lowFloorVal = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    return lowFloorVal;
  }

  // === Mid-rise ===
  calculateMidRiseBasementZone(
    isMidZone: boolean | null = null,
    isBasementShuttle: boolean | null = null,
    pressureDifference: number | null = null
  ) {
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const shuttle = isBasementShuttle ?? this.getVariable('isBasementShuttle', false) ?? false;
    const pressure = pressureDifference ?? this.getVariable('pressureDifference', 0) ?? 0;
    if (mid && !shuttle) {
      // TODO: #REF! 부분은 실제 조건 확인 필요
      return 0;
    }
    return 0;
  }

  calculateMidRiseExpressLocal() {
    return 0;
  }

  calculateMidRiseLobbyZone(isMidZone: boolean | null = null) {
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    return mid ? 2 : 0;
  }

  calculateMidRiseExpressMain(
    isMidZone: boolean | null = null,
    isExpressZone: boolean | null = null,
    topFloorLow: number | null = null
  ) {
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    const low = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    if (mid && !express) return low - 2;
    return 0;
  }

  calculateMidRiseServedMain(
    isMidZone: boolean | null = null,
    topFloorMid: number | null = null,
    topFloorLow: number | null = null
  ) {
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const midTop = topFloorMid ?? this.getVariable('topFloorMid', 0) ?? 0;
    const lowTop = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    return mid ? midTop - lowTop : 0;
  }

  // === High-rise ===
  calculateHighRiseBasementZone(
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    isBasementShuttle: boolean | null = null,
    pressureDifference: number | null = null
  ) {
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const shuttle = isBasementShuttle ?? this.getVariable('isBasementShuttle', false) ?? false;
    const pressure = pressureDifference ?? this.getVariable('pressureDifference', 0) ?? 0;
    if ((high || mid) && !shuttle) {
      return 0; // TODO: #REF! 확인 필요
    }
    return 0;
  }

  calculateHighRiseExpressLocal(
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    isExpressZone: boolean | null = null,
    topFloorLow: number | null = null,
    topFloorMid: number | null = null
  ) {
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    const low = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    const midTop = topFloorMid ?? this.getVariable('topFloorMid', 0) ?? 0;
    if (high || mid) {
      if (!express) return 0;
      return high ? low : midTop;
    }
    return 0;
  }

  calculateHighRiseLobbyZone(
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    isExpressZone: boolean | null = null
  ) {
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    if (high || mid) return !express ? 2 : 0;
    return 0;
  }

  calculateHighRiseExpressMain(
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    topFloorLow: number | null = null,
    topFloorMid: number | null = null
  ) {
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const skyLobby = this.getVariable('isSkyLobby', false) ?? false;
    const low = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    const midTop = topFloorMid ?? this.getVariable('topFloorMid', 0) ?? 0;
    if ((high || mid) && !skyLobby) {
      if (high && !mid) return low - 2;
      if (mid) return midTop - 2;
    }
    return 0;
  }

  calculateHighRiseServedMain(
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    topFloorHigh: number | null = null,
    topFloorLow: number | null = null,
    topFloorMid: number | null = null
  ) {
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const highTop = topFloorHigh ?? this.getVariable('topFloorHigh', 0) ?? 0;
    const lowTop = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    const midTop = topFloorMid ?? this.getVariable('topFloorMid', 0) ?? 0;
    if (high && !mid) return highTop - lowTop;
    if (mid) return highTop - midTop;
    return 0;
  }

  // === Basement shuttle ===
  calculateBasementShuttleBasementZone(
    isBasementShuttle: boolean | null = null,
    pressureDifference: number | null = null
  ) {
    const shuttle = isBasementShuttle ?? this.getVariable('isBasementShuttle', false) ?? false;
    const pressure = pressureDifference ?? this.getVariable('pressureDifference', 0) ?? 0;
    return shuttle ? -pressure : 0;
  }

  calculateBasementShuttleServedMain(isBasementShuttle: boolean | null = null) {
    const shuttle = isBasementShuttle ?? this.getVariable('isBasementShuttle', false) ?? false;
    return shuttle ? 2 : 0;
  }

  // === Sky lobby shuttle ===
  calculateSkyLobbyLobbyZone(
    isSkyLobby: boolean | null = null,
    isExpressZone: boolean | null = null
  ) {
    const sky = isSkyLobby ?? this.getVariable('isSkyLobby', false) ?? false;
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    if (sky) return 0;
    return express ? 2 : 0;
  }

  calculateSkyLobbyExpressMain(
    isExpressZone: boolean | null = null,
    isHighZone: boolean | null = null,
    isMidZone: boolean | null = null,
    topFloorLow: number | null = null
  ) {
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    const high = isHighZone ?? this.getVariable('isHighZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const low = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    if (express) {
      if (high || mid) return low - 2;
    }
    return 0;
  }

  calculateSkyLobbyServedMain(
    isSkyLobby: boolean | null = null,
    isExpressZone: boolean | null = null
  ) {
    return this.calculateSkyLobbyLobbyZone(isSkyLobby, isExpressZone);
  }

  calculateSkyLobbyExpressSkylobby(
    isExpressZone: boolean | null = null,
    isMidZone: boolean | null = null,
    topFloorMid: number | null = null,
    topFloorLow: number | null = null
  ) {
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    const midTop = topFloorMid ?? this.getVariable('topFloorMid', 0) ?? 0;
    const lowTop = topFloorLow ?? this.getVariable('topFloorLow', 0) ?? 0;
    if (express && mid) return midTop - lowTop - 2;
    return 0;
  }

  calculateSkyLobbyServedSkylobby(
    isExpressZone: boolean | null = null,
    isMidZone: boolean | null = null
  ) {
    const express = isExpressZone ?? this.getVariable('isExpressZone', false) ?? false;
    const mid = isMidZone ?? this.getVariable('isMidZone', false) ?? false;
    return express && mid ? 2 : 0;
  }
}

/**
 * 분석 함수 → 결과 배열만 반환
 */
export function analyzeElevatorShaftSystem(input: ElevatorInput): ShaftResult[] {
  const isHighZone = input.EVZoningtypeTwo || input.EVZoningtypeMulti;
  const isMidZone = input.EVZoningtypeMulti;
  const pressureDifference = 7;

  const calc = new ElevatorShaftCalculator();
  calc.setVariables({
    pressureDifference,
    isSkyLobby: input.EVSkylobby,
    isHighZone,
    isMidZone,
    topFloorLow: input.EVTopfloorLow,
    topFloorMid: input.EVTopfloorMid,
    topFloorHigh: input.EVTopfloorHigh,
    isBasementShuttle: input.EVBasementshuttle,
  });

  return [
    {
      shaftType: 'low-rise shaft',
      servedZoneBasement: calc.calculateLowRiseBasementZone(),
      expressZoneLocalShaft: 0,
      servedZoneLobby: 0,
      expressZoneMain: 0,
      servedZoneMain: calc.calculateLowRiseServedMain(),
      //   expressZoneSkylobby: null,
      //   servedZoneSkylobby: null,
    },
    {
      shaftType: 'mid-rise shaft',
      servedZoneBasement: calc.calculateMidRiseBasementZone(),
      expressZoneLocalShaft: calc.calculateMidRiseExpressLocal(),
      servedZoneLobby: calc.calculateMidRiseLobbyZone(),
      expressZoneMain: calc.calculateMidRiseExpressMain(),
      servedZoneMain: calc.calculateMidRiseServedMain(),
      //   expressZoneSkylobby: null,
      //   servedZoneSkylobby: null,
    },
    {
      shaftType: 'high-rise shaft',
      servedZoneBasement: calc.calculateHighRiseBasementZone(),
      expressZoneLocalShaft: calc.calculateHighRiseExpressLocal(),
      servedZoneLobby: calc.calculateHighRiseLobbyZone(),
      expressZoneMain: calc.calculateHighRiseExpressMain(),
      servedZoneMain: calc.calculateHighRiseServedMain(),
      //   expressZoneSkylobby: null,
      //   servedZoneSkylobby: null,
    },
    {
      shaftType: 'basement shuttle shaft',
      servedZoneBasement: calc.calculateBasementShuttleBasementZone(),
      expressZoneLocalShaft: 0,
      servedZoneLobby: 0,
      expressZoneMain: 0,
      servedZoneMain: calc.calculateBasementShuttleServedMain(),
      //   expressZoneSkylobby: null,
      //   servedZoneSkylobby: null,
    },
    {
      shaftType: 'sky lobby shuttle shaft',
      servedZoneBasement: 0,
      expressZoneLocalShaft: 0,
      servedZoneLobby: calc.calculateSkyLobbyLobbyZone(),
      expressZoneMain: calc.calculateSkyLobbyExpressMain(),
      servedZoneMain: calc.calculateSkyLobbyServedMain(),
      //   expressZoneSkylobby: calc.calculateSkyLobbyExpressSkylobby(),
      //   servedZoneSkylobby: calc.calculateSkyLobbyServedSkylobby(),
    },
  ];
}

/**
 * 샘플 실행 → 결과 배열 반환
 */
export function runSampleAnalysis(): ShaftResult[] {
  return analyzeElevatorShaftSystem({
    numFloorGround: 120,
    numFloorBasement: 7,
    EVZoningtypeSingle: false,
    EVZoningtypeTwo: true,
    EVZoningtypeMulti: false,
    EVSkylobby: false,
    EVTopfloorLow: 20,
    EVTopfloorMid: 0,
    EVTopfloorHigh: 30,
    EVBasementshuttle: true,
  });
}
