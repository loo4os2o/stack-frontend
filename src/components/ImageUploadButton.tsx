'use client';

import { ChangeEvent } from 'react';

type Props = {
  onImageSelect: (previewUrl: string) => void;
};

export default function ImageUploadButton({ onImageSelect }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="upload-button">
      📁
      <input type="file" accept="image/*" onChange={handleChange} hidden />
      <style jsx>{`
        .upload-button {
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
          display: inline-block;
          // padding: 1rem;
          // border: 2px dashed #ccc;
          border-radius: 8px;
        }
      `}</style>
    </label>
  );
}
