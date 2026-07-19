"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useDevice } from "@/hooks/useDevice";

/** Spinning torus shown in 3D space while the OBJ model is loading */
function LoadingRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 1.2;
      ref.current.rotation.y += delta * 0.8;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.9, 0.06, 16, 64]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#8b5cf6"
        emissiveIntensity={1.5}
        roughness={0.2}
      />
    </mesh>
  );
}

interface SceneCanvasProps {
  children: React.ReactNode;
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
  const { isMobile } = useDevice();

  return (
    <div className="w-full h-full absolute inset-0 select-none">
      {/*
        No `camera` prop here — WebGLLaptop.useFrame owns the camera entirely.
        Providing a camera prop here AND overriding position in useFrame caused
        the initial blank-frame on first paint.
      */}
      <Canvas
        dpr={isMobile ? 1 : [1, 2]}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-auto"
        onCreated={({ camera }) => {
          // Set the initial camera position programmatically so useFrame
          // starts lerping from the correct origin point.
          camera.position.set(0, 0.5, 7.5);
          (camera as any).fov = 45;
          (camera as any).updateProjectionMatrix?.();
        }}
      >
        <ambientLight intensity={0.4} />

        {/* Key Directional Light */}
        <directionalLight
          position={[5, 5, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Brand Rim Edge Lights — purple & cyan from the back corners */}
        <spotLight
          position={[-6, 3, -5]}
          intensity={12}
          color="#8b5cf6"
          angle={Math.PI / 4}
          penumbra={0.8}
        />
        <spotLight
          position={[6, 3, -5]}
          intensity={15}
          color="#22d3ee"
          angle={Math.PI / 4}
          penumbra={0.8}
        />

        {/* Soft fill from below */}
        <directionalLight
          position={[0, -3, 2]}
          intensity={0.2}
          color="#4f72ff"
        />

        {/* Studio environment for realistic reflections */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* Laptop mesh and particles — show a spinner ring while the OBJ loads */}
        <Suspense fallback={<LoadingRing />}>
          {children}
        </Suspense>

        {/* Contact shadow beneath the laptop */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={isMobile ? 0.3 : 0.45}
          scale={6}
          blur={2.4}
          far={3}
        />
      </Canvas>
    </div>
  );
}
