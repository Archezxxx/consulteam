import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Box3, BackSide, BufferAttribute, CanvasTexture, Color, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { countryAt, countryOverlay, destinationCenters, lonLatToPoint, pointToLonLat } from './destinationMap';

const earthPaths = [
  '/models/earth/albedo.webp',
  '/models/earth/bump.webp',
  '/models/earth/clouds.webp',
  '/models/earth/night.webp',
];

const livery = {
  white: new Color('#f7faff'),
  cobalt: new Color('#164fc9'),
  navy: new Color('#1f3265'),
  lime: new Color('#d8f55a'),
};

function paintForPoint(x, y, z) {
  const span = Math.abs(z);
  if (x > 0.43 && y > -0.015 && span < 0.09) return livery.cobalt; // vertical tail
  if (span > 0.78 && y > -0.23) return livery.lime; // wing tips
  if (x > 0.43 && span > 0.14 && y > -0.2) return livery.cobalt; // tailplanes
  if (span > 0.16 && y < -0.23) return livery.cobalt; // engine nacelles
  if (span > 0.15 && y > -0.23) {
    return span > 0.56 && x > -0.12 ? livery.cobalt : livery.white;
  }
  if (x < -0.76) return livery.cobalt; // nose
  if (y < -0.19) return livery.navy; // lower fuselage
  if (x < 0.58 && y < -0.115 && y > -0.143 && span > 0.07) return livery.cobalt;
  return livery.white;
}

function paintedGeometry(source) {
  const geometry = source.toNonIndexed();
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  for (let i = 0; i < positions.count; i += 3) {
    const x = (positions.getX(i) + positions.getX(i + 1) + positions.getX(i + 2)) / 3;
    const y = (positions.getY(i) + positions.getY(i + 1) + positions.getY(i + 2)) / 3;
    const z = (positions.getZ(i) + positions.getZ(i + 1) + positions.getZ(i + 2)) / 3;
    const color = paintForPoint(x, y, z);
    for (let vertex = i; vertex < i + 3; vertex += 1) {
      const offset = vertex * 3;
      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;
    }
  }
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  return geometry;
}

function brandTexture(draw, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function addBrandMark(mesh, logoImage) {
  const mark = brandTexture((context, width, height) => {
    context.drawImage(logoImage, 0, 0, width, height);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }, 256, 256);
  const name = brandTexture((context, width, height) => {
    context.fillStyle = '#1f3265';
    context.font = '700 84px Onest, Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Consulteam', width / 2, height / 2, width - 28);
  }, 768, 128);

  for (const side of [-1, 1]) {
    const logo = new Mesh(
      new PlaneGeometry(0.17, 0.17),
      new MeshBasicMaterial({ map: mark, transparent: true, depthWrite: false, side: DoubleSide }),
    );
    logo.position.set(0.7, 0.145, side * 0.024);
    logo.rotation.y = side < 0 ? Math.PI : 0;
    mesh.add(logo);

    const wordmark = new Mesh(
      new PlaneGeometry(0.57, 0.095),
      new MeshBasicMaterial({ map: name, transparent: true, depthWrite: false, side: DoubleSide }),
    );
    wordmark.position.set(-0.27, -0.085, side * 0.128);
    wordmark.rotation.y = side < 0 ? Math.PI : 0;
    mesh.add(wordmark);
  }
}

