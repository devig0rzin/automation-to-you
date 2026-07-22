import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const elapsed = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, []);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!ref.current) return;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const mx = mouse.x * 12;
    const my = mouse.y * 8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      // Gentle ambient drift
      pos[ix] += velocities[ix] + Math.sin(elapsed.current * 0.3 + i * 0.01) * 0.0008;
      pos[iy] += velocities[iy] + Math.cos(elapsed.current * 0.25 + i * 0.013) * 0.0008;
      pos[iz] += velocities[iz];

      // Mouse repulsion
      const dx = pos[ix] - mx;
      const dy = pos[iy] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.5) {
        const force = (3.5 - dist) / 3.5;
        pos[ix] += (dx / dist) * force * 0.06;
        pos[iy] += (dy / dist) * force * 0.06;
      }

      // Boundary wrap
      if (pos[ix] > 14) pos[ix] = -14;
      if (pos[ix] < -14) pos[ix] = 14;
      if (pos[iy] > 9) pos[iy] = -9;
      if (pos[iy] < -9) pos[iy] = 9;
      if (pos[iz] > 7) pos[iz] = -7;
      if (pos[iz] < -7) pos[iz] = 7;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00bfff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
