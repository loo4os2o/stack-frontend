// components/VerticalRangeBar.tsx
import React from "react";
// 문제 발생 예상층
interface Block {
  start: number; // 0 ~ 100 (% 기준)
  end: number; // 0 ~ 100 (% 기준)
  type: "danger" | "warning";
}

interface Props {
  blocks: Block[];
}

const VerticalRangeBar: React.FC<Props> = ({ blocks }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 50,
        height: 300,
        background: "#e0e0e0",
        borderRadius: 8,
        margin: "auto",
        overflow: "hidden",
      }}
    >
      {blocks.map((block, idx) => {
        const height = block.end - block.start;
        const color = block.type === "danger" ? "#a32020" : "#e78f8f";
        const opacity = 0.85;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              bottom: `${block.start}%`,
              height: `${height}%`,
              width: "100%",
              backgroundColor: color,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export default VerticalRangeBar;
