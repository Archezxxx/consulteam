import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const orbit = [
  { position: [0, 2.2, 0], color: '#2f4fb8', rotation: [0.18, 0.3, -0.12] },
  { position: [2.05, 1.2, -0.35], color: '#20c965', rotation: [0.1, -0.2, 0.18] },
  { position: [2.05, -1.2, 0.15], color: '#ffd51f', rotation: [-0.12, 0.35, -0.08] },
  { position: [0, -2.2, -0.2], color: '#b47cf3', rotation: [0.24, 0.1, 0.12] },
  { position: [-2.05, -1.2, 0.2], color: '#ff5b50', rotation: [-0.1, -0.24, 0.18] },
  { position: [-2.05, 1.2, -0.3], color: '#e8eef5', rotation: [0.14, 0.2, -0.12] },
];

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
    {orbit.map((tile, index) => <group key={index} position={tile.position} rotation={tile.rotation}>
      <mesh>
        <boxGeometry args={[1.12, 1.12, 0.18]} />
        <meshStandardMaterial color={tile.color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <circleGeometry args={[0.27, 32]} />
        <meshStandardMaterial color={index === 0 ? '#ffffff' : '#1f3265'} />
      </mesh>
    </group>)}
  </group>;
}

export default function CareerScene() {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return <div className="career-scene" role="img" aria-label="Объёмный глобус и шесть направлений RIASEC">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9.4], fov: 38 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? 'demand' : 'always'}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} />
      <Suspense fallback={null}><Model reducedMotion={reducedMotion} /></Suspense>
    </Canvas>
  </div>;
}
