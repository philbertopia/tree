"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Branch {
  start: THREE.Vector3;
  end: THREE.Vector3;
  depth: number;
}

function buildTree() {
  const branches: Branch[] = [];
  const nodes: THREE.Vector3[] = [];
  const roots: Branch[] = [];

  const trunkStart = new THREE.Vector3(0, -2.4, 0);
  const trunkEnd = new THREE.Vector3(0, 0.25, 0);
  branches.push({ start: trunkStart, end: trunkEnd, depth: 0 });

  const grow = (start: THREE.Vector3, length: number, angle: number, depth: number) => {
    if (depth > 4) {
      nodes.push(start);
      return;
    }

    const splits = depth === 0 ? 5 : 3;
    for (let i = 0; i < splits; i += 1) {
      const spread = (i - (splits - 1) / 2) * angle;
      const y = length * (0.72 + depth * 0.04);
      const x = Math.sin(spread) * length * (1.1 - depth * 0.08);
      const z = Math.cos(spread * 1.7) * 0.28 * depth;
      const end = new THREE.Vector3(start.x + x, start.y + y, start.z + z);
      branches.push({ start, end, depth });
      grow(end, length * 0.62, angle * 0.8, depth + 1);
    }
  };

  grow(trunkEnd, 1.15, 0.42, 1);

  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    roots.push({
      start: trunkStart,
      end: new THREE.Vector3(Math.cos(angle) * (0.8 + (i % 3) * 0.3), -2.8 - (i % 4) * 0.18, Math.sin(angle) * 0.45),
      depth: 0
    });
  }

  return { branches, roots, nodes };
}

function Tree() {
  const group = useRef<THREE.Group>(null);
  const { branches, roots, nodes } = useMemo(buildTree, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.16) * 0.16;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.04;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      {[...branches, ...roots].map((branch, index) => {
        const points = new Float32Array([
          branch.start.x,
          branch.start.y,
          branch.start.z,
          branch.end.x,
          branch.end.y,
          branch.end.z
        ]);
        return (
          <line key={`${branch.depth}-${index}`}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[points, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              attach="material"
              color={branch.depth > 2 ? "#a78bfa" : "#4ade80"}
              transparent
              opacity={branch.depth > 2 ? 0.22 : 0.42}
            />
          </line>
        );
      })}
      {nodes.map((node, index) => (
        <Float key={index} speed={1 + (index % 4) * 0.12} floatIntensity={0.12}>
          <Sphere args={[index % 5 === 0 ? 0.045 : 0.028, 16, 16]} position={[node.x, node.y, node.z]}>
            <meshBasicMaterial color={index % 5 === 0 ? "#a78bfa" : "#4ade80"} transparent opacity={0.75} />
          </Sphere>
        </Float>
      ))}
      <Sphere args={[0.08, 24, 24]} position={[0, -2.4, 0]}>
        <meshBasicMaterial color="#4ade80" transparent opacity={0.7} />
      </Sphere>
    </group>
  );
}

export function HeroTreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.35, 6.4], fov: 48 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 3, 4]} intensity={2} color="#4ade80" />
      <Tree />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
