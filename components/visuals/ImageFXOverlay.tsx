"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type OverlayVariant = "dashboard" | "network";
type OverlayIntensity = "soft" | "medium" | "rich";

interface ImageFXOverlayProps {
  variant: OverlayVariant;
  intensity?: OverlayIntensity;
  className?: string;
}

interface FlowPath {
  curve: THREE.CatmullRomCurve3;
  color: string;
  size: number;
  speed: number;
}

interface NodeSpec {
  position: [number, number, number];
  color: string;
  size: number;
}

interface AgentClusterSpec {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
  opacity: number;
  nodes: Array<{
    offset: [number, number, number];
    color: string;
    size: number;
  }>;
}

const GREEN = "#4ade80";
const VIOLET = "#a78bfa";
const CYAN = "#67e8f9";
const WHITE = "#f8fafc";

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

function useElementProgressRef() {
  const elementRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!elementRef.current) return;
        const rect = elementRef.current.getBoundingClientRect();
        const range = window.innerHeight + rect.height;
        progress.current = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / range));
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
  }, []);

  return { elementRef, progress };
}

function makeCurve(points: Array<[number, number, number]>) {
  return new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
}

function buildParticles(count: number, width: number, height: number, variant: OverlayVariant) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const dashboardBias = variant === "dashboard" ? 0.72 : 1;
    positions[i * 3] = (Math.random() - 0.5) * width * dashboardBias;
    positions[i * 3 + 1] = (Math.random() - 0.5) * height * (variant === "dashboard" ? 0.72 : 0.9);
    positions[i * 3 + 2] = -1.2 - Math.random() * 0.8;
  }

  return positions;
}

function buildNetworkNodes(width: number, height: number, compact: boolean): NodeSpec[] {
  const count = compact ? 8 : 13;
  const nodes: NodeSpec[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 2.6;
    nodes.push({
      position: [
        Math.cos(angle) * width * (0.16 + (i % 4) * 0.035),
        Math.sin(angle * 0.86) * height * 0.22 + (i % 3) * 0.08,
        -1.28
      ],
      color: i % 4 === 0 ? VIOLET : i % 3 === 0 ? CYAN : GREEN,
      size: i % 5 === 0 ? 0.04 : 0.028
    });
  }

  return nodes;
}

function buildDashboardPaths(width: number, height: number): FlowPath[] {
  return [
    {
      curve: makeCurve([
        [-width * 0.38, -height * 0.28, -1.1],
        [-width * 0.1, -height * 0.12, -1.1],
        [width * 0.12, height * 0.05, -1.1],
        [width * 0.36, height * 0.22, -1.1]
      ]),
      color: GREEN,
      size: 0.035,
      speed: 0.07
    },
    {
      curve: makeCurve([
        [-width * 0.32, height * 0.22, -1.12],
        [-width * 0.08, height * 0.08, -1.12],
        [width * 0.18, height * 0.16, -1.12],
        [width * 0.34, -height * 0.18, -1.12]
      ]),
      color: CYAN,
      size: 0.03,
      speed: 0.06
    }
  ];
}

function buildNetworkPaths(nodes: NodeSpec[]): FlowPath[] {
  return nodes.slice(0, 5).map((node, index) => {
    const target = nodes[(index + 3) % nodes.length];
    return {
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(...node.position),
        new THREE.Vector3((node.position[0] + target.position[0]) / 2, (node.position[1] + target.position[1]) / 2 + 0.18, -1.1),
        new THREE.Vector3(...target.position)
      ]),
      color: index % 2 === 0 ? GREEN : CYAN,
      size: 0.026,
      speed: 0.052 + index * 0.004
    };
  });
}

function getIntensityMultiplier(intensity: OverlayIntensity) {
  if (intensity === "rich") return 1.45;
  if (intensity === "medium") return 1.12;
  return 1;
}

