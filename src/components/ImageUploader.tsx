import { useState, ChangeEvent } from 'react';

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <label className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        {preview ? (
          <img src={preview} alt="preview" className="preview-image" />
        ) : (
          <div className="upload-placeholder">이미지를 업로드하세요</div>
        )}
      </label>

      <style jsx>{`
        .upload-box {
          display: block;
          width: 100%;
          height: 200px;
          border: 2px dashed #ccc;
          border-radius: 8px;
          cursor: pointer;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
