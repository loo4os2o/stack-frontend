import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  // title?: string;
  title?: string | ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  width?: string | number;
  hideCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 400,
  hideCloseButton = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // 1. 오버레이 클릭시 모달 닫힘힘
    // <div className="modal-overlay" onClick={onClose}>

    // 2. 오버레이 클릭해도 모달 닫히지 않음 (닫기 버튼을 누를때만 닫히도록 구현현)
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ width, minWidth: 280 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          {!hideCloseButton && (
            <button className="modal-close" onClick={onClose} aria-label="닫기">
              ×
            </button>
          )}
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          max-width: 95vw;
          max-height: 100vh;
          overflow: hidden;
          position: relative;
          padding: 0;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem 0.5rem 3.5rem;
          // border-bottom: 1px solid #eee;
        }
        .modal-title {
          // font-size: 1.3rem;
          // font-weight: 700;
          width: 95%;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 1.7rem;
          cursor: pointer;
          color: #888;
        }
        .modal-body {
          padding: 1.2rem 1.5rem;
          // border: 1px solid red;
          max-height: 65vh;
          overflow-y: auto;
        }
        .modal-footer {
          padding: 1rem 1.5rem 1.5rem 1.5rem;
          // border-top: 1px solid #eee;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
