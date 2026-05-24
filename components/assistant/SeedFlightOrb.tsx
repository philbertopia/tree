"use client";

import { useEffect, useState } from "react";

type SeedFlightOrbProps = {
  active: boolean;
  landingX: number;
  landingY: number;
};

export function SeedFlightOrb({ active, landingX, landingY }: SeedFlightOrbProps) {
  const [frame, setFrame] = useState({
    x: -180,
    y: 0,
    scale: 0.52,
    opacity: 0
  });

  useEffect(() => {
    if (!active) return undefined;

    const duration = 5200;
    const start = performance.now();
    const startPoint = { x: -180, y: window.innerHeight * 0.42 };
    const controlOne = { x: window.innerWidth * 0.16, y: window.innerHeight * 0.08 };
    const controlTwo = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.2 };
    const endPoint = { x: landingX, y: landingY };
    let raf = 0;

    function tick(now: number) {
      const rawProgress = Math.min((now - start) / duration, 1);
      const progress = easeInOutCinematic(rawProgress);
      const point = cubicBezier(startPoint, controlOne, controlTwo, endPoint, progress);
      const arrival = Math.max(0, (rawProgress - 0.82) / 0.18);
      const lift = Math.sin(progress * Math.PI) * 42;
      const scale = lerp(0.64, 0.46, arrival) + Math.sin(progress * Math.PI) * 0.52;
      const opacity = rawProgress < 0.08 ? rawProgress / 0.08 : rawProgress > 0.94 ? (1 - rawProgress) / 0.06 : 1;

      setFrame({
        x: point.x,
        y: point.y - lift,
        scale,
        opacity: Math.max(0, Math.min(opacity, 1))
      });

      if (rawProgress < 1) {
        raf = window.requestAnimationFrame(tick);
      }
    }

    setFrame({ x: startPoint.x, y: startPoint.y, scale: 0.64, opacity: 0 });
    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, [active, landingX, landingY]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      <div
        className="seed-flight-orb seed-flight-orb-manual"
        style={{
          transform: `translate3d(${frame.x - 64}px, ${frame.y - 64}px, 0) scale(${frame.scale})`,
          opacity: frame.opacity
        }}
      >
        <span className="seed-flight-orb-core" />
        <span className="seed-flight-orb-highlight" />
      </div>
    </div>
  );
}

function cubicBezier(
  start: { x: number; y: number },
  controlOne: { x: number; y: number },
  controlTwo: { x: number; y: number },
  end: { x: number; y: number },
  t: number
) {
  const oneMinusT = 1 - t;
  const x =
    oneMinusT ** 3 * start.x +
    3 * oneMinusT ** 2 * t * controlOne.x +
    3 * oneMinusT * t ** 2 * controlTwo.x +
    t ** 3 * end.x;
  const y =
    oneMinusT ** 3 * start.y +
    3 * oneMinusT ** 2 * t * controlOne.y +
    3 * oneMinusT * t ** 2 * controlTwo.y +
    t ** 3 * end.y;

  return { x, y };
}

function easeInOutCinematic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}
