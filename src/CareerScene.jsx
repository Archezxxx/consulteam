import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Box3, BackSide, RepeatWrapping, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const earthPaths = [
  '/models/earth/albedo.webp',
  '/models/earth/bump.webp',
  '/models/earth/clouds.webp',
  '/models/earth/night.webp',
];

function Globe({ reducedMotion }) {
  const surface = useRef(null);
  const clouds = useRef(null);
  const [albedo, bump, cloudMask, night] = useLoader(TextureLoader, earthPaths);

  useMemo(() => {
    albedo.colorSpace = SRGBColorSpace;
    night.colorSpace = SRGBColorSpace;
    [albedo, bump, cloudMask, night].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.anisotropy = 4;
    });
  }, [albedo, bump, cloudMask, night]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const step = Math.min(delta, 0.05);
    if (surface.current) surface.current.rotation.y += step * 0.07;
    if (clouds.current) clouds.current.rotation.y += step * 0.09;
  });

  return <group rotation={[0.12, -0.35, -0.08]}>
    <mesh ref={surface} rotation={[0, -0.65, 0]}>
      <sphereGeometry args={[1.72, 64, 48]} />
      <meshStandardMaterial map={albedo} bumpMap={bump} bumpScale={0.025} emissive="#c8dfff" emissiveMap={night} emissiveIntensity={0.08} roughness={0.9} metalness={0} />
    </mesh>
    <mesh ref={clouds} rotation={[0, -0.65, 0]}>
      <sphereGeometry args={[1.735, 48, 32]} />
      <meshStandardMaterial color="#ffffff" alphaMap={cloudMask} transparent opacity={0.48} depthWrite={false} roughness={1} />
    </mesh>
    <mesh>
      <sphereGeometry args={[1.79, 48, 32]} />
      <meshBasicMaterial color="#80caff" side={BackSide} transparent opacity={0.18} depthWrite={false} />
    </mesh>
  </group>;
}

function Aircraft() {
  const gltf = useLoader(GLTFLoader, '/models/aircraft.glb', (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    const center = new Box3().setFromObject(scene).getCenter(new Vector3());
    scene.position.sub(center);
    return scene;
  }, [gltf]);

  return <group scale={0.00019} rotation={[0.18, -0.65, 0]}><primitive object={model} /></group>;
}

function World({ reducedMotion }) {
  const aircraft = useRef(null);

  useFrame(({ clock }) => {
    if (!aircraft.current) return;
    const angle = reducedMotion ? 1.05 : clock.elapsedTime * 0.25 + 1.05;
    aircraft.current.position.set(2.26 * Math.cos(angle), 1.66 * Math.sin(angle), 0.5 + 0.7 * Math.sin(angle + 0.6));
    aircraft.current.rotation.z = angle - Math.PI / 2;
    aircraft.current.rotation.y = -0.18 + 0.16 * Math.sin(angle);
  });

  return <group>
    <Globe reducedMotion={reducedMotion} />
    <mesh rotation={[0.82, 0, -0.12]}><torusGeometry args={[2.3, 0.009, 8, 160]} /><meshBasicMaterial color="#c6e866" transparent opacity={0.85} /></mesh>
    <group ref={aircraft}><Aircraft /></group>
    <mesh position={[-2.22, 0.9, -0.4]}><sphereGeometry args={[0.045, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
    <mesh position={[2.01, -1.55, -0.5]}><sphereGeometry args={[0.035, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
  </group>;
}

export default function CareerScene() {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return <div className="career-scene" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.9], fov: 39 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? 'demand' : 'always'}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 4, 6]} intensity={2.15} />
      <Suspense fallback={null}><World reducedMotion={reducedMotion} /></Suspense>
    </Canvas>
  </div>;
}
