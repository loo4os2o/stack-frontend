'use client';

import { useState } from 'react';
import styles from './TooltipButton.module.css';

interface TooltipButtonProps {
  tooltipText: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  tooltipClassName?: string;
}

export default function TooltipButton({
  tooltipText,
  position = 'top',
  tooltipClassName = ''
}: TooltipButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTooltipPositionClass = () => {
    switch (position) {
      case 'top':
        return styles.tooltipTop;
      case 'bottom':
        return styles.tooltipBottom;
      case 'left':
        return styles.tooltipLeft;
      case 'right':
        return styles.tooltipRight;
      default:
        return styles.tooltipTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowTooltip(!showTooltip);
    }
  };

  const handleBlur = () => {
    // 포커스가 벗어날 때 툴팁 숨김
    setShowTooltip(false);
  };

  return (
    <div className={styles.tooltipButton}>
      <button 
        type="button" 
        className={styles.helpButton}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        aria-label="도움말"
        aria-expanded={showTooltip}
      >
        <div className={styles.helpIcon}></div>
      </button>
      {showTooltip && (
        <div className={`${styles.tooltip} ${getTooltipPositionClass()} ${tooltipClassName}`}>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: tooltipText
                .replace(/\n/g, '<br/>')
                .replace(/\r\n/g, '<br/>')
                .replace(/\r/g, '<br/>')
            }} 
          />
          <div className={styles.tooltipArrow}></div>
        </div>
      )}
    </div>
  );
} 