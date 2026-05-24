"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GREEN = "#4ade80";
const VIOLET = "#a78bfa";
const CYAN = "#67e8f9";
const WHITE = "#f8fafc";

interface PulsePath {
  curve: THREE.CatmullRomCurve3;
  color: string;
  size: number;
  speed: number;
}

interface GlowNodeSpec {
  position: [number, number, number];
  color: string;
  size: number;
  phase: number;
  drift?: [number, number];
  speed?: number;
  opacity?: number;
}

interface FlowClusterSpec {
  y: number;
  z: number;
  width: number;
  speed: number;
  phase: number;
  opacity: number;
  scale: number;
  nodes: Array<{
    offset: [number, number, number];
    color: string;
    size: number;
    phase: number;
  }>;
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useScrollProgressRef(maxDistance = 760) {
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        progress.current = Math.min(1, Math.max(0, window.scrollY / maxDistance));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [maxDistance]);

  return progress;
}

function makeCurve(points: Array<[number, number, number]>) {
  return new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
}

function buildPointField(count: number, width: number, height: number, depth: number, biasX = 0) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const spread = Math.random() ** 0.72;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * width * spread + biasX * Math.random();
    positions[i * 3 + 1] = Math.sin(angle) * height * spread + (Math.random() - 0.5) * 0.55;
    positions[i * 3 + 2] = -depth + Math.random() * depth * 1.25;
  }

  return positions;
}

function buildCanopyField(count: number, centerX: number, compact: boolean) {
  const positions = new Float32Array(count * 3);
  const width = compact ? 2.4 : 3.8;
  const height = compact ? 1.5 : 2;

  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() ** 0.52;
    const asymmetry = Math.sin(angle * 2.2) * 0.16;
    positions[i * 3] = centerX + Math.cos(angle) * width * radius + asymmetry;
    positions[i * 3 + 1] = 0.72 + Math.sin(angle) * height * radius + Math.random() * 0.42;
    positions[i * 3 + 2] = -1.55 + (Math.random() - 0.5) * 0.92;
  }

  return positions;
}

function buildPulsePaths(compact: boolean): PulsePath[] {
  const centerX = compact ? 0 : 1.2;
  const lift = compact ? -0.18 : 0;

  return [
    {
      curve: makeCurve([
        [centerX - 1.75, -1.9 + lift, -0.6],
        [centerX - 0.86, -1.42 + lift, -0.8],
        [centerX - 0.16, -0.9 + lift, -0.95],
        [centerX + 0.1, 0.1 + lift, -1.1],
        [centerX - 0.62, 1.26 + lift, -1.35]
      ]),
      color: GREEN,
      size: 0.042,
      speed: 0.066
    },
    {
      curve: makeCurve([
        [centerX + 1.58, -1.78 + lift, -0.75],
        [centerX + 0.84, -1.2 + lift, -0.88],
        [centerX + 0.2, -0.38 + lift, -1],
        [centerX + 0.58, 0.72 + lift, -1.18],
        [centerX + 1.38, 1.54 + lift, -1.4]
      ]),
      color: CYAN,
      size: 0.038,
      speed: 0.058
    },
    {
      curve: makeCurve([
        [centerX - 0.22, -0.95 + lift, -0.8],
        [centerX - 0.5, -0.06 + lift, -1],
        [centerX - 1.08, 0.8 + lift, -1.2],
        [centerX - 1.5, 1.78 + lift, -1.45]
      ]),
      color: VIOLET,
      size: 0.034,
      speed: 0.049
    },
    {
      curve: makeCurve([
        [centerX + 0.08, -0.86 + lift, -0.9],
        [centerX + 0.54, -0.02 + lift, -1.05],
        [centerX + 0.9, 0.82 + lift, -1.22],
        [centerX + 0.08, 1.72 + lift, -1.42]
      ]),
      color: GREEN,
      size: 0.036,
      speed: 0.055
    },
    {
      curve: makeCurve([
        [centerX - 0.08, -0.72 + lift, -0.82],
        [centerX + 0.1, 0.18 + lift, -1.08],
        [centerX + 0.34, 1.08 + lift, -1.3],
        [centerX + 0.84, 2.05 + lift, -1.55]
      ]),
      color: CYAN,
      size: 0.03,
      speed: 0.045
    }
  ];
}

