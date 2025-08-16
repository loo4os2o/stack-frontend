import React from 'react';

export default function ServiceComparisonTable() {
  return (
    <div className="service-comparison-wrap">
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
              <th className="title"></th>
              <th className="title basic"
                style={{fontSize: '1.2rem'}}
              ><strong>BASIC</strong>연돌현상 예측 평가</th>
              <th className="title plus"
                style={{fontSize: '1.2rem'}}
              ><strong>PLUS</strong>연돌현상 예측 평가</th>
              <th className="title advanced"
                style={{fontSize: '1.2rem'}}
              ><strong>ADVANCED</strong>연돌현상 설계검토</th>
              <th className="title professional"
                style={{fontSize: '1.2rem'}}
              ><strong>PROFESSIONAL</strong>연돌현상 시뮬레이션</th>
            </tr>
            <tr>
              <th className="title2"></th>
              <th className="title2">무료
                <a href="/evaluation" className="btn-normal">연돌현상 평가하기</a>
              </th>
              <th className="title2">00만원부터
                <a href="/service-request" className="btn-normal">서비스 요청하기</a>
              </th>
              <th className="title2">00만원부터
                <a href="/service-request" className="btn-normal">서비스 요청하기</a>
              </th>
              <th className="title2">00만원부터
                <a href="/service-request" className="btn-normal">서비스 요청하기</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="title3">연돌효과 예측</td>
            </tr>
            <tr>
              <td className="td-label">영향도 평가</td>
              <td><span className='ok'></span> 건물 내 영향도 평가</td>
              <td><span className='ok'></span> 건물 내 영향도 평가</td>
              <td><span className='ok'></span> 건물 내 영향도 평가</td>
              <td><span className='ok'></span> 건물 내 영향도 평가</td>
            </tr>
            <tr>
              <td className="td-label">압력차 평가</td>
              <td><span className='ok'></span> 주요층 압력차 데이터</td>
              <td><span className='ok'></span> 주요층 압력차 데이터</td>
              <td><span className='ok'></span> 주요층 압력차 데이터</td>
              <td><span className='ok'></span> 주요층 압력차 데이터</td>
            </tr>
            <tr>
              <td className="td-label">문제/하자 평가</td>
              <td><span className='ok'></span> 문제 예상 발생률</td>
              <td><span className='ok'></span> 문제 예상 발생률</td>
              <td><span className='ok'></span> 문제 예상 발생률</td>
              <td><span className='ok'></span> 문제 예상 발생률</td>
            </tr>
            <tr>
              <td className="td-label">개선방향</td>
              <td><span className='ok'></span> 개선방향 목록</td>
              <td><span className='ok'></span> 개선방향 목록</td>
              <td><span className='ok'></span> 개선방향 목록</td>
              <td><span className='ok'></span> 개선방향 목록</td>
            </tr>

            <tr>
              <td colSpan={5} className="title3">전문가 검토</td>
            </tr>
            <tr>
              <td className="td-label"></td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 전문가 검토 의견 및 요약서</td>
              <td><span className='ok'></span> 전문가 검토 의견 및 요약서</td>
              <td><span className='ok'></span> 전문가 검토 의견 및 요약서</td>
            </tr>

            <tr>
              <td colSpan={5} className="title3">해결방안</td>
            </tr>
            <tr>
              <td className="td-label">저감효과</td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 문제 저감 및 냉난방부하 저감효과</td>
              <td><span className='ok'></span> 문제 저감 및 냉난방부하 저감효과</td>
              <td><span className='ok'></span> 문제 저감 및 냉난방부하 저감효과</td>
            </tr>
            <tr>
              <td className="td-label">개선안 리스트</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 개선안 리스트 및 상세 데이터</td>
              <td><span className='ok'></span> 개선안 리스트 및 상세 데이터</td>
            </tr>
            <tr>
              <td className="td-label">개선안 도면</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 건축/설비 도면 검토를 통한 개선안</td>
              <td><span className='ok'></span> 건축/설비 도면 검토를 통한 개선안</td>
            </tr>
            <tr>
              <td className="td-label">기밀화구획도</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 기밀화 구획도</td>
              <td><span className='ok'></span> 기밀화 구획도</td>
            </tr>

            <tr>
              <td colSpan={5} className="title3">시뮬레이션</td>
            </tr>
            <tr>
              <td className="td-label">공기유동 상세평가</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 층별/존별 공기유동 및 압력차 분석</td>
            </tr>
            <tr>
              <td className="td-label">연돌현상 저감효과</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 개선전략 케이스별 저감효과 비교분석</td>
            </tr>
            <tr>
              <td className="td-label">개선안 우선순위</td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='no'></span> </td>
              <td><span className='ok'></span> 개선전략 케이스별 우선 순위 평가</td>
            </tr>

            <tr>
              <td colSpan={5} className="title3">결과물</td>
            </tr>
            <tr>
              <td className="td-label">주요결과물</td>
              <td className="normal">-</td>
              <td className="normal h-full align-top">
                <div className="sample-download">
                  <ul className="list-disc pl-4 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                  </ul>
                  <button className="btn-normal w-full mt-3">샘플 다운로드</button>
                </div>
              </td>
              <td className="normal h-full align-top">
                <div className="sample-download">
                  <ul className="list-disc pl-4 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                    <li>개선안 반영 설계도면</li>
                  </ul>
                  <button className="btn-normal w-full mt-3">샘플 다운로드</button>
                </div>
              </td>
              <td className="normal h-full align-top">
                <div className="sample-download">
                  <ul className="list-disc pl-4 flex-1">
                    <li>기술대응 요약서</li>
                    <li>연돌현상 설계검토 결과</li>
                    <li>개선안 반영 설계도면</li>
                    <li>시뮬레이션 평가보고서</li>
                  </ul>
                  <button className="btn-normal w-full mt-3">샘플 다운로드</button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="td-label">에너지/비용평가</td>
              <td className="normal">-</td>
              <td className="normal">1~2일</td>
              <td className="normal">1~2주</td>
              <td className="normal">2~3주(프로젝트에 따라 상이)</td>
            </tr>

            <tr>
              <td colSpan={5} className="title3">적정규모</td>
            </tr>
            <tr>
            <td className="td-label"></td>
              <td className="normal">~ 20층 규모 건물</td>
              <td className="normal">~ 20층 규모 건물</td>
              <td className="normal">~ 30층 규모 건물</td>
              <td className="normal">~ 30층 규모 또는 30층 이상 건물</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
