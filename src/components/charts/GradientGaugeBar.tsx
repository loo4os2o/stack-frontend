// components/GradientGaugeBar.tsx
import React from "react";
// 연돌현상 영향도
interface GradientGaugeBarProps {
  leftLabel: string;
  leftPosition: number; // 0 ~ 100
  rightLabel: string;
  rightPosition: number; // 0 ~ 100
}

const GradientGaugeBar: React.FC<GradientGaugeBarProps> = ({
  leftLabel,
  leftPosition,
  rightLabel,
  rightPosition,
}) => {
  return (
    <div
      style={{
        position: "relative",
        height: 120,
        width: '95%',
        background: "transparent",
        padding: "60px 0 20px 0",
        // border: "1px solid red",
      }}
    >
      {/* 게이지 바 틀 */}
      <div
        style={{
          position: "relative",
          height: 30,
          borderRadius: 9999,
          background: "#fff",
          border: "1px solid #ccc",
          overflow: "hidden",
        }}
      >
        {/* 채워지는 gradient 부분 */}
        <div
          style={{
            height: "100%",
            width: `${rightPosition}%`,
            background: "linear-gradient(to right, #fff, #ff6a00, #ff0000)",
            borderRadius: 9999,
            transition: "width 0.5s ease",
          }}
        />

        {/* 중앙 기준선 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "2px",
            backgroundColor: "dodgerblue",
            zIndex: 2,
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* 왼쪽 마커 */}
      <div
        style={{
          position: "absolute",
          left: `${leftPosition}%`,
          top: 20,
          transform: "translateX(-20%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: "bold", color: "#0046a0", 
          whiteSpace: "nowrap", position: "relative", left: -10 }}>
          {leftLabel}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid #0046a0",
            marginTop: 2,
          }}
        />
      </div>

      {/* 오른쪽 마커 */}
      <div
        style={{
          position: "absolute",
          left: `${rightPosition}%`,
          top: 20,
          transform: "translateX(-20%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: "bold", color: "#000", 
          whiteSpace: "nowrap", position: "relative", left: -10 }}>
          {rightLabel}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid black",
            marginTop: 2,
          }}
        />
      </div>
    </div>
  );
};

export default GradientGaugeBar;