function buildCanopyNodes(centerX: number, compact: boolean): GlowNodeSpec[] {
  const count = compact ? 12 : 22;
  const upperCount = compact ? 9 : 18;
  const nodes: GlowNodeSpec[] = [];

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.24;
    const radius = 0.58 + (i % 5) * 0.22;
    const xSpread = compact ? 1.25 : 2.05;
    const ySpread = compact ? 0.74 : 1.02;

    nodes.push({
      position: [
        centerX + Math.cos(angle) * xSpread * radius,
        1.04 + Math.sin(angle) * ySpread * radius + (i % 4) * 0.08,
        -1.25 - (i % 3) * 0.14
      ],
      color: i % 5 === 0 ? VIOLET : i % 3 === 0 ? CYAN : GREEN,
      size: i % 4 === 0 ? 0.05 : 0.032,
      phase: i * 0.74,
      drift: [0.035 + (i % 4) * 0.008, 0.026 + (i % 3) * 0.007],
      speed: 0.58 + (i % 5) * 0.045,
      opacity: i % 4 === 0 ? 0.42 : 0.34
    });
  }

  for (let i = 0; i < upperCount; i += 1) {
    const angle = (i / upperCount) * Math.PI * 2 + Math.sin(i * 1.7) * 0.36;
    const radius = 0.42 + ((i * 7) % 11) * 0.078;
    const xSpread = compact ? 1.48 : 2.7;
    const ySpread = compact ? 0.78 : 1.12;
    const lift = compact ? 1.36 : 1.62;
    const rightBias = compact ? 0.08 : 0.48;
    const sizeStep = i % 6;

    nodes.push({
      position: [
        centerX + rightBias + Math.cos(angle) * xSpread * radius + Math.sin(i * 0.83) * 0.18,
        lift + Math.sin(angle) * ySpread * radius + ((i * 3) % 5) * 0.07,
        -1.38 - (i % 4) * 0.13
      ],
      color: i % 7 === 0 ? VIOLET : i % 4 === 0 ? CYAN : GREEN,
      size: sizeStep === 0 ? 0.042 : sizeStep === 3 ? 0.036 : 0.027,
      phase: 1.1 + i * 0.53,
      drift: [0.045 + (i % 5) * 0.01, 0.032 + (i % 4) * 0.008],
      speed: 0.5 + (i % 6) * 0.055,
      opacity: sizeStep === 0 ? 0.36 : 0.28
    });
  }

  return nodes;
}

