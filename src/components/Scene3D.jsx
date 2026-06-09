import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function ParticleSystem() {
  const pointsRef = useRef();
  const count = 1500;

  // Generate random coordinates inside a spherical boundary
  const particles = useMemo(() => {
    const tempPositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 3.5; // distance range from camera center

      tempPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      tempPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      tempPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    return tempPositions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Base rotation
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Mouse reactive tilt with spring lag interpolation
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = -(state.pointer.y * Math.PI) / 10;
      pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.03;
      pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00d2ff"
        size={0.015}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}

function AmbientOrbs() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const offset = index * 200;
        child.position.y = Math.sin(time * 0.15 + offset) * 0.6;
        child.position.x = Math.cos(time * 0.1 + offset) * 1.0;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orb 1: Electric Blue */}
      <mesh position={[-2.5, 1.2, -2.5]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.12} />
      </mesh>
      {/* Orb 2: Purple Neon */}
      <mesh position={[2.5, -1.2, -2.5]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#bf5af2" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, #0f1035 0%, #050816 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem />
        <AmbientOrbs />
      </Canvas>
    </div>
  );
}
