"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, ContactShadows } from "@react-three/drei";
import { Stage } from "./Stage";

/* --------------------------------------------------------------------------
 * Пружина календаря — фирменный 3D-жест бренда.
 * Геометрия строится процедурно: спираль как кривая, по ней — трубка.
 * ------------------------------------------------------------------------*/
function Spiral({ radius = 1.42, turns = 7, height = 2.35 }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = turns * 48;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * height,
          Math.sin(angle) * radius,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, steps, 0.038, 12, false);
  }, [radius, turns, height]);

  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.22;
  });

  return (
    <mesh ref={ref} geometry={geometry} rotation={[0.32, 0, 0.14]} castShadow>
      <meshStandardMaterial
        color="#f2f5ee"
        metalness={1}
        roughness={0.14}
        envMapIntensity={1.6}
      />
    </mesh>
  );
}

/* --------------------------------------------------------------------------
 * Жидкий хром — «материя бренда», которую хочется потрогать.
 * ------------------------------------------------------------------------*/
function ChromeCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.16;
    ref.current.rotation.x = Math.sin(t * 0.24) * 0.14;
  });

  return (
    <mesh ref={ref} castShadow>
      <icosahedronGeometry args={[0.98, 48]} />
      <MeshDistortMaterial
        distort={0.34}
        speed={1.15}
        color="#eef3ff"
        metalness={1}
        roughness={0.055}
        envMapIntensity={2.1}
        iridescence={1}
        iridescenceIOR={1.9}
        iridescenceThicknessRange={[100, 700]}
      />
    </mesh>
  );
}

/* --------------------------------------------------------------------------
 * Стеклянный лист — прозрачная плоскость, метафора бумаги.
 * ------------------------------------------------------------------------*/
function GlassSheet({
  position,
  rotation,
  scale = 1,
  tint = "#ffffff",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  tint?: string;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1.5, 2.05, 0.045]} />
        {/* стекло на core-материале three: надёжнее кастомных шейдеров */}
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.5}
          roughness={0.08}
          ior={1.34}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={0.5}
          iridescenceIOR={1.6}
          color={tint}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

/* --------------------------------------------------------------------------
 * Сцена целиком + параллакс от курсора.
 * ------------------------------------------------------------------------*/
function Composition() {
  const group = useRef<THREE.Group>(null);
  const width = useThree((state) => state.size.width);
  const compact = width < 768;

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.32, 2.4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.2, 2.4, delta);
  });

  return (
    <group ref={group} scale={compact ? 0.52 : 0.86} position={[0, compact ? 0.7 : 0.42, 0]}>
      <ChromeCore />
      <Spiral />
      <GlassSheet position={[-3.1, 0.15, -1.2]} rotation={[0.18, 0.5, -0.16]} scale={0.8} />
      <GlassSheet
        position={[3.15, -0.5, -1.1]}
        rotation={[-0.1, -0.55, 0.2]}
        scale={0.7}
        tint="#f2ffd9"
      />
      <Sparkles count={34} scale={[9, 5, 5]} size={2.2} speed={0.22} color="#b6f11f" opacity={0.6} />
      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={0.32}
        scale={12}
        blur={3.2}
        far={5}
        color="#8a9182"
      />
    </group>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <Stage className={className} camera={[0, 0, 6.6]} fov={36}>
      <Composition />
    </Stage>
  );
}

export default HeroScene;