function Globe({ reducedMotion, selectedId, onCountrySelect }) {
  const globe = useRef(null);
  const surface = useRef(null);
  const clouds = useRef(null);
  const [albedo, bump, cloudMask, night] = useLoader(TextureLoader, earthPaths);
  const overlay = useMemo(() => countryOverlay(selectedId), [selectedId]);

  useEffect(() => () => overlay.dispose(), [overlay]);

  useMemo(() => {
    albedo.colorSpace = SRGBColorSpace;
    night.colorSpace = SRGBColorSpace;
    [albedo, bump, cloudMask, night].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.anisotropy = 4;
    });
  }, [albedo, bump, cloudMask, night]);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    if (globe.current) {
      const targetTilt = selectedId ? Math.min(0.7, destinationCenters[selectedId][1] * Math.PI / 180 * 0.85) : 0.12;
      const difference = targetTilt - globe.current.rotation.x;
      globe.current.rotation.x += reducedMotion ? difference : difference * Math.min(1, step * 2.5);
    }
    if (surface.current) {
      if (selectedId) {
        const longitude = destinationCenters[selectedId][0];
        const target = -((longitude + 90) * Math.PI) / 180 + 0.35;
        const difference = Math.atan2(Math.sin(target - surface.current.rotation.y), Math.cos(target - surface.current.rotation.y));
        surface.current.rotation.y += reducedMotion ? difference : difference * Math.min(1, step * 2.5);
      } else if (!reducedMotion) surface.current.rotation.y += step * 0.07;
    }
    if (clouds.current && !reducedMotion) clouds.current.rotation.y += step * 0.09;
  });

  const chooseAtPoint = (event) => {
    event.stopPropagation();
    const [lon, lat] = pointToLonLat(event.object.worldToLocal(event.point.clone()));
    const id = countryAt(lon, lat);
    if (id) onCountrySelect(id);
  };

  return <group ref={globe} rotation={[0.12, -0.35, -0.08]}>
    <group ref={surface} rotation={[0, -0.65, 0]}>
      <mesh>
        <sphereGeometry args={[1.72, 64, 48]} />
        <meshStandardMaterial map={albedo} bumpMap={bump} bumpScale={0.025} emissive="#c8dfff" emissiveMap={night} emissiveIntensity={0.08} roughness={0.9} metalness={0} />
      </mesh>
      <mesh onClick={chooseAtPoint}>
        <sphereGeometry args={[1.748, 64, 48]} />
        <meshBasicMaterial map={overlay} transparent depthWrite={false} />
      </mesh>
      {Object.entries(destinationCenters).map(([id, [lon, lat]]) => (
        <mesh key={id} position={lonLatToPoint(lon, lat)} onClick={(event) => { event.stopPropagation(); onCountrySelect(id); }}>
          <sphereGeometry args={[selectedId === id ? 0.055 : 0.039, 12, 8]} />
          <meshBasicMaterial color={selectedId === id ? '#ffffff' : '#d8f55a'} />
        </mesh>
      ))}
    </group>
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
  const logo = useLoader(TextureLoader, '/consult-team-mark.png');
  const model = useMemo(() => {
    const scene = gltf.scene.clone(true);
    const surfaces = [];
    scene.traverse((object) => { if (object.isMesh) surfaces.push(object); });
    surfaces.forEach((object) => {
      object.geometry = paintedGeometry(object.geometry);
      object.material = new MeshStandardMaterial({ vertexColors: true, metalness: 0.12, roughness: 0.52 });
      addBrandMark(object, logo.image);
    });
    const center = new Box3().setFromObject(scene).getCenter(new Vector3());
    scene.position.sub(center);
    return scene;
  }, [gltf, logo]);

  return <group scale={0.00022} rotation={[0.18, -0.65, 0]}><primitive object={model} /></group>;
}

function World({ reducedMotion, selectedId, onCountrySelect }) {
  const aircraft = useRef(null);
  const aircraftAngle = useRef(1.05);

  useFrame((_, delta) => {
    if (!aircraft.current) return;
    if (!reducedMotion) aircraftAngle.current += Math.min(delta, 0.05) * 0.25;
    const angle = aircraftAngle.current;
    aircraft.current.position.set(1.95 * Math.cos(angle), 1.66 * Math.sin(angle), 0.5 + 0.7 * Math.sin(angle + 0.6));
    aircraft.current.rotation.z = angle - Math.PI / 2;
    aircraft.current.rotation.y = -0.18 + 0.16 * Math.sin(angle);
  });

  return <group>
    <Globe reducedMotion={reducedMotion} selectedId={selectedId} onCountrySelect={onCountrySelect} />
    <mesh rotation={[0.82, 0, -0.12]}><torusGeometry args={[2.3, 0.009, 8, 160]} /><meshBasicMaterial color="#c6e866" transparent opacity={0.85} /></mesh>
    <group ref={aircraft}><Aircraft /></group>
    <mesh position={[-2.22, 0.9, -0.4]}><sphereGeometry args={[0.045, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
    <mesh position={[2.01, -1.55, -0.5]}><sphereGeometry args={[0.035, 12, 8]} /><meshBasicMaterial color="#d8f55a" /></mesh>
  </group>;
}

export default function CareerScene({ selectedId, onCountrySelect }) {
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    const element = container.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    let intersecting = false;
    const updateVisibility = () => setVisible(intersecting && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.01 });
    observer.observe(element);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  return <div ref={container} className="career-scene" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.9], fov: 39 }} gl={{ antialias: true, alpha: true }} frameloop={visible && !reducedMotion ? 'always' : 'demand'}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 4, 6]} intensity={2.15} />
      <Suspense fallback={null}><World reducedMotion={reducedMotion} selectedId={selectedId} onCountrySelect={onCountrySelect} /></Suspense>
    </Canvas>
  </div>;
}
