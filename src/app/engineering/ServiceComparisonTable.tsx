import React from 'react';

export default function ServiceComparisonTable() {
  return (
    <section className="service-comparison-wrap">
      <div className="integration-plus-icon" aria-hidden="true">
        <svg className="integration-plus-svg" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="integration-media">
        <div className="integration-media-area">
          <span className="integration-media-placeholder">
            이미지 영역 (교체 가능)
            <br />
            1920x1080 권장
          </span>
        </div>

        <button type="button" className="integration-media-cta">
          연돌효과 통합 엔지니어링 알아보기
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>
    </section>
  );
}
