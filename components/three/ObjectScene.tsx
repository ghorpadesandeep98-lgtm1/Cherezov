"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { Stage } from "./Stage";

export type ObjectKind = "building" | "portfolio" | "land" | "people";

const glass = {
  transmission: 1,
  thickness: 0.5,
  roughness: 0.07,
  ior: 1.38,
  metalness: 0,
  clearcoat: 1,
  transparent: true,
  opacity: 0.86,
} as const;

/** Общая стеклянная подложка карточек. */
function Base({ w = 2.4, d = 2.4 }) {
  return (
    <mesh position={[0, -0.72, 0]}>
      <boxGeometry args={[w, 0.24, d]} />
      <meshPhysicalMaterial {...glass} color="#e6f4ea" />
    </mesh>
  );
}

/* Дом: секции разной высоты с зеленью у подножия */
function Building() {
  return (
    <group>
      {[
        { p: [-0.5, 0.1, 0] as const, s: [0.62, 1.5, 0.62] as const },
        { p: [0.25, -0.05, 0.1] as const, s: [0.72, 1.2, 0.7] as const },
        { p: [0.15, 0.35, -0.55] as const, s: [0.5, 1.9, 0.5] as const },
      ].map((b, i) => (
        <mesh key={i} position={[...b.p]} castShadow>
          <boxGeometry args={[...b.s]} />
          <meshStandardMaterial color="#c6d0c9" roughness={0.4} metalness={0.3} envMapIntensity={1.2} />
        </mesh>
      ))}
      {[-0.9, 0.85].map((x, i) => (
        <mesh key={i} position={[x, -0.5, 0.6]}>
          <coneGeometry args={[0.16, 0.42, 8]} />
          <meshStandardMaterial color="#2f7a3c" roughness={0.8} />
        </mesh>
      ))}
      <Base />
    </group>
  );
}

/* Портфель со стеклянным растущим графиком */
function Portfolio() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.9, 1.35, 0.5]} />
        <meshPhysicalMaterial {...glass} color="#d9edde" />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.28, 0.045, 12, 32, Math.PI]} />
        <meshPhysicalMaterial {...glass} color="#e2efe6" />
      </mesh>
      {[0.35, 0.55, 0.78, 1].map((h, i) => (
        <mesh key={i} position={[-0.6 + i * 0.4, -0.36 + h / 2, 0.3]}>
          <boxGeometry args={[0.22, h, 0.12]} />
          <meshStandardMaterial color="#2fa855" roughness={0.35} metalness={0.2} />
        </mesh>
      ))}
      <Base />
    </group>
  );
}

/* Участок с пином */
function Land() {
  return (
    <group>
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[2.1, 0.5, 2.1]} />
        <meshStandardMaterial color="#6b5a48" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[2.12, 0.08, 2.12]} />
        <meshStandardMaterial color="#4f9c4f" roughness={0.85} />
      </mesh>
      {[
        [-0.7, -0.6],
        [0.75, 0.5],
        [0.6, -0.7],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.2, z]}>
          <mesh position={[0, 0.2, 0]}>
            <coneGeometry args={[0.14, 0.4, 8]} />
            <meshStandardMaterial color="#2f7a3c" roughness={0.8} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshPhysicalMaterial {...glass} color="#e2efe6" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.16, 0.34, 16]} />
        <meshPhysicalMaterial {...glass} color="#e2efe6" />
      </mesh>
      <Base />
    </group>
  );
}

/* Команда: три стеклянные фигуры, центральная — зелёная */
function People() {
  const figures = [
    { x: -0.72, s: 0.85, green: false },
    { x: 0, s: 1, green: true },
    { x: 0.72, s: 0.85, green: false },
  ];
  return (
    <group>
      {figures.map((f, i) => (
        <group key={i} position={[f.x, -0.1, i === 1 ? 0.2 : 0]} scale={f.s}>
          <mesh position={[0, 0.55, 0]}>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshPhysicalMaterial {...glass} color={f.green ? "#3fbe6a" : "#dbe6dd"} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <capsuleGeometry args={[0.3, 0.42, 8, 20]} />
            <meshPhysicalMaterial {...glass} color={f.green ? "#35b562" : "#d5e2d8"} />
          </mesh>
        </group>
      ))}
      <Base w={2.6} />
    </group>
  );
}

const shapes: Record<ObjectKind, () => React.ReactElement> = {
  building: Building,
  portfolio: Portfolio,
  land: Land,
  people: People,
};

function Spin({ kind }: { kind: ObjectKind }) {
  const group = useRef<THREE.Group>(null);
  const Shape = shapes[kind];

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.6 + Math.sin(t * 0.28) * 0.28 + state.pointer.x * 0.3,
      2.4,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[0.5, -0.6, 0]}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.5}>
        <Shape />
      </Float>
      <ContactShadows position={[0, -1, 0]} opacity={0.2} scale={7} blur={3} far={4} color="#4a5a4c" />
    </group>
  );
}

export function ObjectScene({
  kind,
  className = "",
  distance = 5.2,
}: {
  kind: ObjectKind;
  className?: string;
  distance?: number;
}) {
  return (
    <Stage className={className} camera={[0, 0.9, distance]} fov={32} dpr={[1, 1.35]}>
      <Spin kind={kind} />
    </Stage>
  );
}

export default ObjectScene;
