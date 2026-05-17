"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const onMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[65] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tree-green/10 blur-3xl md:block"
      style={{ left: position.x, top: position.y }}
    />
  );
}
