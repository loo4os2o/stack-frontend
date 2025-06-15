"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from 'next/image';
import lotteTowerImg from '@/assets/images/lotte-tower.jpg';

// 임시 마이 프로젝트 타입
type MyProject = {
  name: string;
  number: string;
  date: string;
  usage: string;
  location: string;
  height: string;
  shaft: string;
  image?: string | StaticImageData | null;
};

// 예시 데이터 객체
const exampleProject = {
  name: "ABDC",
  number: "2025A01A",
  date: "2024-06-01",
  usage: "주거",
  location: "서울 강남구",
  height: "120m",
  shaft: "싱글존 샤프트",
  image: lotteTowerImg,
  // image: null,
};

export default function MyProjectPage() {
  // 실제로는 API 등에서 받아오겠지만, 임시로 useState로 관리
  const [myProject, setMyProject] = useState<MyProject | null>(exampleProject);
  const [tab, setTab] = useState(0);

  return (
    <div className="container mx-auto px-4 py-16" style={{minHeight: "60vh"}}>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">마이 프로젝트</h1>
        <button
          className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
          onClick={() => setMyProject(myProject ? null : exampleProject)}
        >
          {myProject ? '프로젝트가 없을때 (빈페이지)' : '프로젝트가 있을때'}
        </button>
      </div>
      {!myProject ? (
        <div className="flex flex-col items-center justify-center"
          style={{minHeight: '40vh'}}
        >
          <div className="text-lg text-gray-500 mb-8">마이 프로젝트가 없습니다.</div>
          <Link href="/evaluation">
            <button className="btn-primary login-active px-6 py-3 text-base">새프로젝트 평가하기</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* 왼쪽: 프로젝트 정보 */}
            <div className="lg:w-1/3 w-full">
              <table className="w-full text-base border-separate border-spacing-0 bg-white rounded-xl shadow-lg overflow-hidden">
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 rounded-tl-xl text-left align-middle">프로젝트명</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm rounded-tr-xl">{myProject.name}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle">프로젝트 번호</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">{myProject.number}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle">검토날짜</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">{myProject.date}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle">건물용도</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">{myProject.usage}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle">위치</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">{myProject.location}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle">건물 높이</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm">{myProject.height}</td>
                  </tr>
                  <tr className="transition hover:bg-blue-50 group">
                    <td style={{ background: '#0055A4' }} className="text-white font-medium px-6 py-4 w-40 text-left align-middle rounded-bl-xl">샤프트 계획</td>
                    <td className="bg-blue-0 px-6 py-4 text-left align-middle shadow-sm rounded-br-xl">{myProject.shaft}</td>
                  </tr>
                </tbody>
              </table>
              <Link href="/engineering">
                <button className="btn-primary px-4 py-3 mt-6 w-full">엔지니어링 서비스 문의하기</button>
              </Link>
            </div>
            {/* 가운데: 차트 영역 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              <div className="w-full bg-white rounded-xl shadow flex items-center justify-center border border-gray-100 shadow-lg"
                style={{height: "30rem"}}
              >
                <span className="text-gray-400">차트 영역</span>
              </div>
            </div>
            {/* 오른쪽: 대표 이미지 */}
            <div className="lg:w-1/3 w-full flex items-start justify-center">
              {myProject.image ? (
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                  style={{height: "30rem"}}
                >
                  <Image src={myProject.image} alt="대표 이미지" className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
                  style={{height: "30rem"}}
                >
                  <div className="text-gray-400">대표 이미지 없음</div>
                </div>
              )}
            </div>
          </div>
          {/* 탭 영역 */}
          <div className="border-b flex gap-2 mb-8">
            <button className={`px-4 py-2 font-medium ${tab === 0 ? "border-b-2 border-blue-900 bg-blue-900 text-white" : "text-gray-500"}`} onClick={() => setTab(0)}
              style={{width: "50%"}}
            >
              연돌효과 분석결과
            </button>
            <button className={`px-4 py-2 font-medium ${tab === 1 ? "border-b-2 border-blue-900 bg-blue-900 text-white" : "text-gray-500"}`} onClick={() => setTab(1)}
              style={{width: "50%"}}  
            >
              해결방안 및 저감효과
            </button>
          </div>
          <div className="min-h-[120px]">
            {tab === 0 ? (
              <div>
                <section>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className='w-full md:w-2/2 left'>
                      1. 분석 결과 요약<br/>
                      2. 연돌현상 예측 결과<br/>
                      3. 문제/하자 예상 결과<br/>
                      4. 압력차 검토 데이터
                    </div>
                  </div>
                </section>

                {/* 1. 분석 결과 요약 */}
                <section className="mt-8">
                  <div className='flex flex-col md:flex-row gap-8'>
                    <div className='w-full md:w-2/2 left'>
                      <h2 className="text-xl font-bold mb-6">
                        1. 분석 결과 요약
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border rounded-md text-center">
                          <div className="text-xl font-semibold mb-8">연돌현상 영향도</div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-red-500">상</div>
                              <div className="text-lg">연돌현상<br/>위험도</div>
                            </div>
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-orange-500">중</div>
                              <div className="text-lg">예상 하자<br/>발생도</div>
                            </div>
                            <div className="p-6 border rounded-full text-center">
                              <div className="text-3xl font-bold mb-2 text-[var(--primary-color)]">필요</div>
                              <div className="text-lg">엔지니어링<br/>권장도</div>
                            </div>
                          </div>
                          <div className="design-note text-left">
                            디자이너: 연돌현상 영향도 아이콘
                          </div>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">프로젝트 이름</div>
                          <div className="text-lg">
                            <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                            <p>건물 내부 기류 분석 결과, 연돌현상에 따른 공기 흐름 왜곡이 확인되었으며, 에너지 손실 및 화재 안전 측면에서 개선이 필요한 구조로 평가되었습니다.</p>
                          </div>
                          <div className="dev-note">
                            개발자: 평가 결과에 대한 전반적인 요약 텍스트가 들어갈 위치입니다.
                          </div>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">문제발생 예상층</div>
                          <p>본 건물은 실내외 온도 차 및 수직 높이에 따른 압력차로 인해 연돌현상이 발생할 수 있는 구조적 특성을 갖고 있으며, 특히 겨울철에는 하층부 외부 공기 유입과 상층부의 과도한 공기 배출 경향이 확인되었습니다. 이에 따라 환기 설비 및 샤프트 차압 제어가 필요한 것으로 평가됩니다.</p>
                          <div className='flex gap-8 mt-4'>
                            <div className="design-note flex-1">
                              디자이너: 
                            </div>
                            <div className="dev-note flex-1">
                              개발자: 차트
                            </div>
                          </div>
                        </div>
                        <div className="p-6 border rounded-md text-left h-full flex flex-col justify-between">
                          <div className="text-xl font-semibold mb-6">최대 연돌 압력차(PA)</div>
                          <p>CFD 시뮬레이션 결과, 외기와 실내의 온도차가 20℃ 이상일 경우 연돌 압력차가 최대 25Pa까지 증가하며, 이로 인해 계단실 및 엘리베이터 샤프트를 통한 공기 흐름이 상·하층 간 불균형을 유발하는 것으로 분석되었습니다.</p>
                          <div className='flex gap-8 mt-auto'>
                            <div className="design-note flex-1">
                              디자이너: 
                            </div>
                            <div className="dev-note flex-1">
                              개발자: 차트
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div>
                <section>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className='w-full md:w-2/2 left'>
                      1. 해결방안 개요<br/>
                      2. 개선안 리스트<br/>
                      3. 연돌현상 설계검토 및 시뮬레이션
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 