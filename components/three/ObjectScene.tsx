"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { Stage } from "./Stage";

export type ObjectKind = "book" | "calendar" | "catalog" | "box";

/* Книга: скруглённый блок с корешком */
function Book() {
  return (
    <group rotation={[0.2, -0.5, 0.06]}>
      <mesh castShadow>
        <boxGeometry args={[1.75, 2.35, 0.38]} />
        <meshStandardMaterial color="#e6eae1" metalness={0.7} roughness={0.24} envMapIntensity={1.5} />
      </mesh>
      <mesh position={[-0.9, 0, 0]}>
        <boxGeometry args={[0.08, 2.35, 0.38]} />
        <meshStandardMaterial color="#c8ff3d" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0.08, 0, 0.2]}>
        <boxGeometry args={[1.55, 2.15, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* Календарь: блок на пружине */
function Calendar() {
  const spring = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 320;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * Math.PI * 22;
      pts.push(new THREE.Vector3((t - 0.5) * 1.7, Math.sin(a) * 0.1, Math.cos(a) * 0.1));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), steps, 0.028, 8, false);
  }, []);

  return (
    <group rotation={[0.24, -0.36, 0]}>
      <mesh geometry={spring} position={[0, 1.16, 0]}>
        <meshStandardMaterial color="#e9ece3" metalness={1} roughness={0.14} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.85, 1.55, 0.1]} />
        <meshStandardMaterial color="#dfe3da" roughness={0.5} metalness={0.35} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, -0.72, 0.02]}>
        <boxGeometry args={[1.5, 0.6, 0.08]} />
        <meshStandardMaterial color="#c8ff3d" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.42, 0.056]}>
        <boxGeometry args={[1.45, 0.92, 0.01]} />
        <meshStandardMaterial color="#23262a" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* Каталог: стопка стеклянных полос */
function Catalog() {
  return (
    <group rotation={[0.3, -0.4, 0]}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1.1 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[i * 0.16 - 0.16, i * 0.34 - 0.34, i * -0.2]}>
            <boxGeometry args={[1.6, 2.1, 0.06]} />
            <meshPhysicalMaterial
              transmission={1}
              thickness={0.45}
              roughness={0.09}
              ior={1.34}
              metalness={0}
              clearcoat={1}
              iridescence={0.45}
              color={i === 1 ? "#eaffc4" : "#ffffff"}
              transparent
              opacity={0.92}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* Упаковка: раскрытая коробка */
function BoxPack() {
  return (
    <group rotation={[0.42, -0.6, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.7, 1.2, 1.7]} />
        <meshStandardMaterial color="#e3e7de" metalness={0.5} roughness={0.35} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 0.66, 0]} rotation={[0.6, 0, 0]}>
        <boxGeometry args={[1.7, 1.7, 0.06]} />
        <meshStandardMaterial color="#c8ff3d" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

const shapes: Record<ObjectKind, () => React.ReactElement> = {
  book: Book,
  calendar: Calendar,
  catalog: Catalog,
  box: BoxPack,
};

function Spin({ kind }: { kind: ObjectKind }) {
  const group = useRef<THREE.Group>(null);
  const Shape = shapes[kind];

  // покачивание вместо полного оборота: изделие всегда развёрнуто к зрителю
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      Math.sin(t * 0.3) * 0.5 + state.pointer.x * 0.4,
      2.6,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -state.pointer.y * 0.16,
      2.2,
      delta,
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.7}>
        <Shape />
      </Float>
      <ContactShadows position={[0, -1.7, 0]} opacity={0.28} scale={8} blur={3} far={4} color="#8a9182" />
    </group>
  );
}

export function ObjectScene({
  kind,
  className = "",
  distance = 5.6,
}: {
  kind: ObjectKind;
  className?: string;
  /** ближе — для компактных декоративных врезок */
  distance?: number;
}) {
  return (
    <Stage className={className} camera={[0, 0.4, distance]} fov={34} dpr={[1, 1.5]}>
      <Spin kind={kind} />
    </Stage>
  );
}

export default ObjectScene;
