"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface WebGLLaptopProps {
  scrollValRef: React.RefObject<number>;
}

// ---------------------------------------------------------------------------
// Orbiting accent particles
// ---------------------------------------------------------------------------
interface ParticleData {
  angle: number;
  speed: number;
  height: number;
  radius: number;
  color: string;
}

function OrbitingParticles({ particles }: { particles: ParticleData[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    const children = groupRef.current.children;
    particles.forEach((p, idx) => {
      const mesh = children[idx] as THREE.Mesh;
      if (mesh) {
        const theta = p.angle + elapsed * p.speed;
        mesh.position.x = Math.sin(theta) * p.radius;
        mesh.position.z = Math.cos(theta) * p.radius;
        mesh.position.y = p.height + Math.sin(elapsed * 2 + p.angle) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <tetrahedronGeometry args={[0.06]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={2}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Main laptop component
// ---------------------------------------------------------------------------
export default function WebGLLaptop({ scrollValRef }: WebGLLaptopProps) {
  const entranceProgress = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // ── Drag-to-rotate state ──────────────────────────────────────────────────
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragRotY = useRef(0);   // accumulated drag offset in radians
  const dragVelocity = useRef(0);   // for momentum/inertia on release

  // Attach pointer events to the canvas parent container (covers HTML overlays too)
  useEffect(() => {
    const el = gl.domElement.parentElement;
    if (!el) return;

    // CRITICAL: tell the browser not to scroll the page on touch/drag
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();            // stop page scroll from stealing the drag
      isDragging.current = true;
      lastPointerX.current = e.clientX;
      dragVelocity.current = 0;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const dx = e.clientX - lastPointerX.current;
      lastPointerX.current = e.clientX;
      dragRotY.current += dx * 0.012;
      dragVelocity.current = dx * 0.012;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) { }
    };

    // passive:false is REQUIRED for preventDefault() to work on touch devices
    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.style.touchAction = "";
    };
  }, [gl]);

  // Load the OBJ model ---------------------------------------------------------
  const obj = useLoader(OBJLoader, "/models/laptop.obj");

  // Clone so each mount gets its own copy, then auto-center + scale it
  const laptopScene = useMemo(() => {
    const clone = obj.clone(true);

    // Auto-center and scale to fit in a ~3-unit bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 3.0 / maxDim;

    clone.scale.setScalar(scaleFactor);
    clone.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    );

    // Apply premium dark metallic material
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#1e293b"),
          metalness: 0.85,
          roughness: 0.18,
          envMapIntensity: 1.2,
        });
      }
    });

    return clone;
  }, [obj]);

  // Orbiting accent particles
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      speed: 0.4 + (i * 0.13) % 0.4,
      height: -0.3 + (i * 0.17) % 0.8,
      radius: 2.4 + (i * 0.11) % 0.5,
      color: i % 2 === 0 ? "#8b5cf6" : "#22d3ee",
    }));
  }, []);

  // ---------------------------------------------------------------------------
  // Animation loop — camera orbit + drag-to-rotate + entrance easing
  // ---------------------------------------------------------------------------
  useFrame((state, delta) => {
    // 1. Entrance easing
    entranceProgress.current = THREE.MathUtils.damp(
      entranceProgress.current, 1, 1.8, delta
    );

    const scrollVal = scrollValRef.current ?? 0;
    const elapsed = state.clock.getElapsedTime();

    // 2. Inertia: decay velocity when pointer is released
    if (!isDragging.current && Math.abs(dragVelocity.current) > 0.0001) {
      dragRotY.current += dragVelocity.current;
      dragVelocity.current *= 0.92; // friction / damping
    }

    // 3. Camera orbit — idle auto-rotation + drag offset + scroll sweep
    const idleAngle = elapsed * 0.15;       // continuous slow orbit
    const scrollAngle = scrollVal * Math.PI;  // scroll sweeps camera around
    const finalAngle = idleAngle + dragRotY.current + scrollAngle;

    const targetRadius = 5.5 + 2.0 * Math.pow(scrollVal - 0.5, 2) * 4;
    const targetY = 0.8 + Math.sin(scrollVal * Math.PI) * 1.2;

    const targetPos = new THREE.Vector3(
      Math.sin(finalAngle) * targetRadius,
      targetY,
      Math.cos(finalAngle) * targetRadius
    );
    const initialPos = new THREE.Vector3(0, 0.8, 7.5);

    camera.position.lerpVectors(
      initialPos,
      targetPos,
      entranceProgress.current
    );
    camera.lookAt(0, 0, 0);

    // 4. Subtle model bob
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(elapsed * 0.7) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* ── Real OBJ laptop model ── */}
      <primitive object={laptopScene} />

      {/* Orbiting brand particles */}
      <OrbitingParticles particles={particles} />
    </group>
  );
}