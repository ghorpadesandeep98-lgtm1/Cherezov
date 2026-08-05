"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
import type { ReactNode } from "react";
import { Suspense } from "react";

/**
 * Общая сцена бренда.
 * Окружение собирается из Lightformer'ов — без внешних HDRI-файлов,
 * поэтому сцена стартует мгновенно и работает офлайн.
 */
export function Stage({
  children,
  camera = [0, 0, 6.4],
  fov = 34,
  className = "",
  dpr = [1, 1.75] as [number, number],
}: {
  children: ReactNode;
  camera?: [number, number, number];
  fov?: number;
  className?: string;
  dpr?: [number, number];
}) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: camera, fov }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#cfe3ff" />

        <Environment resolution={256}>
          {/* светлая «комната»: без неё хром отражает пустоту и выглядит чёрным */}
          <mesh scale={80}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#c9cfc6" side={THREE.BackSide} />
          </mesh>
          {/* верхний софтбокс — «студийный» блик Apple */}
          <Lightformer
            form="rect"
            intensity={9}
            position={[0, 5, 2]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[12, 8, 1]}
            color="#ffffff"
          />
          {/* салатовый рефлекс — фирменный цвет живёт в отражениях */}
          <Lightformer
            form="rect"
            intensity={5}
            position={[-5, 1, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[8, 6, 1]}
            color="#c8ff3d"
          />
          {/* холодный контровой */}
          <Lightformer
            form="rect"
            intensity={2.6}
            position={[5, -1, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[8, 6, 1]}
            color="#c3d6ff"
          />
          <Lightformer
            form="circle"
            intensity={2}
            position={[0, -4, 3]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={6}
            color="#ffffff"
          />
        </Environment>

        {children}
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
