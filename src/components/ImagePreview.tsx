'use client';

type Props = {
  previewUrl: string | null;
};

export default function ImagePreview({ previewUrl }: Props) {
  return (
    <div className="preview-container">
      {previewUrl ? (
        <img src={previewUrl} alt="preview" className="preview-image" />
      ) : (
        <div className="placeholder">이미지를 업로드하면 여기에 표시됩니다.</div>
      )}
      <style jsx>{`
        .preview-container {
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          border-radius: 8px;
          overflow: hidden;
        }

        .preview-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .placeholder {
          color: #888;
          font-size: 1rem;
          border: 0;
          background: none;
        }
      `}</style>
    </div>
  );
}
