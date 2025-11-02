import React from 'react';
import Image from 'next/image';
import ProcessImage from '@/assets/images/02_about_process.png';

export default function ServiceComparisonTable() {
  return (
    <section className="service-comparison-wrap">
      <div className="integration-plus-icon" aria-hidden="true">
        <svg className="integration-plus-svg" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="integration-media">
        <div
          className="integration-media-area"
          style={{ aspectRatio: `${ProcessImage.width} / ${ProcessImage.height}` }}
        >
          <Image
            src={ProcessImage}
            alt="BT Air Tech 연돌효과 엔지니어링 프로세스"
            priority
            className="integration-media-img"
            sizes="(max-width: 1024px) 90vw, 960px"
          />
        </div>

        <a href="https://btairtech.co.kr/" target="_blank" rel="noopener noreferrer" className="integration-media-cta">
          연돌효과 통합 엔지니어링 알아보기
          <span aria-hidden="true">&gt;</span>
        </a>
      </div>
    </section>
  );
}
