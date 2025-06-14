"use client";
import React, { useState } from "react";
import '@/css/projects.css'
import Image from 'next/image';
import { FaBookOpen } from "react-icons/fa";
import lotteTowerImg from '@/assets/images/lotte-tower.jpg';
import pdfFileIcon from '@/assets/icons/icon-pdf.png';

const accordionData = [
  {
    title: "연돌현상이란?",
    content: (
      <div className="flex flex-col md:flex-col gap-6 intro">
        <div className="intro-text">
          연돌효과(Stack Effect, Chimney Effect)는 건물 내부와 외부의 온도 차이로 인해 발생하는 
          공기의 수직 방향 흐름을 의미한다. 이는 내부의 따뜻한 공기가 상부로 상승하고, 하부에는 
          외부의 차가운 공기가 유입되는 현상으로, 굴뚝에서 뜨거운 공기가 상승하는 원리와 유사하다. 
          연돌효과는 건물의 높이, 기밀성(Airtightness), 실내외 온도 차이, 
          개구부(출입문, 창문, 덕트 등)의 위치 및 크기에 의해 크게 영향을 받는다.
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="flex-1 intro-text">
            연돌효과(Stack Effect, Chimney Effect)는 건물 내부와 외부의 온도 차이로 인해 
            발생하는 공기의 수직 방향 흐름을 의미한다. 이는 내부의 따뜻한 공기가 상부로 상승하고, 
            하부에는 외부의 차가운 공기가 유입되는 현상으로, 굴뚝에서 뜨거운 공기가 상승하는 
            원리와 유사하다. 
            <br/>연돌효과는 건물의 높이, 기밀성(Airtightness), 실내외 온도 차이, 
            개구부(출입문, 창문, 덕트 등)의 위치 및 크기에 의해 크게 영향을 받는다. 
            <br/>연돌효과는 건물의 높이, 기밀성(Airtightness), 실내외 온도 차이, 
            개구부(출입문, 창문, 덕트 등)의 위치 및 크기에 의해 크게 영향을 받는다. 
            <br/>연돌효과는 건물의 높이, 기밀성(Airtightness), 실내외 온도 차이, 
            개구부(출입문, 창문, 덕트 등)의 위치 및 크기에 의해 크게 영향을 받는다.
          </div>
          <div className="w-full flex-1 bg-gray-100 rounded flex items-center justify-center">
            {/* <span className="text-gray-400">이미지 영역</span> */}
            <div className="image-wrap rounded-lg overflow-hidden">
              <Image src={lotteTowerImg} alt={"이미지 영역"} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "연돌현상이 건물에 미치는 영향",
    content: (
      <div className="flex flex-col gap-10 md:flex-row md:gap-16 intro">
        <div className="flex-1 intro-text">
          연돌효과(Stack Effect, Chimney Effect)는 건물 내부와 외부의 온도 차이로 인해 
          발생하는 공기의 수직 방향 흐름을 의미한다. 이는 내부의 따뜻한 공기가 상부로 상승하고, 
          하부에는 외부의 차가운 공기가 유입되는 현상으로, 굴뚝에서 뜨거운 공기가 상승하는 원리와 
          유사하다. 연돌효과는 건물의 높이, 기밀성(Airtightness), 실내외 온도 차이, 
          개구부(출입문, 창문, 덕트 등)의 위치 및 크기에 의해 크게 영향을 받는다.
        </div>
        <div className="w-full flex-1 flex flex-col gap-2">
          <div className="bg-gray-100 rounded flex items-center justify-center" style={{height: '140px'}}>
            <span className="text-gray-400">이미지1</span>
          </div>
          <div className="bg-gray-100 rounded flex items-center justify-center" style={{height: '140px'}}>
            <span className="text-gray-400">이미지2</span>
          </div>
          <div className="bg-gray-100 rounded flex items-center justify-center" style={{height: '140px'}}>
            <span className="text-gray-400">이미지3</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "연돌현상이 발생하기 쉬운 건물 유형",
    content: <div className="intro intro-text">준비중입니다.</div>,
  },
  {
    title: "왜 연돌현상을 평가해야 합니까?",
    content: <div className="intro intro-text">준비중입니다.</div>,
  },
  {
    title: "사례연구",
    content: <div className="intro intro-text">준비중입니다.</div>,
  },
];

const techDocs = [
  {
    title: "Sed convallis scelerisque enim at fermentum",
    url: "#",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    url: "#",
  },
  {
    title: "Stack Effect in High-Rise Buildings: A Review of Causes and Solutions",
    url: "#",
  },
  {
    title: "연돌현상 관련 최신 연구 동향 및 사례 분석",
    url: "#",
  },
  {
    title: "Chimney Effect and Fire Safety in Modern Architecture",
    url: "#",
  },
];

export default function IntroPage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <div className="container mx-auto px-4 pt-16 pb-24">
      <h1 className="text-3xl font-bold mb-10">연돌현상 소개</h1>

      <div className="bg-white rounded-lg shadow py-2 px-8 mb-12">
        {accordionData.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div key={idx} className="border-b intro-acc">
              <button
                className="w-full flex items-center justify-between py-6 focus:outline-none"
                onClick={() => {
                  if (isOpen) {
                    setOpenIndexes(openIndexes.filter(i => i !== idx));
                  } else {
                    setOpenIndexes([...openIndexes, idx]);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{isOpen ? '➖' : '➕'}</span>
                  <span className="font-semibold text-lg text-left">{item.title}</span>
                </div>
              </button>
              {isOpen && (
                <div className="pb-6 pt-0">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 기술자료 게시판 */}
      <div className="rounded-lg py-8 px-4 md:px-10" 
        style={{ background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' }}>
        <h2 className="text-white text-2xl font-bold mb-5 flex items-center gap-3">
          <FaBookOpen className="text-3xl mt-1" />기술자료
        </h2>
        <div className="bg-transparent rounded-lg divide-y overflow-hidden">
          {techDocs.map((doc, i) => (
            <a
              key={i}
              href={doc.url}
              className="flex items-center px-4 py-3 gap-4 group hover:bg-blue-200 transition duration-300"
              // target="_blank"
              target="_self"
              rel="noopener noreferrer"
            >
              <span className="truncate text-white text-base flex-1 group-hover:text-blue-700"
                style={{
                  maxWidth: 'calc(100% - 40px)',
                }}
              >
                {doc.title}
              </span>
              <Image src={pdfFileIcon} alt={"pdf 다운로드"} className="icon-img-40" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 