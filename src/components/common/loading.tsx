"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type LoadingProps = {
  variant?: "overlay" | "inline" | "corner";
  size?: "sm" | "md" | "lg" | "xl";
  backdrop?: "light" | "dark" | "glass";
  message?: string;
  /** 보이기/숨기기 제어 */
  isVisible?: boolean;          // ← 추가
  /** 숨김으로 바뀐 뒤 exit 페이드 실행 */
  exitFade?: boolean;
  /** exit 애니 끝난 뒤 호출(부모에서 언마운트) */
  onExited?: () => void;        // ← 선택 콜백
};

const LOTTIE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/lottie/loading-files.lottie`;

export default function Loading({
  variant = "overlay",
  size = "xl",
  backdrop = "glass",
  message,
  isVisible = true,            // ← 기본 보임
  exitFade = true,
  onExited,
}: LoadingProps) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);  // ← enter 제어
  const [exiting, setExiting] = useState(false);  // ← exit 제어
  const exitTimer = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // enter: 마운트 후 opacity-100로
  useEffect(() => {
    setMounted(true);
  }, []);

  // exit: isVisible === false가 되면 페이드 후 onExited 호출
  useEffect(() => {
    if (!exitFade) return;                // 페이드 사용 안 함
    if (isVisible) {
      // 다시 보이게 되면 exit 상태 해제
      setExiting(false);
      if (exitTimer.current) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
      return;
    }
    // 숨김으로 전환됨 → exit 페이드 시작
    setExiting(true);
    exitTimer.current = window.setTimeout(() => {
      onExited?.();                       // 부모에서 이때 언마운트
    }, 300); // duration-300과 동일
    return () => {
      if (exitTimer.current) window.clearTimeout(exitTimer.current);
    };
  }, [isVisible, exitFade, onExited]);

  // 크기
  const style = useMemo(() => {
    const map = {
      sm: { width: 160, height: 160 },
      md: { width: 220, height: 220 },
      lg: { width: 300, height: 300 },
      xl: { width: 400, height: 400 },
    } as const;
    return map[size];
  }, [size]);

  const wrapperClass = clsx(
    "z-[1000] transition-opacity duration-300", // 항상 트랜지션 부여
    // 레이아웃
    variant === "overlay" && "fixed inset-0 grid place-items-center",
    variant === "inline"  && "inline-flex items-center justify-center",
    variant === "corner"  && "fixed right-4 bottom-4",
    // 배경
    backdrop === "light" && variant !== "inline" && "bg-white/80",
    backdrop === "dark"  && variant !== "inline" && "bg-black/40",
    backdrop === "glass" && variant !== "inline" && "bg-white/60 backdrop-blur-sm",
    // 가시성: enter/exit
    mounted && !exiting && isVisible ? "opacity-100" : "opacity-0"
  );

  return (
    <div
      className={wrapperClass}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
      style={{
        background: "#ffffff",
        ...(variant === "corner" ? { pointerEvents: "none" } : {}),
      }}
    >
      <div className={clsx(
        "flex flex-col items-center relative",
        variant === "corner" && "shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-xl p-3 bg-white/90"
      )}>
        <DotLottieReact src={LOTTIE_PATH} loop autoplay={!reduced} style={style} />
        {message && <div className="loading-message">{message}</div>}
      </div>
    </div>
  );
}
