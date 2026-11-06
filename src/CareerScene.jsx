import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Model({ reducedMotion }) {
  const object = useRef(null);
  useFrame((state, delta) => {
    if (!reducedMotion && object.current) {
      object.current.rotation.y += Math.min(delta, 0.04) * 0.12;
    }
  });

  return <group ref={object} rotation={[0.12, -0.18, 0]}>
    <mesh>
      <icosahedronGeometry args={[1.18, 2]} />
      <meshStandardMaterial color="#dbe9ff" metalness={0.05} roughness={0.68} flatShading />
    </mesh>
    <mesh rotation={[Math.PI / 3.5, 0.2, 0]}>
      <torusGeometry args={[1.65, 0.018, 8, 96]} />
      <meshStandardMaterial color="#d8f55a" />
    </mesh>
  </group>;
}

export default function CareerScene() {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return <div className="career-scene" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9.4], fov: 38 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? 'demand' : 'always'}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} />
      <Suspense fallback={null}><Model reducedMotion={reducedMotion} /></Suspense>
    </Canvas>
  </div>;
}