function buildAgentClusters(width: number, height: number, compact: boolean, variant: OverlayVariant, intensity: OverlayIntensity): AgentClusterSpec[] {
  const clusterCount = compact ? (intensity === "rich" ? 5 : 3) : intensity === "rich" ? 8 : intensity === "medium" ? 5 : 3;
  const clusters: AgentClusterSpec[] = [];

  for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
    const nodeCount = compact ? 4 + ((clusterIndex * 2) % 4) : 5 + ((clusterIndex * 3) % 7);
    const nodes: AgentClusterSpec["nodes"] = [];

    for (let i = 0; i < nodeCount; i += 1) {
      const angle = (i / nodeCount) * Math.PI * 2 + Math.sin(i * 1.31 + clusterIndex) * 0.38;
      const radius = 0.14 + ((i * 5 + clusterIndex) % 8) * 0.026;
      nodes.push({
        offset: [Math.cos(angle) * radius * 1.35, Math.sin(angle) * radius * 0.82, (Math.sin(i * 1.7) - 0.5) * 0.08],
        color: (i + clusterIndex) % 6 === 0 ? VIOLET : (i + clusterIndex) % 3 === 0 ? CYAN : GREEN,
        size: i % 5 === 0 ? 0.032 : i % 3 === 0 ? 0.024 : 0.017
      });
    }

    const xRange = variant === "dashboard" ? width * 0.72 : width * 0.62;
    const yRange = variant === "dashboard" ? height * 0.34 : height * 0.44;

    clusters.push({
      position: [
        -xRange / 2 + (clusterIndex / Math.max(1, clusterCount - 1)) * xRange + Math.sin(clusterIndex * 1.9) * 0.22,
        Math.sin(clusterIndex * 1.33) * yRange * 0.5 + (variant === "dashboard" ? height * 0.04 : 0),
        -1.12 - (clusterIndex % 3) * 0.08
      ],
      scale: compact ? 0.72 + (clusterIndex % 3) * 0.13 : 0.86 + (clusterIndex % 4) * 0.18,
      speed: variant === "dashboard" ? 0.038 + (clusterIndex % 4) * 0.004 : 0.024 + (clusterIndex % 5) * 0.003,
      phase: clusterIndex * 0.71,
      opacity: variant === "dashboard" ? 0.2 : 0.24,
      nodes
    });
  }

  return clusters;
}

