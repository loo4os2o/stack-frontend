import React from 'react';

export default function ServiceComparisonTable() {
  return (
    <div className="service-comparison-wrap mt-24 mb-16">
      <h2 className="text-2xl font-bold mb-10 text-center">모든 서비스 비교</h2>
      <div className="overflow-x-auto">
        <table className="service-comparison-table w-full text-center border-collapse">
          <colgroup>
            <col width="15%" />
            <col width="15%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th className="w-24 bg-white"></th>
              <th colSpan={2} className="bg-blue-50 font-bold text-blue-700"
                style={{fontSize: '1.2rem'}}
              >연돌현상 예측 평가</th>
              <th className="bg-green-50 font-bold text-green-700"
                style={{fontSize: '1.2rem'}}
              >연돌현상 설계검토</th>
              <th className="bg-red-50 font-bold text-red-700"
                style={{fontSize: '1.2rem'}}
              >연돌현상 시뮬레이션</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td className="bg-blue-50">무료</td>
              <td className="bg-blue-50">00만원 부터</td>
              <td className="bg-green-50">000만원 부터</td>
              <td className="bg-red-50">000만원 부터</td>
            </tr>
            <tr>
              <td></td>
              <td className="bg-blue-50"><button className="btn-primary btn-xs">연돌현상 평가하기<br/><span className="text-xs text-blue-500">무료서비스</span></button></td>
              <td className="bg-blue-50"><button className="btn-primary btn-xs">서비스 요청하기</button></td>
              <td className="bg-green-50"><button className="btn-primary btn-xs">서비스 요청하기</button></td>
              <td className="bg-red-50"><button className="btn-primary btn-xs">서비스 요청하기</button></td>
            </tr>

            <tr>
              <td colSpan={5} className="font-bold text-red-500 text-left">연돌효과 예측</td>
            </tr>
            <tr>
              <td className="font-semibold">영향도 평가</td>
              <td colSpan={2} className="bg-blue-50">☑️ 건물 내 영향도 평가</td>
              <td className="bg-green-50">☑️ 건물 내 영향도 평가</td>
              <td className="bg-red-50">☑️ 건물 내 영향도 평가</td>
            </tr>
            <tr>
              <td className="font-semibold">압력차 평가</td>
              <td colSpan={2} className="bg-blue-50">☑️ 주요층 압력차 데이터</td>
              <td className="bg-green-50">☑️ 주요층 압력차 데이터</td>
              <td className="bg-red-50">☑️ 주요층 압력차 데이터</td>
            </tr>
            <tr>
              <td className="font-semibold">문제/하자 평가</td>
              <td colSpan={2} className="bg-blue-50">☑️ 문제예상 발생률</td>
              <td className="bg-green-50">☑️ 문제예상 발생률</td>
              <td className="bg-red-50">☑️ 문제예상 발생률</td>
            </tr>
            <tr>
              <td className="font-semibold">전문가 검토</td>
              <td className="bg-blue-50">-</td>
              <td className="bg-blue-50">☑️전문가 검토의견 및 요약서</td>
              <td className="bg-green-50">☑️ 전문가 검토의견 및 요약서</td>
              <td className="bg-red-50">☑️ 전문가 검토의견 및 요약서</td>
            </tr>

            <tr>
              <td colSpan={5} className="font-bold text-red-500">해결방안</td>
            </tr>
            <tr>
              <td className="font-semibold">개선안</td>
              <td className="bg-blue-50">☑️ 개선방향 목록</td>
              <td className="bg-blue-50">☑️ 개선안 리스트 및 상세 데이터</td>
              <td className="bg-green-50">☑️ 개선안 리스트 및 상세 데이터</td>
              <td className="bg-red-50">☑️ 개선안 리스트 및 상세 데이터</td>
            </tr>
            <tr>
              <td className="font-semibold">맞춤형개선안</td>
              <td colSpan={2} className="bg-blue-50">-</td>
              <td className="bg-green-50">☑️ 건축/설비 도면 검토를 통한 개선안</td>
              <td className="bg-red-50">☑️ 건축/설비 도면 검토를 통한 개선안</td>
            </tr>
            <tr>
              <td className="font-semibold">기밀화구획도</td>
              <td colSpan={2} className="bg-blue-50">-</td>
              <td className="bg-green-50">☑️ 기밀화 구획도</td>
              <td className="bg-red-50">☑️ 기밀화 구획도</td>
            </tr>

            <tr>
              <td colSpan={5} className="font-bold text-red-500">시뮬레이션</td>
            </tr>
            <tr>
              <td className="font-semibold">연돌현상 저감효과</td>
              <td colSpan={2} className="bg-blue-50">-</td>
              <td className="bg-green-50">-</td>
              <td className="bg-red-50">
                ☑️ 개선전략케이스별 저감효과 비교분석
                <span style={{visibility: 'hidden'}}>☑️</span> 개선전략케이스별 압력분포 그래프
              </td>
            </tr>
            <tr>
              <td className="font-semibold">에너지/비용평가</td>
              <td colSpan={2} className="bg-blue-50">-</td>
              <td className="bg-green-50">-</td>
              <td className="bg-red-50">☑️ 층별/존별 에너지 및 비용분석</td>
            </tr>
            <tr>
              <td className="font-semibold">건물공기 유동평가</td>
              <td colSpan={2} className="bg-blue-50">-</td>
              <td className="bg-green-50">-</td>
              <td className="bg-red-50">☑️ 층별/존별 공기유동 및 압력차분석</td>
            </tr>

            <tr>
              <td colSpan={5} className="font-bold text-red-500">결과물</td>
            </tr>
            <tr>
              <td className="font-semibold">주요 결과물</td>
              <td className="bg-blue-50">-</td>
              <td className="bg-blue-50 p-0 h-full align-top">
                <div className="flex flex-col h-full justify-end p-4"
                  style={{minHeight: '190px'}}
                >
                  <ul className="list-disc pl-4 mb-6 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                  </ul>
                  <button className="btn-primary btn-xs mt-auto">샘플 다운로드</button>
                </div>
              </td>
              <td className="bg-blue-50 p-0 h-full align-top">
                <div className="flex flex-col h-full justify-end p-4"
                  style={{minHeight: '190px'}}
                >
                  <ul className="list-disc pl-4 mb-6 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                    <li>개선안 반영 설계도면</li>
                  </ul>
                  <button className="btn-primary btn-xs mt-auto">샘플 다운로드</button>
                </div>
              </td>
              <td className="bg-blue-50 p-0 h-full align-top">
                <div className="flex flex-col h-full justify-end p-4"
                  style={{minHeight: '190px'}}
                >
                  <ul className="list-disc pl-4 mb-6 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                    <li>개선안 반영 설계도면</li>
                    <li>시뮬레이션 평가보고서</li>
                  </ul>
                  <button className="btn-primary btn-xs mt-auto">샘플 다운로드</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-semibold">소요시간</td>
              <td className="bg-blue-50">-</td>
              <td className="bg-blue-50">1~2일</td>
              <td className="bg-green-50">1~2주</td>
              <td className="bg-red-50">2~3주(프로젝트에 따라 상이)</td>
            </tr>

            <tr>
              <td colSpan={5} className="font-bold text-red-500">적정규모</td>
            </tr>
            <tr>
              <td className="font-semibold"></td>
              <td colSpan={2} className="bg-blue-50">~ 20층 규모 건물</td>
              <td className="bg-green-50">~ 30층 규모 건물</td>
              <td className="bg-red-50">~ 30층 규모 또는 30층 이상 건물</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
