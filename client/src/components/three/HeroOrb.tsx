import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!meshRef.current || !ringRef.current) return;

    // Gentle auto-rotation
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.28;
    meshRef.current.rotation.z += delta * 0.08;

    // Mouse parallax lean
    meshRef.current.rotation.y += (mouse.x * 0.4 - meshRef.current.rotation.y) * 0.03;
    meshRef.current.rotation.x += (-mouse.y * 0.25 - meshRef.current.rotation.x) * 0.03;

    // Breathing scale
    const scale = 1 + Math.sin(elapsed.current * 1.2) * 0.04;
    meshRef.current.scale.setScalar(scale);

    // Ring counter-rotation
    ringRef.current.rotation.x = elapsed.current * 0.4;
    ringRef.current.rotation.z = elapsed.current * 0.25;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Main wireframe icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#00bfff" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Outer torus ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 8, 80]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.4} />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshStandardMaterial
          color="#001830"
          emissive="#003355"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Lights */}
      <pointLight color="#00d9ff" intensity={2} distance={6} />
      <ambientLight intensity={0.1} />
    </group>
  );
}

interface HeroOrbProps {
  className?: string;
}

export default function HeroOrb({ className = '' }: HeroOrbProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Orb />
      </Canvas>
    </div>
  );
}