function ParticleLayer({
  variant,
  intensity,
  reducedMotion,
  progress
}: {
  variant: OverlayVariant;
  intensity: OverlayIntensity;
  reducedMotion: boolean;
  progress: MutableRefObject<number>;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 5.5;
  const count = compact ? (intensity === "rich" ? 72 : intensity === "medium" ? 54 : 36) : intensity === "rich" ? 165 : intensity === "medium" ? 120 : 76;
  const positions = useMemo(() => buildParticles(count, viewport.width, viewport.height, variant), [count, variant, viewport.height, viewport.width]);

  useFrame(({ clock }) => {
    if (!points.current || !material.current) return;
    const scroll = progress.current;
    const speed = reducedMotion ? 0.008 : variant === "dashboard" ? 0.025 : -0.018;
    points.current.position.y = (scroll - 0.5) * (variant === "dashboard" ? 0.16 : 0.28);
    points.current.rotation.z = Math.sin(clock.elapsedTime * speed) * 0.025 + scroll * 0.035;
    material.current.opacity = (variant === "dashboard" ? 0.28 : 0.22) * getIntensityMultiplier(intensity);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color={variant === "dashboard" ? CYAN : GREEN}
        size={compact ? 0.018 : 0.024}
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function AgentCluster({
  cluster,
  variant,
  reducedMotion,
  progress
}: {
  cluster: AgentClusterSpec;
  variant: OverlayVariant;
  reducedMotion: boolean;
  progress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const materials = useRef<Array<THREE.MeshBasicMaterial | THREE.LineBasicMaterial | null>>([]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const scroll = progress.current;
    const speed = reducedMotion ? cluster.speed * 0.12 : cluster.speed;
    const driftX = variant === "dashboard" ? Math.sin(clock.elapsedTime * speed + cluster.phase) * 0.16 : Math.sin(clock.elapsedTime * speed + cluster.phase) * 0.08;
    const driftY = Math.cos(clock.elapsedTime * speed * 1.4 + cluster.phase) * (variant === "dashboard" ? 0.08 : 0.12);

    group.current.position.set(cluster.position[0] + driftX, cluster.position[1] + driftY + (scroll - 0.5) * 0.08, cluster.position[2]);
    group.current.rotation.z = Math.sin(clock.elapsedTime * speed * 1.8 + cluster.phase) * (variant === "dashboard" ? 0.08 : 0.14);
    group.current.scale.setScalar(cluster.scale * (1 + Math.sin(clock.elapsedTime * speed * 2 + cluster.phase) * 0.035));

    materials.current.forEach((material, index) => {
      if (!material) return;
      const isLine = material instanceof THREE.LineBasicMaterial;
      const isHalo = index % 2 === 1 && !isLine;
      material.opacity = cluster.opacity * (isLine ? 0.36 : isHalo ? 0.12 : 1) * (1 - Math.abs(scroll - 0.5) * 0.18);
    });
  });

  return (
    <group ref={group} position={cluster.position} scale={cluster.scale}>
      {cluster.nodes.slice(0, Math.min(cluster.nodes.length - 1, 5)).map((node, index) => {
        const next = cluster.nodes[(index + 2) % cluster.nodes.length];
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([new THREE.Vector3(...node.offset), new THREE.Vector3(...next.offset)]);

        return (
          <line key={`agent-line-${index}`}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial
              ref={(material) => {
                materials.current[cluster.nodes.length * 2 + index] = material;
              }}
              color={index % 2 === 0 ? GREEN : CYAN}
              transparent
              opacity={cluster.opacity * 0.36}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </line>
        );
      })}
      {cluster.nodes.map((node, index) => (
        <group key={`agent-node-${index}`} position={node.offset}>
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

function FlowDot({
  path,
  index,
  reducedMotion,
  progress
}: {
  path: FlowPath;
  index: number;
  reducedMotion: boolean;
  progress: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || !material.current) return;
    const scroll = progress.current;
    const speed = reducedMotion ? path.speed * 0.08 : path.speed * (1 + Math.abs(scroll - 0.5) * 0.24);
    const t = (index * 0.31 + clock.elapsedTime * speed) % 1;
    mesh.current.position.copy(path.curve.getPointAt(t));
    mesh.current.scale.setScalar(0.86 + Math.sin(t * Math.PI * 2) * 0.16);
    material.current.opacity = 0.48 + Math.sin(t * Math.PI) * 0.18;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[path.size, 14, 14]} />
      <meshBasicMaterial ref={material} color={path.color} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function NetworkLines({
  nodes,
  progress,
  reducedMotion
}: {
  nodes: NodeSpec[];
  progress: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const pairs = useMemo(
    () =>
      nodes.slice(0, Math.min(nodes.length - 1, 9)).map((node, index) => ({
        from: node.position,
        to: nodes[(index + 2) % nodes.length].position,
        color: index % 3 === 0 ? CYAN : GREEN
      })),
    [nodes]
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const scroll = progress.current;
    group.current.rotation.z = Math.sin(clock.elapsedTime * (reducedMotion ? 0.01 : 0.06)) * 0.015;
    group.current.position.y = (scroll - 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      {pairs.map((pair, index) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([new THREE.Vector3(...pair.from), new THREE.Vector3(...pair.to)]);
        return (
          <line key={`network-line-${index}`}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color={pair.color} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
          </line>
        );
      })}
    </group>
  );
}

function ScanLine({
  reducedMotion,
  progress
}: {
  reducedMotion: boolean;
  progress: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (!mesh.current || !material.current) return;
    const scroll = progress.current;
    const speed = reducedMotion ? 0.08 : 0.34;
    const y = THREE.MathUtils.mapLinear((Math.sin(clock.elapsedTime * speed + scroll * 1.4) + 1) / 2, 0, 1, -viewport.height * 0.28, viewport.height * 0.28);
    mesh.current.position.y = y;
    material.current.opacity = 0.08 + Math.sin(clock.elapsedTime * speed) * 0.025;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 0.92, 0.035]} />
      <meshBasicMaterial ref={material} color={CYAN} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function OverlayRig({
  variant,
  intensity,
  reducedMotion,
  progress
}: {
  variant: OverlayVariant;
  intensity: OverlayIntensity;
  reducedMotion: boolean;
  progress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const compact = viewport.width < 5.5;
  const nodes = useMemo(() => buildNetworkNodes(viewport.width, viewport.height, compact), [compact, viewport.height, viewport.width]);
  const paths = useMemo(
    () => (variant === "dashboard" ? buildDashboardPaths(viewport.width, viewport.height) : buildNetworkPaths(nodes)),
    [nodes, variant, viewport.height, viewport.width]
  );
  const agentClusters = useMemo(
    () => buildAgentClusters(viewport.width, viewport.height, compact, variant, intensity),
    [compact, intensity, variant, viewport.height, viewport.width]
  );

  useFrame(({ pointer }) => {
    if (!group.current) return;
    const parallax = reducedMotion ? 0.01 : 0.035;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * parallax, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * parallax, 0.04);
  });

  return (
    <group ref={group}>
      <ParticleLayer variant={variant} intensity={intensity} reducedMotion={reducedMotion} progress={progress} />
      {variant === "dashboard" ? <ScanLine reducedMotion={reducedMotion} progress={progress} /> : <NetworkLines nodes={nodes} progress={progress} reducedMotion={reducedMotion} />}
      {paths.map((path, index) => (
        <FlowDot key={`${variant}-flow-${index}`} path={path} index={index} reducedMotion={reducedMotion} progress={progress} />
      ))}
      {agentClusters.map((cluster, index) => (
        <AgentCluster key={`${variant}-agent-cluster-${index}`} cluster={cluster} variant={variant} reducedMotion={reducedMotion} progress={progress} />
      ))}
      {variant === "network"
        ? nodes.map((node, index) => (
            <mesh key={`network-node-${index}`} position={node.position}>
              <sphereGeometry args={[node.size, 14, 14]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))
        : null}
    </group>
  );
}

export function ImageFXOverlay({ variant, intensity = "soft", className = "" }: ImageFXOverlayProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { elementRef, progress } = useElementProgressRef();

  return (
    <div ref={elementRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        aria-hidden="true"
        className="h-full w-full"
        camera={{ position: [0, 0, 4.8], fov: 44 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <OverlayRig variant={variant} intensity={intensity} reducedMotion={reducedMotion} progress={progress} />
      </Canvas>
    </div>
  );
}
