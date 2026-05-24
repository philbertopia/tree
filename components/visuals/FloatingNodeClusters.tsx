import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ClusterTone = "green" | "cyan" | "violet";
type ClusterDensity = "soft" | "medium" | "rich" | "swarm";
type ClusterSize = "small" | "mixed" | "large";
type ClusterMovement = "drift" | "school" | "crossflow";
type ClusterFocus = "left" | "right" | "both" | "bottom-left" | "bottom-right" | "edges";

interface FloatingNodeClustersProps {
  density?: ClusterDensity;
  size?: ClusterSize;
  movement?: ClusterMovement;
  focus?: ClusterFocus;
  placement?: "left" | "right" | "both";
  seed?: number;
  className?: string;
}

const toneClasses: Record<ClusterTone, string> = {
  green: "floating-node-cluster-green",
  cyan: "floating-node-cluster-cyan",
  violet: "floating-node-cluster-violet"
};

const clusterCounts: Record<ClusterDensity, number> = {
  soft: 4,
  medium: 7,
  rich: 10,
  swarm: 14
};

function seeded(index: number, seed: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + seed * 78.233 + salt * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function getTone(index: number, seed: number): ClusterTone {
  const value = seeded(index, seed, 4);
  if (value > 0.78) return "violet";
  if (value > 0.54) return "cyan";
  return "green";
}

function getSide(index: number, focus: ClusterFocus, seed: number) {
  if (focus === "left" || focus === "bottom-left") return "left";
  if (focus === "right" || focus === "bottom-right") return "right";
  if (focus === "edges") return seeded(index, seed, 7) > 0.42 ? "right" : "left";
  return index % 2 === 0 ? "right" : "left";
}

function getTop(index: number, focus: ClusterFocus, seed: number) {
  if (focus === "bottom-left" || focus === "bottom-right") return 54 + seeded(index, seed, 9) * 34;
  if (focus === "edges") return 8 + seeded(index, seed, 10) * 82;
  return 7 + seeded(index, seed, 11) * 78;
}

function getScale(index: number, seed: number, size: ClusterSize) {
  const base = size === "large" ? 1.15 : size === "small" ? 0.74 : 0.88;
  const range = size === "large" ? 1.05 : size === "small" ? 0.46 : 0.86;
  return base + seeded(index, seed, 13) * range;
}

export function FloatingNodeClusters({
  density = "medium",
  size = "mixed",
  movement = "drift",
  focus,
  placement,
  seed = 1,
  className
}: FloatingNodeClustersProps) {
  const resolvedFocus: ClusterFocus = focus ?? placement ?? "both";
  const clusters = Array.from({ length: clusterCounts[density] });

  return (
    <div className={cn("floating-node-clusters", `floating-node-clusters-${movement}`, className)} aria-hidden="true">
      {clusters.map((_, clusterIndex) => {
        const side = getSide(clusterIndex, resolvedFocus, seed);
        const nodeCount = 5 + Math.floor(seeded(clusterIndex, seed, 2) * (density === "swarm" ? 10 : density === "rich" ? 8 : 6));
        const connectorCount = Math.min(nodeCount - 1, density === "soft" ? 2 : density === "medium" ? 4 : 6);
        const top = getTop(clusterIndex, resolvedFocus, seed);
        const edge = 2 + seeded(clusterIndex, seed, 12) * (resolvedFocus === "edges" ? 13 : 18);
        const scale = getScale(clusterIndex, seed, size);
        const duration = movement === "crossflow" ? 18 + seeded(clusterIndex, seed, 15) * 12 : 13 + seeded(clusterIndex, seed, 16) * 13;
        const tone = getTone(clusterIndex, seed);
        const direction = side === "left" ? 1 : -1;
        const style = {
          "--cluster-top": `${top}%`,
          "--cluster-left": side === "left" ? `${edge}%` : "auto",
          "--cluster-right": side === "right" ? `${edge}%` : "auto",
          "--cluster-scale": scale,
          "--cluster-duration": `${duration}s`,
          "--cluster-delay": `${seeded(clusterIndex, seed, 17) * -18}s`,
          "--cluster-drift-x": `${direction * (1.7 + seeded(clusterIndex, seed, 18) * 4.8)}rem`,
          "--cluster-drift-y": `${-0.7 - seeded(clusterIndex, seed, 19) * 2.5}rem`,
          "--cluster-rotate": `${direction * (3 + seeded(clusterIndex, seed, 20) * 8)}deg`
        } as CSSProperties;

        return (
          <span key={`floating-cluster-${clusterIndex}`} className={`floating-node-cluster ${toneClasses[tone]}`} style={style}>
            {Array.from({ length: connectorCount }).map((__, lineIndex) => {
              const angle = lineIndex * 32 + seeded(clusterIndex + lineIndex, seed, 21) * 36;
              const width = 2.1 + seeded(clusterIndex + lineIndex, seed, 22) * 3.8;
              const lineStyle = {
                "--line-angle": `${angle}deg`,
                "--line-width": `${width}rem`,
                "--line-x": `${-width / 2 + seeded(lineIndex, seed, 23) * width * 0.8}rem`,
                "--line-y": `${-1.2 + seeded(lineIndex, seed, 24) * 2.4}rem`
              } as CSSProperties;

              return <b key={`connector-${lineIndex}`} style={lineStyle} />;
            })}
            {Array.from({ length: nodeCount }).map((__, nodeIndex) => {
              const angle = (nodeIndex / nodeCount) * Math.PI * 2 + seeded(nodeIndex, seed + clusterIndex, 25) * 0.72;
              const radius = 18 + seeded(nodeIndex, seed + clusterIndex, 26) * (size === "large" ? 72 : size === "small" ? 34 : 58);
              const nodeSize = size === "large" ? 0.3 + seeded(nodeIndex, seed, 27) * 0.62 : 0.18 + seeded(nodeIndex, seed, 28) * 0.48;
              const nodeStyle = {
                "--node-x": `${Math.cos(angle) * radius}px`,
                "--node-y": `${Math.sin(angle) * radius * (0.58 + seeded(nodeIndex, seed, 29) * 0.34)}px`,
                "--node-size": `${nodeSize}rem`,
                "--node-delay": `${(nodeIndex + clusterIndex) * -0.48}s`
              } as CSSProperties;

              return <i key={`node-${nodeIndex}`} style={nodeStyle} />;
            })}
          </span>
        );
      })}
    </div>
  );
}
