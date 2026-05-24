"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SeedOrbProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32"
};

export function SeedOrb({ size = "md", className = "" }: SeedOrbProps) {
  return (
    <div className={`${sizes[size]} ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 38 }} dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.15} />
        <SingleSeedOrb />
      </Canvas>
    </div>
  );
}

function SingleSeedOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerHaloRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const shimmerRef = useRef<THREE.Mesh>(null);
  const reduced = useMemo(
    () => (typeof window === "undefined" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * (reduced ? 0.12 : 0.72);
    const breath = 1 + Math.sin(t * 1.15) * (reduced ? 0.015 : 0.055);
    const shimmer = 1 + Math.sin(t * 1.7 + 0.8) * (reduced ? 0.01 : 0.045);

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.16;
      groupRef.current.rotation.z = Math.cos(t * 0.22) * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.72) * (reduced ? 0.01 : 0.035);
    }

    coreRef.current?.scale.setScalar(breath);
    innerHaloRef.current?.scale.setScalar(1.18 + (breath - 1) * 1.8);
    outerHaloRef.current?.scale.setScalar(1.74 + (breath - 1) * 2.4);
    shimmerRef.current?.scale.set(1.02 * shimmer, 1.02 / shimmer, 1.02);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={outerHaloRef}>
        <sphereGeometry args={[1.18, 48, 48]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={innerHaloRef}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={shimmerRef} rotation={[0.2, -0.45, 0.18]}>
        <sphereGeometry args={[0.52, 48, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.39, 64, 64]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.98} />
      </mesh>
      <mesh position={[-0.13, 0.14, 0.18]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