function buildFlowClusters(compact: boolean): FlowClusterSpec[] {
  const clusterCount = compact ? 3 : 4;
  const clusters: FlowClusterSpec[] = [];

  for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
    const nodeCount = compact ? 4 + ((clusterIndex * 2) % 5) : 5 + ((clusterIndex * 3) % 8);
    const nodes: FlowClusterSpec["nodes"] = [];
    const clusterScale = compact ? 0.72 + (clusterIndex % 4) * 0.16 : 0.74 + (clusterIndex % 5) * 0.18;
    const spreadX = compact ? 0.86 + (clusterIndex % 3) * 0.2 : 1 + (clusterIndex % 4) * 0.24;
    const spreadY = compact ? 0.58 + ((clusterIndex + 1) % 3) * 0.12 : 0.68 + ((clusterIndex + 2) % 4) * 0.1;

    for (let i = 0; i < nodeCount; i += 1) {
      const angle = (i / nodeCount) * Math.PI * 2 + Math.sin(i * 1.37 + clusterIndex) * 0.42;
      const radius = 0.14 + ((i * 5 + clusterIndex * 2) % 9) * 0.032;
      const sizeSeed = (i * 7 + clusterIndex * 3) % 10;

      nodes.push({
        offset: [
          Math.cos(angle) * radius * spreadX,
          Math.sin(angle) * radius * spreadY,
          (Math.sin(i * 1.9) - 0.5) * 0.12
        ],
        color: (i + clusterIndex) % 6 === 0 ? VIOLET : (i + clusterIndex) % 3 === 0 ? CYAN : GREEN,
        size: sizeSeed === 0 ? 0.035 : sizeSeed < 3 ? 0.027 : sizeSeed < 7 ? 0.019 : 0.014,
        phase: clusterIndex * 0.9 + i * 0.48
      });
    }

    clusters.push({
      y: compact
        ? 0.9 + (clusterIndex % 3) * 0.44 + Math.sin(clusterIndex * 1.8) * 0.18
        : 0.96 + (clusterIndex % 4) * 0.38 + Math.sin(clusterIndex * 1.4) * 0.22,
      z: -1.62 - (clusterIndex % 4) * 0.1,
      width: compact ? 0.58 + (clusterIndex % 3) * 0.2 : 0.72 + (clusterIndex % 5) * 0.18,
      speed: compact ? 0.014 + (clusterIndex % 4) * 0.0035 : 0.01 + (clusterIndex % 5) * 0.003,
      phase: clusterIndex * 0.17 + (clusterIndex % 3) * 0.11,
      opacity: compact ? 0.18 + (clusterIndex % 3) * 0.035 : 0.18 + (clusterIndex % 4) * 0.035,
      scale: clusterScale,
      nodes
    });
  }

  return clusters;
}

