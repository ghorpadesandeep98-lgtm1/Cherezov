"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { Stage } from "./Stage";

/* --------------------------------------------------------------------------
 * Стеклянная подложка — общий приём макета: любой объект стоит на стекле.
 * ------------------------------------------------------------------------*/
function GlassBase({
  size = [3.4, 3.4] as [number, number],
  position = [0, 0, 0] as [number, number, number],
}) {
  return (
    <group position={position}>
      <mesh position={[0, -0.16, 0]}>
        <boxGeometry args={[size[0], 0.3, size[1]]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.06}
          ior={1.4}
          metalness={0}
          clearcoat={1}
          color="#eaf6ee"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

/* --------------------------------------------------------------------------
 * Участок: земляной объём с зелёным верхом и деревьями.
 * ------------------------------------------------------------------------*/
function LandPlot() {
  const trees = useMemo(() => {
    const rng = (n: number) => Math.sin(n * 12.9898) * 43758.5453;
    return Array.from({ length: 16 }, (_, i) => {
      const x = ((rng(i + 1) % 1) + 1) % 1;
      const z = ((rng(i + 7) % 1) + 1) % 1;
      return {
        pos: [(x - 0.5) * 2.5, 0, (z - 0.5) * 2.5] as [number, number, number],
        scale: 0.6 + (((rng(i + 3) % 1) + 1) % 1) * 0.5,
      };
    });
  }, []);

  return (
    <group>
      {/* грунт */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <boxGeometry args={[3, 0.28, 3]} />
        <meshStandardMaterial color="#6b5a48" roughness={0.95} />
      </mesh>
      {/* трава */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[3.02, 0.06, 3.02]} />
        <meshStandardMaterial color="#4f9c4f" roughness={0.85} />
      </mesh>
      {trees.map((t, i) => (
        <group key={i} position={[t.pos[0], 0.33, t.pos[2]]} scale={t.scale}>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.025, 0.035, 0.24, 6]} />
            <meshStandardMaterial color="#6a5340" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <coneGeometry args={[0.16, 0.42, 8]} />
            <meshStandardMaterial color="#2f7a3c" roughness={0.8} />
          </mesh>
        </group>
      ))}
      <GlassBase size={[3.5, 3.5]} />
    </group>
  );
}

/* --------------------------------------------------------------------------
 * Застройка: кварталы разной высоты, посаженные по периметру двора.
 * ------------------------------------------------------------------------*/
function Development() {
  const blocks = useMemo(() => {
    const list: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    const ring = 1.1;
    const heights = [0.9, 1.15, 0.75, 1.05, 0.85, 1.25, 0.95, 1.1];
    let i = 0;
    for (const [dx, dz, w, d] of [
      [0, -ring, 2.4, 0.55],
      [0, ring, 2.4, 0.55],
      [-ring, 0, 0.55, 1.7],
      [ring, 0, 0.55, 1.7],
    ] as const) {
      const h = heights[i % heights.length];
      list.push({ pos: [dx, h / 2 + 0.32, dz], size: [w, h, d] });
      i++;
    }
    // секции повыше по углам
    for (const [dx, dz] of [
      [-1.05, -1.05],
      [1.05, 1.05],
    ] as const) {
      list.push({ pos: [dx, 0.72 + 0.32, dz], size: [0.62, 1.44, 0.62] });
    }
    return list;
  }, []);

  return (
    <group>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[3, 0.32, 3]} />
        <meshStandardMaterial color="#e7ece7" roughness={0.9} />
      </mesh>
      {/* двор */}
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[1.5, 0.03, 1.5]} />
        <meshStandardMaterial color="#5aa45c" roughness={0.85} />
      </mesh>
      {blocks.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh castShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color="#c3ccc6"
              roughness={0.45}
              metalness={0.25}
              envMapIntensity={1.1}
            />
          </mesh>
          {/* оконные ленты — без них объём читается как белый брусок */}
          {[0.28, 0.55, 0.82].map((t) => (
            <mesh key={t} position={[0, -b.size[1] / 2 + b.size[1] * t, 0]}>
              <boxGeometry args={[b.size[0] * 1.006, b.size[1] * 0.09, b.size[2] * 1.006]} />
              <meshStandardMaterial color="#48544c" roughness={0.35} metalness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      <GlassBase size={[3.5, 3.5]} />
    </group>
  );
}

/* --------------------------------------------------------------------------
 * Импульс между участком и застройкой: земля становится активом.
 * ------------------------------------------------------------------------*/
function Pulse() {
  const ref = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const wave = (Math.sin(t * 1.2) + 1) / 2;
    if (ref.current) {
      ref.current.position.x = -1.1 + wave * 2.2;
      ref.current.scale.setScalar(0.6 + wave * 0.5);
    }
    if (light.current) light.current.intensity = 2 + wave * 6;
  });

  return (
    <group position={[0, 0.75, 0]}>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshBasicMaterial color="#3ddc6a" />
      </mesh>
      <pointLight ref={light} color="#3ddc6a" distance={4} />
      <mesh>
        <boxGeometry args={[2.4, 0.03, 0.03]} />
        <meshBasicMaterial color="#2fbf5b" transparent opacity={0.75} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#7ff0a4" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Composition() {
  const group = useRef<THREE.Group>(null);
  const width = useThree((state) => state.size.width);
  const compact = width < 900;

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.62 + x * 0.16,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.42 - y * 0.1,
      2.2,
      delta,
    );
  });

  return (
    <group
      ref={group}
      scale={compact ? 0.66 : 0.88}
      position={[compact ? 0 : -0.35, compact ? 0 : -0.15, 0]}
      rotation={[0.42, -0.62, 0]}
    >
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.35}>
        <group position={[-2.1, 0, 0]}>
          <LandPlot />
        </group>
      </Float>

      <Float speed={0.9} rotationIntensity={0.05} floatIntensity={0.45}>
        <group position={[2.1, 0, 0]}>
          <Development />
        </group>
      </Float>

      <Pulse />

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.22}
        scale={16}
        blur={3.4}
        far={6}
        color="#4a5a4c"
      />
    </group>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <Stage className={className} camera={[0, 1.5, 9.2]} fov={34}>
      <Composition />
    </Stage>
  );
}

export default HeroScene;
