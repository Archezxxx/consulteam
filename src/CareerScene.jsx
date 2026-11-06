import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture, SRGBColorSpace } from 'three';

function earthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#163a83';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.strokeStyle = 'rgba(168, 217, 242, .23)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= 1024; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke(); }
  for (let y = 0; y <= 512; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke(); }
  const lands = [
    [[70,105],[118,74],[178,66],[226,80],[275,107],[303,145],[278,171],[245,166],[222,198],[192,206],[178,238],[143,224],[129,194],[89,182],[64,148]],
    [[240,232],[276,219],[318,239],[347,285],[333,327],[316,363],[297,406],[267,430],[247,393],[258,353],[237,311]],
    [[420,102],[468,84],[504,93],[542,78],[605,89],[653,76],[713,91],[780,87],[848,117],[894,150],[871,188],[820,203],[787,181],[754,211],[716,194],[667,205],[634,189],[593,210],[550,183],[519,199],[482,181],[445,194],[411,161]],
    [[488,209],[539,199],[589,221],[620,255],[606,316],[570,379],[543,409],[509,378],[491,326],[471,279]],
    [[778,327],[834,309],[886,326],[917,361],[897,399],[845,416],[793,389]],
    [[962,159],[979,152],[988,170],[974,180]],
  ];
  lands.forEach((points, index) => {
    ctx.beginPath();
    points.forEach(([x, y], pointIndex) => pointIndex ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.closePath();
    ctx.fillStyle = index % 2 ? '#b8e7ad' : '#91d4ac';
    ctx.fill();
    ctx.strokeStyle = '#def6bb';
    ctx.lineWidth = 3;
    ctx.stroke();
  });
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function Plane() {
  return <group scale={0.65}>
    <mesh rotation={[0, 0, -Math.PI / 2]}><cylinderGeometry args={[0.055, 0.075, 0.95, 12]} /><meshStandardMaterial color="#ffffff" metalness={0.25} roughness={0.45} /></mesh>
    <mesh position={[0.54, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.075, 0.22, 12]} /><meshStandardMaterial color="#d8f55a" /></mesh>
    <mesh position={[0.03, 0, 0]}><boxGeometry args={[0.22, 1.25, 0.055]} /><meshStandardMaterial color="#f7fbff" /></mesh>
    <mesh position={[-0.39, 0, 0]}><boxGeometry args={[0.16, 0.52, 0.045]} /><meshStandardMaterial color="#f7fbff" /></mesh>
    <mesh position={[-0.4, 0, 0.17]}><boxGeometry args={[0.18, 0.05, 0.32]} /><meshStandardMaterial color="#e4f4ff" /></mesh>
    <mesh position={[0.08, 0, 0.055]}><sphereGeometry args={[0.09, 12, 8]} /><meshStandardMaterial color="#173f83" /></mesh>
  </group>;
}

function World({ reducedMotion }) {
  const globe = useRef(null);
  const aircraft = useRef(null);
  const texture = useMemo(earthTexture, []);
  useFrame((state, delta) => {
    if (!reducedMotion && globe.current) globe.current.rotation.y += Math.min(delta, 0.04) * 0.1;
    if (aircraft.current) {
      const angle = reducedMotion ? 0.55 : state.clock.elapsedTime * 0.35 + 0.55;
      aircraft.current.position.set(2.38 * Math.cos(angle), 1.61 * Math.sin(angle), 1.75 * Math.sin(angle));
      aircraft.current.rotation.z = angle + Math.PI / 2;
    }
  });
  return <group rotation={[0.08, -0.2, 0]}>
    <mesh ref={globe} rotation={[0, -0.5, 0]}><sphereGeometry args={[1.72, 64, 48]} /><meshStandardMaterial map={texture} roughness={0.83} metalness={0.03} /></mesh>
    <mesh rotation={[0.82, 0, -0.12]}><torusGeometry args={[2.36, 0.012, 8, 160]} /><meshBasicMaterial color="#d8f55a" transparent opacity={0.9} /></mesh>
    <group ref={aircraft}><Plane /></group>
    <mesh position={[-2.22, 0.9, -0.4]}><sphereGeometry args={[0.045, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
    <mesh position={[2.01, -1.55, -0.5]}><sphereGeometry args={[0.035, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
  </group>;
}

export default function CareerScene() {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return <div className="career-scene" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.9], fov: 39 }} gl={{ antialias: true, alpha: true }} frameloop={reducedMotion ? 'demand' : 'always'}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[3, 4, 6]} intensity={2.6} />
      <Suspense fallback={null}><World reducedMotion={reducedMotion} /></Suspense>
    </Canvas>
  </div>;
}