function PointField({
  count,
  width,
  height,
  depth,
  biasX,
  size,
  opacity,
  color,
  speed,
  reducedMotion
}: {
  count: number;
  width: number;
  height: number;
  depth: number;
  biasX?: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  reducedMotion: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => buildPointField(count, width, height, depth, biasX), [biasX, count, depth, height, width]);

  useFrame(({ clock }) => {
    if (!points.current || !material.current) return;
    const drift = reducedMotion ? speed * 0.08 : speed;
    points.current.rotation.z = Math.sin(clock.elapsedTime * drift) * 0.012;
    points.current.rotation.y = clock.elapsedTime * drift;
    material.current.opacity = opacity;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color={color}
        size={size}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FlowingCluster({
  cluster,
  viewportWidth,
  reducedMotion,
  scrollProgress
}: {
  cluster: FlowClusterSpec;
  viewportWidth: number;
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const materials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const scroll = scrollProgress.current;
    const speed = reducedMotion ? cluster.speed * 0.16 : cluster.speed;
    const range = viewportWidth + cluster.width * 4 + 1.8;
    const progress = (clock.elapsedTime * speed + cluster.phase) % 1;
    const x = progress * range - range / 2;
    const wave = Math.sin(clock.elapsedTime * speed * 18 + cluster.phase * Math.PI * 2);
    const edgeDistance = Math.min(progress, 1 - progress) * 9;
    const edgeFade = THREE.MathUtils.clamp(edgeDistance, 0, 1);

    group.current.position.set(x, cluster.y + wave * 0.08 + scroll * 0.12, cluster.z);
    group.current.rotation.z = Math.sin(clock.elapsedTime * speed * 10 + cluster.phase) * 0.08;
    group.current.scale.setScalar(cluster.scale * (1 + Math.sin(clock.elapsedTime * speed * 14 + cluster.phase) * 0.035));

    materials.current.forEach((material, index) => {
      if (!material) return;
      const isHalo = index % 2 === 1;
      material.opacity = cluster.opacity * edgeFade * (isHalo ? 0.12 : 1) * (1 - scroll * 0.24);
    });
  });

  return (
    <group ref={group}>
      {cluster.nodes.map((node, index) => (
        <group key={`flow-node-${index}`} position={node.offset}>
          <mesh>
            <sphereGeometry args={[node.size, 14, 14]} />
            <meshBasicMaterial
              ref={(material) => {
                materials.current[index * 2] = material;
              }}
              color={node.color}
              transparent
              opacity={cluster.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[node.size * 3.4, 14, 14]} />
            <meshBasicMaterial
              ref={(material) => {
                materials.current[index * 2 + 1] = material;
              }}
              color={node.color}
              transparent
              opacity={cluster.opacity * 0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CanopyCluster({
  centerX,
  compact,
  reducedMotion,
  scrollProgress
}: {
  centerX: number;
  compact: boolean;
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => buildCanopyField(compact ? 140 : 240, centerX, compact), [centerX, compact]);

  useFrame(({ clock }) => {
    if (!points.current || !material.current) return;
    const scroll = scrollProgress.current;
    const speed = reducedMotion ? 0.01 : 0.045;
    points.current.position.y = scroll * 0.28 + Math.sin(clock.elapsedTime * speed) * 0.025;
    points.current.scale.setScalar(1 + scroll * 0.045);
    points.current.rotation.z = Math.sin(clock.elapsedTime * speed * 0.7) * 0.016 + scroll * 0.018;
    material.current.opacity = (compact ? 0.24 : 0.36) * (1 - scroll * 0.28);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color={GREEN}
        size={compact ? 0.021 : 0.024}
        transparent
        opacity={compact ? 0.24 : 0.36}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function GlowNode({
  node,
  reducedMotion,
  scrollProgress
}: {
  node: GlowNodeSpec;
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshBasicMaterial>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const base = useMemo(() => new THREE.Vector3(...node.position), [node.position]);

  useFrame(({ clock }) => {
    if (!group.current || !core.current || !halo.current) return;
    const scroll = scrollProgress.current;
    const nodeSpeed = node.speed ?? 0.72;
    const speed = reducedMotion ? nodeSpeed * 0.12 : nodeSpeed;
    const driftScale = reducedMotion ? 0.18 : 1;
    const drift = node.drift ?? [0.032, 0.024];
    const xDrift = Math.sin(clock.elapsedTime * speed + node.phase) * drift[0] * driftScale;
    const yDrift = Math.cos(clock.elapsedTime * speed * 0.78 + node.phase * 1.3) * drift[1] * driftScale;
    const pulse = 1 + Math.sin(clock.elapsedTime * speed + node.phase) * 0.12;
    const opacity = node.opacity ?? 0.38;

    group.current.scale.setScalar(pulse * (1 + scroll * 0.05));
    group.current.position.copy(base).add(new THREE.Vector3(base.x * scroll * 0.035 + xDrift, scroll * 0.18 + yDrift, 0));
    core.current.opacity = opacity * (1 - scroll * 0.24);
    halo.current.opacity = opacity * 0.15 * (1 - scroll * 0.18);
  });

  return (
    <group ref={group} position={node.position}>
      <mesh>
        <sphereGeometry args={[node.size, 18, 18]} />
        <meshBasicMaterial ref={core} color={node.color} transparent opacity={node.opacity ?? 0.38} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[node.size * 3.6, 18, 18]} />
        <meshBasicMaterial
          ref={halo}
          color={node.color}
          transparent
          opacity={(node.opacity ?? 0.38) * 0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ConnectorGlint({
  from,
  to,
  color,
  phase,
  reducedMotion,
  scrollProgress
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  phase: number;
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const material = useRef<THREE.LineBasicMaterial>(null);
  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]);
    return buffer;
  }, [from, to]);

  useFrame(({ clock }) => {
    if (!material.current) return;
    const scroll = scrollProgress.current;
    const speed = reducedMotion ? 0.04 : 0.42;
    material.current.opacity = (0.035 + Math.max(0, Math.sin(clock.elapsedTime * speed + phase)) * 0.075) * (1 - scroll * 0.3);
  });

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial ref={material} color={color} transparent opacity={0.045} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

function DataPulse({
  path,
  index,
  reducedMotion,
  scrollProgress
}: {
  path: PulsePath;
  index: number;
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || !material.current) return;
    const scroll = scrollProgress.current;
    const speed = reducedMotion ? path.speed * 0.08 : path.speed * (1 + scroll * 0.45);
    const t = (index * 0.23 + clock.elapsedTime * speed) % 1;
    mesh.current.position.copy(path.curve.getPointAt(t));
    mesh.current.scale.setScalar(0.78 + Math.sin((t + index) * Math.PI * 2) * 0.16 + scroll * 0.08);
    material.current.opacity = 0.58 * (1 - scroll * 0.18);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[path.size, 10, 10]} />
      <meshBasicMaterial ref={material} color={path.color} transparent opacity={0.58} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function AmbientRig({
  reducedMotion,
  scrollProgress
}: {
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 6;
  const centerX = compact ? 0 : 1.18;
  const pulsePaths = useMemo(() => buildPulsePaths(compact), [compact]);
  const canopyNodes = useMemo(() => buildCanopyNodes(centerX, compact), [centerX, compact]);
  const flowClusters = useMemo(() => buildFlowClusters(compact), [compact]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const scroll = scrollProgress.current;
    const parallax = reducedMotion ? 0.018 : 0.09;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * parallax, 0.035);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * parallax * 0.55 + scroll * 0.08, 0.035);
    group.current.rotation.z = Math.sin(clock.elapsedTime * (reducedMotion ? 0.02 : 0.08)) * 0.01 + scroll * 0.006;
  });

  return (
    <group ref={group}>
      <PointField
        count={compact ? 85 : 140}
        width={viewport.width * 0.62}
        height={viewport.height * 0.44}
        depth={3.6}
        biasX={compact ? 0 : 1.1}
        size={compact ? 0.015 : 0.017}
        opacity={0.28}
        color={WHITE}
        speed={0.011}
        reducedMotion={reducedMotion}
      />
      <PointField
        count={compact ? 32 : 50}
        width={viewport.width * 0.42}
        height={viewport.height * 0.32}
        depth={2.2}
        biasX={compact ? 0 : 1.35}
        size={compact ? 0.022 : 0.028}
        opacity={0.14}
        color={CYAN}
        speed={-0.015}
        reducedMotion={reducedMotion}
      />
      <CanopyCluster centerX={centerX} compact={compact} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      {flowClusters.map((cluster, index) => (
        <FlowingCluster
          key={`flow-cluster-${index}`}
          cluster={cluster}
          viewportWidth={viewport.width}
          reducedMotion={reducedMotion}
          scrollProgress={scrollProgress}
        />
      ))}
      {canopyNodes.slice(0, compact ? 6 : 10).map((node, index) => {
        const next = canopyNodes[(index * 3 + 5) % canopyNodes.length];
        return (
          <ConnectorGlint
            key={`connector-${index}`}
            from={node.position}
            to={next.position}
            color={index % 3 === 0 ? CYAN : GREEN}
            phase={index * 0.6}
            reducedMotion={reducedMotion}
            scrollProgress={scrollProgress}
          />
        );
      })}
      {canopyNodes.map((node, index) => (
        <GlowNode key={`canopy-node-${index}`} node={node} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      ))}
      {pulsePaths.map((path, index) => (
        <DataPulse key={`pulse-${index}`} path={path} index={index} reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
}

export function HeroTreeCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const scrollProgress = useScrollProgressRef();

  return (
    <Canvas
      aria-hidden="true"
      className="h-full w-full"
      camera={{ position: [0, 0, 5.8], fov: 44 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <AmbientRig reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
