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
  headerPadding?: string;
  titlePadding?: string;
  bodyPadding?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 400,
  hideCloseButton = false,
  headerPadding = '2.5rem 2.5rem 0 2.5rem',
  titlePadding = '0 0 2rem 0',
  bodyPadding = '2rem 1.8rem 2rem 2.5rem',
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
        <div className="modal-header" style={{ padding: headerPadding }}>
          <div className='line' style={{ padding: titlePadding }}>
            {title && <h2 className="modal-title">{title}</h2>}
            {!hideCloseButton && (
              <button className="modal-close" onClick={onClose} aria-label="닫기">
                ×
              </button>
            )}
          </div>
        </div>
        <div className="modal-body" style={{ padding: bodyPadding }}>{children}</div>
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
          }
        .line{
          border-bottom: 1px solid #DDDDDD;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .modal-title {
          font-weight: 700;
          font-size: 2rem;
          line-height: 140%;
          flex: 1;
        }
        .modal-close {
          background: #F4F4F4;
          border-radius: 0.5rem;
          border: none;
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          cursor: pointer;
          color: #8E8E8E;
        }
        .modal-body {
          // padding: 2rem 1.8rem 2rem 2.5rem;
          // border: 1px solid red;
          max-height: 60vh;
          overflow-y: auto;
        }
        .modal-footer {
          padding: 0.5rem 1.5rem 0.5rem 1.5rem;
          // border-top: 1px solid #eee;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
